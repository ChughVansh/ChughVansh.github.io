// Loads the visualizer after first paint (VIZ-18) and mounts it on every [data-chord-viz] element.
async function start() {
  const { mountChordViz } = await import('./index.js');
  document.querySelectorAll('[data-chord-viz]').forEach((element) => mountChordViz(element));
}

if ('requestIdleCallback' in window) requestIdleCallback(start);
else setTimeout(start, 0);
