/** 12-tone equal temperament. MIDI note n has frequency a4Hz * 2^((n - 69) / 12). */
export function midiToHz(midi, a4Hz = 440) {
  return a4Hz * 2 ** ((midi - 69) / 12);
}

// Perfect (just intonation) ratios for 0 to 11 semitones above a root, as [numerator, denominator].
const JUST_FRACTIONS = [[1, 1], [16, 15], [9, 8], [6, 5], [5, 4], [4, 3], [45, 32], [3, 2], [8, 5], [5, 3], [9, 5], [15, 8]];

/** Just ratio as a reduced [numerator, denominator] for any number of semitones above a root. */
export function justFraction(semitones) {
  const octaves = Math.floor(semitones / 12);
  const [base, denominator] = JUST_FRACTIONS[semitones - 12 * octaves];
  const numerator = base * 2 ** octaves;
  const divisor = gcd(numerator, denominator);
  return [numerator / divisor, denominator / divisor];
}

/** Just ratio for any number of semitones above a root. 12 is 2, 19 is 3, and so on. */
export function justRatio(semitones) {
  const [numerator, denominator] = justFraction(semitones);
  return numerator / denominator;
}

function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

/**
 * How many cycles of the lowest note pass before the whole figure repeats, when the notes
 * are perfect ratios. C E G is 4 (ratios 1, 5/4, 3/2); C Eb G is 10 (1, 6/5, 3/2).
 * Drawing exactly this long makes the start and end of the curve meet.
 * `midis` are sorted ascending.
 */
export function loopCycles(midis) {
  let cycles = 1;
  for (let i = 1; i < midis.length; i++) {
    const [, denominator] = justFraction(midis[i] - midis[0]);
    cycles = (cycles * denominator) / gcd(cycles, denominator);
  }
  return cycles;
}

/**
 * Frequencies to draw for sorted MIDI notes.
 * 'equal': 12-tone equal temperament, the same as what you hear.
 * 'just': the lowest note keeps its equal-tempered pitch and every other note is a
 * perfect ratio above it. Only the drawing changes; the sound is always equal temperament.
 */
export function visualFrequencies(midis, a4Hz = 440, mode = 'equal') {
  if (mode !== 'just') return midis.map((midi) => midiToHz(midi, a4Hz));
  const root = midiToHz(midis[0], a4Hz);
  return midis.map((midi) => root * justRatio(midi - midis[0]));
}
