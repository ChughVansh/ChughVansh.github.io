// Web Audio voices: one oscillator per held note.

// THE VOICE. Change this line to change the sound. Two kinds of value work:
//   a waveform name: 'sine', 'triangle', 'sawtooth' or 'square'
//   a list of harmonic strengths for a custom wave, for example [1, 0.5, 0.25]:
//     the first number is the base pitch, the second is one octave up,
//     the third is an octave and a fifth up, and so on.
// Bright waves (sawtooth, square) sound louder. If so, lower MASTER_LEVEL below.
export const VOICE = 'sine';

// Gain attack and release time. Short enough to feel instant, long enough to avoid clicks.
export const ENVELOPE_SECONDS = 0.03;
// Master level before it is divided by the number of voices, to avoid clipping.
const MASTER_LEVEL = 0.4;
const MASTER_SMOOTHING_SECONDS = 0.02;

export function hasWebAudio() {
  return Boolean(window.AudioContext || window.webkitAudioContext);
}

export function createAudio() {
  let context = null;
  let master = null;
  const voices = new Map(); // midi -> { osc, gain }

  // Created on the first key press or pointer down, never earlier (VIZ-6).
  function ensureContext() {
    if (!context) {
      const Ctor = window.AudioContext || window.webkitAudioContext;
      context = new Ctor();
      master = context.createGain();
      master.gain.value = MASTER_LEVEL;
      master.connect(context.destination);
    }
    if (context.state === 'suspended') context.resume();
    return context;
  }

  function updateMaster() {
    if (!master) return;
    const level = MASTER_LEVEL / Math.max(1, voices.size);
    master.gain.setTargetAtTime(level, context.currentTime, MASTER_SMOOTHING_SECONDS);
  }

  function noteOn(midi, hz) {
    if (voices.has(midi)) return;
    const ctx = ensureContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    if (Array.isArray(VOICE)) {
      // Slot 0 of a periodic wave is the DC offset, so the harmonics start at slot 1.
      const imag = new Float32Array([0, ...VOICE]);
      osc.setPeriodicWave(ctx.createPeriodicWave(new Float32Array(imag.length), imag));
    } else {
      osc.type = VOICE;
    }
    osc.frequency.value = hz;
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(1, ctx.currentTime + ENVELOPE_SECONDS);
    osc.connect(gain);
    gain.connect(master);
    osc.start();
    voices.set(midi, { osc, gain });
    updateMaster();
  }

  function noteOff(midi) {
    const voice = voices.get(midi);
    if (!voice) return;
    voices.delete(midi);
    updateMaster();
    const now = context.currentTime;
    voice.gain.gain.cancelScheduledValues(now);
    voice.gain.gain.setValueAtTime(voice.gain.gain.value, now);
    voice.gain.gain.linearRampToValueAtTime(0, now + ENVELOPE_SECONDS);
    voice.osc.stop(now + ENVELOPE_SECONDS + 0.01);
    voice.osc.onended = () => {
      voice.osc.disconnect();
      voice.gain.disconnect();
    };
  }

  function allOff() {
    for (const midi of [...voices.keys()]) noteOff(midi);
  }

  function dispose() {
    allOff();
    if (context) context.close();
    context = null;
    master = null;
  }

  return { noteOn, noteOff, allOff, dispose };
}
