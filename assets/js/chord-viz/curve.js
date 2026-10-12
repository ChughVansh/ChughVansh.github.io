// Curve math (brief §8.4). Pure functions, no browser needed.
// These constants are provisional until the owner approves them by eye (Phase 4a).

// Visual time scale: the lowest playable note (C4) moves at 1 visual cycle per second.
// Faster motion makes the dot travel round the figure sooner.
export const VISUAL_SCALE = 1.0 / 261.6256;
// Fallback seconds of curve drawn when the loop length is unknown. The view uses
// figureSeconds() below, which fits each chord.
export const WINDOW_SECONDS = 12;
// Fallback points in the polyline.
export const POINT_COUNT = 2048;
// With two or three notes the whole closed figure is drawn once, with a dot moving along it.
// Points per cycle of the fastest axis, and limits on the total. 48 per cycle looks smooth.
export const POINTS_PER_AXIS_CYCLE = 48;
export const MIN_FIGURE_POINTS = 512;
export const MAX_FIGURE_POINTS = 24000;
// Starting phase of each axis, in radians.
export const PHASES = [0, Math.PI / 2, Math.PI / 4];

/**
 * Seconds for the whole figure to repeat, so its end meets its start (a clean loop).
 * `cycles` is loopCycles() for the chord and `rootHz` the lowest note's frequency.
 */
export function figureSeconds(cycles, rootHz, scale = VISUAL_SCALE) {
  return cycles / (scale * rootHz);
}

/** Points that draw the whole figure smoothly: about 48 per cycle of its fastest axis. */
export function figurePoints(seconds, fastestHz, scale = VISUAL_SCALE) {
  const points = Math.round(seconds * scale * fastestHz * POINTS_PER_AXIS_CYCLE);
  return Math.min(MAX_FIGURE_POINTS, Math.max(MIN_FIGURE_POINTS, points));
}

/** Frequencies sorted ascending. Returns a new array. */
export function sortTriad(freqs) {
  return [...freqs].sort((a, b) => a - b);
}

const TWO_PI = 2 * Math.PI;

// One axis of the curve: a sine at the note's visual frequency.
function axisValue(frequency, u, scale, phase) {
  return Math.sin(TWO_PI * scale * frequency * u + phase);
}

/**
 * Writes one point (x, y, z) for time `u` into out[0..2].
 * `freqs` holds 1 to 3 sorted frequencies in Hz. Axes without a note stay 0:
 * one note moves along x only (a dot going left and right), two notes fill x and y (a plane).
 */
export function samplePoint(out, freqs, u, options = {}) {
  const { scale = VISUAL_SCALE, phases = PHASES } = options;
  for (let axis = 0; axis < 3; axis++) {
    out[axis] = axis < freqs.length ? axisValue(freqs[axis], u, scale, phases[axis]) : 0;
  }
  return out;
}

/**
 * Fills `out` (x, y, z per point) with the polyline that ends at `endTime`.
 * Writes in place so drawing allocates nothing per frame (VIZ-13).
 * `freqs` is 1 to 3 frequencies in Hz, already sorted.
 */
export function fillCurve(out, freqs, endTime, options = {}) {
  const {
    scale = VISUAL_SCALE,
    windowSeconds = WINDOW_SECONDS,
    pointCount = POINT_COUNT,
    phases = PHASES,
  } = options;
  const startTime = endTime - windowSeconds;
  const step = windowSeconds / (pointCount - 1);
  for (let i = 0; i < pointCount; i++) {
    const u = startTime + i * step;
    const base = i * 3;
    for (let axis = 0; axis < 3; axis++) {
      out[base + axis] = axis < freqs.length ? axisValue(freqs[axis], u, scale, phases[axis]) : 0;
    }
  }
  return out;
}
