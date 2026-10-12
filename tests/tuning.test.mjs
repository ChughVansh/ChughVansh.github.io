import { test } from 'node:test';
import assert from 'node:assert/strict';
import { midiToHz } from '../assets/js/chord-viz/tuning.js';

test('A4 is 440 Hz', () => {
  assert.equal(midiToHz(69), 440);
});

test('octaves double the frequency', () => {
  assert.ok(Math.abs(midiToHz(81) - 880) < 1e-9);
  assert.ok(Math.abs(midiToHz(57) - 220) < 1e-9);
});

test('middle C is about 261.63 Hz', () => {
  assert.ok(Math.abs(midiToHz(60) - 261.6256) < 1e-3);
});

test('a4Hz option changes the reference pitch', () => {
  assert.ok(Math.abs(midiToHz(69, 432) - 432) < 1e-9);
});

import { justRatio, visualFrequencies } from '../assets/js/chord-viz/tuning.js';

test('just ratios for the common intervals', () => {
  assert.equal(justRatio(0), 1);
  assert.equal(justRatio(7), 3 / 2);
  assert.equal(justRatio(4), 5 / 4);
  assert.equal(justRatio(5), 4 / 3);
});

test('just ratios carry across octaves', () => {
  assert.equal(justRatio(12), 2);
  assert.equal(justRatio(19), 3);
  assert.equal(justRatio(16), 5 / 2);
});

test("visualFrequencies 'equal' matches what is heard", () => {
  const freqs = visualFrequencies([60, 64, 67]);
  assert.ok(Math.abs(freqs[1] - midiToHz(64)) < 1e-9);
  assert.ok(Math.abs(freqs[2] - midiToHz(67)) < 1e-9);
});

test("visualFrequencies 'just' keeps the root and uses perfect ratios", () => {
  const [c, e, g] = visualFrequencies([60, 64, 67], 440, 'just');
  assert.ok(Math.abs(c - midiToHz(60)) < 1e-9);
  assert.ok(Math.abs(e / c - 5 / 4) < 1e-12);
  assert.ok(Math.abs(g / c - 3 / 2) < 1e-12);
});

test('a single note is unchanged in either tuning', () => {
  assert.deepEqual(visualFrequencies([69], 440, 'just'), [440]);
  assert.deepEqual(visualFrequencies([69], 440, 'equal'), [440]);
});

import { justFraction, loopCycles } from '../assets/js/chord-viz/tuning.js';

test('just fractions are exact and reduced, with octaves included', () => {
  assert.deepEqual(justFraction(7), [3, 2]);
  assert.deepEqual(justFraction(19), [3, 1]);
  assert.deepEqual(justFraction(16), [5, 2]);
});

test('loopCycles: cycles of the lowest note before the figure repeats', () => {
  assert.equal(loopCycles([60]), 1);
  assert.equal(loopCycles([60, 67]), 2); // a fifth, 3:2
  assert.equal(loopCycles([60, 64, 67]), 4); // major triad, 1 : 5/4 : 3/2
  assert.equal(loopCycles([60, 63, 67]), 10); // minor triad, 1 : 6/5 : 3/2
  assert.equal(loopCycles([60, 72]), 1); // an octave
});
