// Key map in the DAW layout (brief §8.3). Matched on KeyboardEvent.code so it
// works on any keyboard layout. Values are semitone offsets from baseMidi.
const OFFSETS = new Map([
  ['KeyA', 0], ['KeyW', 1], ['KeyS', 2], ['KeyE', 3], ['KeyD', 4], ['KeyF', 5],
  ['KeyT', 6], ['KeyG', 7], ['KeyY', 8], ['KeyH', 9], ['KeyU', 10], ['KeyJ', 11],
  ['KeyK', 12], ['KeyO', 13], ['KeyL', 14], ['KeyP', 15], ['Semicolon', 16], ['Quote', 17],
]);

// What the visitor sees printed on each on-screen key.
const LABELS = new Map([['Semicolon', ';'], ['Quote', "'"]]);

const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const BLACK_PITCH_CLASSES = new Set([1, 3, 6, 8, 10]);

export const KEY_CODES = [...OFFSETS.keys()];

/** MIDI note for a key code, or null when the key is not mapped. */
export function keyToMidi(code, baseMidi = 60) {
  const offset = OFFSETS.get(code);
  return offset === undefined ? null : baseMidi + offset;
}

/** The letter shown on the key, such as "A" or ";". */
export function keyLabel(code) {
  return LABELS.get(code) ?? code.replace('Key', '');
}

/** Note name with octave, such as "C4" or "C#4". MIDI 60 is C4. */
export function midiToName(midi) {
  return `${NOTE_NAMES[((midi % 12) + 12) % 12]}${Math.floor(midi / 12) - 1}`;
}

export function isBlackKey(midi) {
  return BLACK_PITCH_CLASSES.has(((midi % 12) + 12) % 12);
}
