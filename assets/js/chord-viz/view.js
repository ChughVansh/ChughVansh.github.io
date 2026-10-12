// Canvas 2D renderer. One note: a dot moving left and right.
// Two notes: the whole closed figure, flat, with a dot moving along it.
// Three notes: the same in 3D, turning slowly. One draw per frame, no allocation.
import { fillCurve, samplePoint, figureSeconds, figurePoints, POINT_COUNT, WINDOW_SECONDS, MAX_FIGURE_POINTS } from './curve.js';

// Fixed camera, set by eye. Angles in radians.
// Starting yaw. With three notes the figure then turns around the vertical axis.
const YAW = 0.6;
// How fast the 3D figure turns, in radians per second. 0 keeps the camera still.
const ROTATION_SPEED = 0.35;
const PITCH = -0.45;
const CAMERA_DISTANCE = 4;
const FOCAL_LENGTH = 3.4;
// Fraction of the canvas the curve may fill.
const FILL = 0.6;
const LINE_WIDTH = 1.5;
// One note: dot radius in CSS pixels, and how much of the width it travels across.
const DOT_RADIUS = 7;
const DOT_TRAVEL = 0.85;
// The dot that moves along a two or three note figure.
const FIGURE_DOT_RADIUS = 5;
const MAX_PIXEL_RATIO = 2;
// With reduced motion we draw one frame at this time instead of animating.
const STATIC_END_TIME = WINDOW_SECONDS;

const cosP = Math.cos(PITCH);
const sinP = Math.sin(PITCH);

export function createView(canvas, ctx, { lineColor } = {}) {
  // Buffers are allocated once and reused every frame.
  const points = new Float32Array(MAX_FIGURE_POINTS * 3);
  const dot = new Float32Array(3);
  const screen = new Float64Array(2);
  // Length and point count of the current chord's whole figure. Changed only when the notes change.
  const curveOptions = { windowSeconds: WINDOW_SECONDS, pointCount: POINT_COUNT };
  // Time the drawn figure starts at. It is rebuilt each loop, which only matters in equal
  // temperament, where the figure drifts a little. null means it needs building.
  let figureStart = null;
  // The sounding notes, sorted. Replaced only when the notes change, never per frame.
  let notes = null;
  let visible = true;
  let frameId = 0;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const color = lineColor || getComputedStyle(canvas).getPropertyValue('--color-curve').trim() || '#24292f';

  function draw(endTime, animated = false) {
    // Reduced motion draws a still frame at the starting yaw.
    const yaw = animated ? YAW + ROTATION_SPEED * endTime : YAW;
    const cosY = Math.cos(yaw);
    const sinY = Math.sin(yaw);
    const width = canvas.width;
    const height = canvas.height;
    const pixel = canvas.clientWidth ? width / canvas.clientWidth : 1;
    ctx.clearRect(0, 0, width, height);
    if (!notes) return;

    const cx = width / 2;
    const cy = height / 2;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = LINE_WIDTH * pixel;
    ctx.lineJoin = 'round';

    if (notes.length === 1) {
      samplePoint(points, notes, endTime);
      ctx.beginPath();
      ctx.arc(cx + points[0] * (width / 2) * DOT_TRAVEL, cy, DOT_RADIUS * pixel, 0, 2 * Math.PI);
      ctx.fill();
      return;
    }

    // Two or three notes: build the whole figure once per loop, draw it, then draw the dot.
    if (figureStart === null || endTime < figureStart || endTime - figureStart >= curveOptions.windowSeconds) {
      fillCurve(points, notes, endTime + curveOptions.windowSeconds, curveOptions);
      figureStart = endTime;
    }
    const half = (Math.min(width, height) / 2) * FILL;
    const flat = notes.length === 2;

    ctx.beginPath();
    for (let i = 0; i < curveOptions.pointCount; i++) {
      project(points[i * 3], points[i * 3 + 1], points[i * 3 + 2], flat, half, cx, cy, cosY, sinY);
      if (i === 0) ctx.moveTo(screen[0], screen[1]);
      else ctx.lineTo(screen[0], screen[1]);
    }
    ctx.stroke();

    samplePoint(dot, notes, endTime);
    project(dot[0], dot[1], dot[2], flat, half, cx, cy, cosY, sinY);
    ctx.beginPath();
    ctx.arc(screen[0], screen[1], FIGURE_DOT_RADIUS * pixel, 0, 2 * Math.PI);
    ctx.fill();
  }

  // Writes the screen position of a point into `screen`.
  function project(x, y, z, flat, half, cx, cy, cosY, sinY) {
    if (flat) {
      // Two notes: a plain 2D view, no camera.
      screen[0] = cx + x * half;
      screen[1] = cy - y * half;
      return;
    }
    // Rotate by the yaw and the fixed pitch, then project with perspective.
    const x1 = x * cosY + z * sinY;
    const z1 = -x * sinY + z * cosY;
    const y1 = y * cosP - z1 * sinP;
    const z2 = y * sinP + z1 * cosP;
    const k = (FOCAL_LENGTH / (CAMERA_DISTANCE - z2)) * half;
    screen[0] = cx + x1 * k;
    screen[1] = cy - y1 * k;
  }

  function frame(now) {
    frameId = 0;
    draw(now / 1000, true);
    schedule();
  }

  // Animate only when there is something to draw, the canvas is on screen, the
  // tab is visible, and the visitor has not asked for reduced motion (VIZ-14, VIZ-15).
  function schedule() {
    const animating = Boolean(notes) && visible && !document.hidden && !reducedMotion.matches;
    if (animating && !frameId) frameId = requestAnimationFrame(frame);
    if (!animating && frameId) {
      cancelAnimationFrame(frameId);
      frameId = 0;
    }
  }

  function redraw() {
    // Static frames: empty canvas, or the reduced-motion frame.
    if (!notes || reducedMotion.matches) draw(STATIC_END_TIME);
    schedule();
  }

  function resize() {
    const ratio = Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO);
    canvas.width = Math.max(1, Math.round(canvas.clientWidth * ratio));
    canvas.height = Math.max(1, Math.round(canvas.clientHeight * ratio));
    redraw();
  }

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvas);

  const intersectionObserver = new IntersectionObserver((entries) => {
    visible = entries[entries.length - 1].isIntersecting;
    schedule();
  });
  intersectionObserver.observe(canvas);

  const onVisibility = () => schedule();
  const onMotionChange = () => redraw();
  document.addEventListener('visibilitychange', onVisibility);
  reducedMotion.addEventListener('change', onMotionChange);

  /** Pass 1 to 3 frequencies sorted ascending and loopCycles() for them, or null to clear the canvas. */
  function setNotes(sorted, cycles = 0) {
    notes = sorted;
    figureStart = null; // the figure is rebuilt for the new notes
    if (sorted && sorted.length > 1 && cycles > 0) {
      curveOptions.windowSeconds = figureSeconds(cycles, sorted[0]);
      curveOptions.pointCount = figurePoints(curveOptions.windowSeconds, sorted[sorted.length - 1]);
    }
    redraw();
  }

  function dispose() {
    if (frameId) cancelAnimationFrame(frameId);
    frameId = 0;
    resizeObserver.disconnect();
    intersectionObserver.disconnect();
    document.removeEventListener('visibilitychange', onVisibility);
    reducedMotion.removeEventListener('change', onMotionChange);
  }

  return { setNotes, dispose };
}
