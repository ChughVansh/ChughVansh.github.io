import { test } from 'node:test';
import assert from 'node:assert/strict';
import { keyToMidi, keyLabel, midiToName, isBlackKey, KEY_CODES } from '../assets/js/chord-viz/keymap.js';

test('maps the DAW layout from the brief', () => {
  assert.equal(keyToMidi('KeyA'), 60); // C4
  assert.equal(keyToMidi('KeyW'), 61); // C#4
  assert.equal(keyToMidi('KeyH'), 69); // A4
  assert.equal(keyToMidi('KeyK'), 72); // C5
  assert.equal(keyToMidi('Semicolon'), 76); // E5
  assert.equal(keyToMidi('Quote'), 77); // F5
});

test('returns null for unmapped keys and inherited object names', () => {
  assert.equal(keyToMidi('KeyZ'), null);
  assert.equal(keyToMidi('Enter'), null);
  assert.equal(keyToMidi('constructor'), null);
});

test('baseMidi shifts every key', () => {
  assert.equal(keyToMidi('KeyA', 48), 48);
  assert.equal(keyToMidi('Quote', 48), 65);
});

test('18 keys: 11 white, 7 black, MIDI 60 to 77', () => {
  const midis = KEY_CODES.map((code) => keyToMidi(code));
  assert.equal(midis.length, 18);
  assert.deepEqual([...midis].sort((a, b) => a - b), Array.from({ length: 18 }, (_, i) => 60 + i));
  assert.equal(midis.filter(isBlackKey).length, 7);
});

test('labels and note names', () => {
  assert.equal(keyLabel('KeyA'), 'A');
  assert.equal(keyLabel('Semicolon'), ';');
  assert.equal(keyLabel('Quote'), "'");
  assert.equal(midiToName(60), 'C4');
  assert.equal(midiToName(61), 'C#4');
  assert.equal(midiToName(69), 'A4');
  assert.equal(midiToName(77), 'F5');
});
