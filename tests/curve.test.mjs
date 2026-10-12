import { test } from 'node:test';
import assert from 'node:assert/strict';
import { sortTriad, fillCurve, samplePoint, POINT_COUNT } from '../assets/js/chord-viz/curve.js';

const close = (a, b) => assert.ok(Math.abs(a - b) < 1e-9, `${a} is not close to ${b}`);

test('sortTriad sorts ascending and leaves the input alone', () => {
  const input = [392, 261.63, 329.63];
  assert.deepEqual(sortTriad(input), [261.63, 329.63, 392]);
  assert.deepEqual(input, [392, 261.63, 329.63]);
});

test('fillCurve samples x, y, z at evenly spaced times', () => {
  // Scale 1, no phase, frequencies 1:2:3, window of 1 second ending at t = 1.
  const out = new Float32Array(5 * 3);
  const options = { scale: 1, windowSeconds: 1, pointCount: 5, phases: [0, 0, 0] };
  fillCurve(out, [1, 2, 3], 1, options);
  close(out[0], 0); // x at t = 0
  close(out[3], 1); // x at t = 0.25 is sin(pi/2)
  close(out[5], -1); // z at t = 0.25 is sin(3pi/2)
  close(out[12], 0); // x at t = 1
});

test('fillCurve writes in place and returns the same buffer', () => {
  const out = new Float32Array(POINT_COUNT * 3);
  assert.equal(fillCurve(out, [261.63, 329.63, 392], 3), out);
  assert.ok(out.some((v) => v !== 0));
});

test('values stay within [-1, 1]', () => {
  const out = new Float32Array(POINT_COUNT * 3);
  fillCurve(out, [261.63, 329.63, 392], 10);
  assert.ok(out.every((v) => v >= -1 && v <= 1));
});

test('the curve moves as the end time advances (VIZ-12)', () => {
  const a = new Float32Array(POINT_COUNT * 3);
  const b = new Float32Array(POINT_COUNT * 3);
  fillCurve(a, [261.63, 329.63, 392], 1);
  fillCurve(b, [261.63, 329.63, 392], 2);
  assert.notDeepEqual(a, b);
});

test('one note moves along x only (a dot going left and right)', () => {
  const out = new Float32Array(POINT_COUNT * 3);
  fillCurve(out, [261.63], 5);
  for (let i = 0; i < POINT_COUNT; i++) {
    assert.equal(out[i * 3 + 1], 0);
    assert.equal(out[i * 3 + 2], 0);
  }
  assert.ok(out.some((v, i) => i % 3 === 0 && v !== 0));
});

test('two notes fill x and y and leave z at 0 (a plane)', () => {
  const out = new Float32Array(POINT_COUNT * 3);
  fillCurve(out, [261.63, 329.63], 5);
  let yMoves = false;
  for (let i = 0; i < POINT_COUNT; i++) {
    assert.equal(out[i * 3 + 2], 0);
    if (out[i * 3 + 1] !== 0) yMoves = true;
  }
  assert.ok(yMoves);
});

test('samplePoint matches the curve at one time', () => {
  const options = { scale: 1, windowSeconds: 1, pointCount: 5, phases: [0, 0, 0] };
  const curve = new Float32Array(5 * 3);
  fillCurve(curve, [1, 2, 3], 1, options);
  const point = samplePoint(new Float32Array(3), [1, 2, 3], 0.25, options);
  close(point[0], curve[3]);
  close(point[1], curve[4]);
  close(point[2], curve[5]);
});

test('samplePoint with one note leaves y and z at 0', () => {
  const point = samplePoint(new Float32Array(3), [261.63], 1.7);
  assert.notEqual(point[0], 0);
  assert.equal(point[1], 0);
  assert.equal(point[2], 0);
});

import { figureSeconds, figurePoints, MIN_FIGURE_POINTS, MAX_FIGURE_POINTS, VISUAL_SCALE } from '../assets/js/chord-viz/curve.js';
import { visualFrequencies, loopCycles, midiToHz } from '../assets/js/chord-viz/tuning.js';

const endGap = (out, count) => {
  const last = (count - 1) * 3;
  return Math.hypot(out[0] - out[last], out[1] - out[last + 1], out[2] - out[last + 2]);
};

test('C major from middle C repeats after 4 cycles of C4', () => {
  const seconds = figureSeconds(loopCycles([60, 64, 67]), midiToHz(60));
  assert.ok(Math.abs(seconds * VISUAL_SCALE * midiToHz(60) - 4) < 1e-9);
});

test('point counts stay within the limits and grow with the loop', () => {
  assert.equal(figurePoints(0.1, 300), MIN_FIGURE_POINTS);
  assert.equal(figurePoints(10000, 300), MAX_FIGURE_POINTS);
  assert.ok(figurePoints(8, 400) > figurePoints(4, 400));
});

test('with perfect ratios every chord the 18 keys can play closes exactly', () => {
  const keys = Array.from({ length: 18 }, (_, i) => 60 + i);
  const out = new Float32Array(MAX_FIGURE_POINTS * 3);
  let checked = 0;
  const check = (midis) => {
    const freqs = visualFrequencies(midis, 440, 'just');
    const seconds = figureSeconds(loopCycles(midis), freqs[0]);
    const count = figurePoints(seconds, freqs[freqs.length - 1]);
    fillCurve(out, freqs, 12.5 + seconds, { windowSeconds: seconds, pointCount: count });
    assert.ok(endGap(out, count) < 1e-3, `${midis}: gap ${endGap(out, count)}`);
    checked += 1;
  };
  for (let a = 0; a < 18; a++) {
    for (let b = a + 1; b < 18; b++) {
      check([keys[a], keys[b]]);
      for (let c = b + 1; c < 18; c++) check([keys[a], keys[b], keys[c]]);
    }
  }
  assert.equal(checked, 969);
});

test('with equal temperament the gap is small but not zero (the tuning difference)', () => {
  const midis = [60, 64, 67];
  const freqs = visualFrequencies(midis, 440, 'equal');
  const seconds = figureSeconds(loopCycles(midis), freqs[0]);
  const count = figurePoints(seconds, freqs[2]);
  const out = new Float32Array(count * 3);
  fillCurve(out, freqs, 20 + seconds, { windowSeconds: seconds, pointCount: count });
  const gap = endGap(out, count);
  assert.ok(gap > 1e-3 && gap < 0.5, `gap ${gap}`);
});
