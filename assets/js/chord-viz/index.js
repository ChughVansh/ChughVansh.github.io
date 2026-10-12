// mountChordViz(rootElement, options): wires the keyboard, audio and canvas together.
// No globals. Options: lineColor (CSS color), a4Hz (default 440), baseMidi (default 60),
// visualTuning ('equal' or 'just', see VISUAL_TUNING below).
import { KEY_CODES, keyToMidi, keyLabel, midiToName, isBlackKey } from './keymap.js';
import { midiToHz, visualFrequencies, loopCycles } from './tuning.js';
import { sortTriad } from './curve.js';
import { createAudio, hasWebAudio } from './audio.js';
import { createView } from './view.js';

// WHAT THE CURVE USES. Change this line to try the other tuning. Only the drawing changes.
//   'equal': 12-tone equal temperament, the same pitches you hear. Most figures slowly drift.
//   'just':  perfect ratios (3:2 for a fifth, 5:4 for a major third). Figures close into a clean shape.
export const VISUAL_TUNING = 'just';

const UNSUPPORTED_MESSAGE = 'This demo needs a browser with Web Audio.';
const EDITABLE = 'input, textarea, select, [contenteditable]';
// Keys at or above this offset from baseMidi are hidden on narrow screens (VIZ-20).
const NARROW_OCTAVE_SIZE = 12;
// The visualizer draws for 1, 2 or 3 sounding notes. More than that, or none, leaves the canvas empty.
const MAX_DRAWN_NOTES = 3;

export function mountChordViz(root, options = {}) {
  const { lineColor, a4Hz = 440, baseMidi = 60, visualTuning = VISUAL_TUNING } = options;

  const canvas = document.createElement('canvas');
  const ctx = hasWebAudio() && canvas.getContext ? canvas.getContext('2d') : null;
  if (!ctx) {
    // The only message this demo is allowed to show (VIZ-17).
    const message = document.createElement('p');
    message.textContent = UNSUPPORTED_MESSAGE;
    root.replaceChildren(message);
    return { unmount() { root.replaceChildren(); } };
  }

  const audio = createAudio();
  const view = createView(canvas, ctx, { lineColor });
  const buttons = new Map(); // midi -> button
  const holders = new Map(); // midi -> Set of sources holding it (key, button, pointer)
  const sourceNote = new Map(); // source id -> midi
  const abort = new AbortController();
  const { signal } = abort;

  // ---- DOM
  const section = document.createElement('section');
  section.className = 'viz';
  const heading = document.createElement('h2');
  heading.textContent = 'Visualize your favorite triad!';

  const keyboard = document.createElement('div');
  keyboard.className = 'viz__keyboard';
  keyboard.setAttribute('role', 'group');
  keyboard.setAttribute('aria-label', 'Piano keys');

  let whiteIndex = -1;
  for (const code of KEY_CODES) {
    const midi = keyToMidi(code, baseMidi);
    const black = isBlackKey(midi);
    if (!black) whiteIndex += 1;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `viz__key viz__key--${black ? 'black' : 'white'}`;
    if (midi - baseMidi >= NARROW_OCTAVE_SIZE) button.classList.add('viz__key--extra');
    // White keys sit in columns; a black key sits on the boundary after the white key before it.
    button.style.setProperty(black ? '--boundary' : '--index', String(black ? whiteIndex + 1 : whiteIndex));
    const letter = keyLabel(code);
    // The visible text is the computer key; the name starts with the note (VIZ-16) and still contains the letter.
    button.setAttribute('aria-label', `${midiToName(midi)} (key ${letter})`);
    button.setAttribute('aria-pressed', 'false');
    button.textContent = letter;
    buttons.set(midi, button);
    keyboard.append(button);

    bindButton(button, midi);
  }

  canvas.className = 'viz__canvas';
  canvas.setAttribute('role', 'img');
  setCanvasLabel(null);

  section.append(heading, keyboard, canvas);
  root.replaceChildren(section);

  // ---- Note state
  function press(source, midi) {
    if (sourceNote.has(source)) return;
    sourceNote.set(source, midi);
    let set = holders.get(midi);
    if (!set) {
      set = new Set();
      holders.set(midi, set);
    }
    set.add(source);
    if (set.size === 1) {
      audio.noteOn(midi, midiToHz(midi, a4Hz));
      setKeyState(midi, true);
      sync();
    }
  }

  function release(source) {
    const midi = sourceNote.get(source);
    if (midi === undefined) return;
    sourceNote.delete(source);
    const set = holders.get(midi);
    set.delete(source);
    if (set.size === 0) {
      holders.delete(midi);
      audio.noteOff(midi);
      setKeyState(midi, false);
      sync();
    }
  }

  // No stuck notes: called on blur, hidden tab and cancelled pointers (VIZ-8).
  function releaseAll() {
    for (const source of [...sourceNote.keys()]) release(source);
  }

  function setKeyState(midi, on) {
    const button = buttons.get(midi);
    if (!button) return;
    button.classList.toggle('is-active', on);
    button.setAttribute('aria-pressed', String(on));
  }

  // One note is a dot, two a flat curve, three a 3D curve. Zero or four or more draw nothing (VIZ-10, ADR-005).
  function sync() {
    const count = holders.size;
    if (count >= 1 && count <= MAX_DRAWN_NOTES) {
      const midis = [...holders.keys()].sort((a, b) => a - b);
      view.setNotes(sortTriad(visualFrequencies(midis, a4Hz, visualTuning)), loopCycles(midis));
      setCanvasLabel(midis);
    } else {
      view.setNotes(null);
      setCanvasLabel(null);
    }
  }

  function setCanvasLabel(midis) {
    const base = 'Drawing from the frequencies of the held notes: a dot for one note, a flat curve for two, a 3D curve for three.';
    canvas.setAttribute(
      'aria-label',
      midis ? `${base} Showing ${midis.map(midiToName).join(', ')}.` : `${base} Empty until one to three notes are held.`,
    );
  }

  // ---- Input
  function isEditable(target) {
    return target instanceof Element && Boolean(target.closest(EDITABLE));
  }

  document.addEventListener('keydown', (event) => {
    if (event.ctrlKey || event.metaKey || event.altKey) return;
    if (isEditable(event.target)) return;
    const midi = keyToMidi(event.code, baseMidi);
    if (midi === null) return;
    event.preventDefault();
    if (event.repeat) return;
    press(`key:${event.code}`, midi);
  }, { signal });

  // Key up always releases, even if a modifier or focus changed meanwhile.
  document.addEventListener('keyup', (event) => release(`key:${event.code}`), { signal });
  window.addEventListener('blur', releaseAll, { signal });
  document.addEventListener('visibilitychange', () => { if (document.hidden) releaseAll(); }, { signal });

  function bindButton(button, midi) {
    button.addEventListener('pointerdown', (event) => {
      if (event.pointerType === 'mouse' && event.button !== 0) return;
      button.setPointerCapture(event.pointerId);
      press(`pointer:${event.pointerId}`, midi);
    }, { signal });
    const end = (event) => release(`pointer:${event.pointerId}`);
    button.addEventListener('pointerup', end, { signal });
    button.addEventListener('pointercancel', end, { signal });
    button.addEventListener('lostpointercapture', end, { signal });

    // Enter and Space on a focused key play it too.
    button.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      if (!event.repeat) press(`button:${midi}`, midi);
    }, { signal });
    button.addEventListener('keyup', (event) => {
      if (event.key === 'Enter' || event.key === ' ') release(`button:${midi}`);
    }, { signal });
    button.addEventListener('blur', () => release(`button:${midi}`), { signal });
  }

  function unmount() {
    abort.abort();
    releaseAll();
    view.dispose();
    audio.dispose();
    root.replaceChildren();
  }

  return { unmount };
}
