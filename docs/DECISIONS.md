# Decisions

Decisions made after `PROJECT_BRIEF.md` was written. The brief says which ones need an entry.

# ADR-001: Use the Academic Pages template

- Date: 2026-10-09
- Status: accepted

## Context
The brief (O-01) left open whether to use the Academic Pages template or a custom build, to be decided by a Phase 0 evaluation of both.

## Options considered
1. Academic Pages template: ready-made structure (collections for publications and projects, author sidebar). Needs Ruby and Jekyll for a local preview. Ships styles that conflict with §9 (shadows, transitions, Font Awesome icon fonts, a dark-mode toggle).
2. Custom build: plain HTML, CSS and JS with no build step. Full control over §9. More to write by hand.

## Decision
Academic Pages. The owner chose it for a traditional template look. The Phase 0 spike was skipped.

## Consequences
- The template path in §12 and phases B1 to B5 apply, in place of phases 1 to 3.
- Local preview uses Ruby 3.3.12 (rbenv) and Bundler, with gems kept in `vendor/bundle`.
- The template's styles must be brought in line with §9 in phase B3. Known conflicts: shadows and transitions in `_sass`, Font Awesome icon fonts (SHELL-5), the theme toggle (dark mode is deferred), the "Follow" button, the RSS link, and the footer line that credits and links the template.
- `AGENTS.md` ships with the template and is excluded from the published site. Merge it with brief §4 or remove it later.

# ADR-002: Replace the template's presentation layer

- Date: 2026-10-10
- Status: proposed (owner to confirm)

## Context
Phase B3 says to restyle Academic Pages to brief section 9. The template's CSS and JS conflict with it in many places: animations on every page, shadows, uppercase labels, a dark-mode toggle, jQuery, a "Follow" button that hides the icons on phones, Font Awesome and Academicons icon fonts, and third-party scripts (jsDelivr, MathJax, Plotly, Mermaid). Brief D-12 and SHELL-5 rule these out.

## Options considered
1. Patch the template's Sass (about 3,600 lines) and JS. Many small edits, easy to miss one, hard to explain.
2. Keep Jekyll, its layouts, collections and `_config.yml`, but replace the CSS and JS with a small stylesheet written for section 9.

## Decision
Option 2. Styles are in `_sass/` (tokens, base, layout, components, viz) and compile to one `assets/css/main.css`. No JavaScript is loaded except the visualizer, on Home. Icons are inline SVG from `_data/icons.yml`.

## Consequences
- Content still works the template way: `_publications/` and `_portfolio/` entries, `_data/` files, `_config.yml` author block.
- The Sass tokens file is the one place to change the look (section 9.4).
- The sidebar appears on every page (O-12 default). Duplicated shell markup is not needed because Jekyll layouts share it (O-04).
- Icon sources (SHELL-5): GitHub, LinkedIn and email are from Font Awesome Free 6.7.2 (icons CC BY 4.0, https://fontawesome.com/license/free). Google Scholar is from Academicons by James Walsh (SIL OFL 1.1 for the font). Attribution is recorded here.
- Unused template files can be deleted from the repo: old `_sass/` folders, `assets/fonts`, `assets/webfonts`, `assets/js` leftovers, `talkmap*`, `markdown_generator`, `scripts`, and `.github/` workflows. They are excluded from the build in `_config.yml`.

# ADR-003: Chord visualizer renderer and constants

- Date: 2026-10-10
- Status: proposed (owner to approve by eye, brief Phase 4a)

## Context
O-09 asks for Canvas 2D or Three.js. D-12 allows no third-party scripts, and rule 4.2 says a new dependency needs approval.

## Decision
Canvas 2D with a manual perspective projection. No library. It draws one polyline of 2,048 points per frame into reused buffers and meets section 8. Three.js was not prototyped.

## Constants to tune by eye (in `assets/js/chord-viz/curve.js` and `view.js`)
- `VISUAL_SCALE`: the lowest playable note (C4) moves at 0.5 visual cycles per second.
- `WINDOW_SECONDS` 8, `POINT_COUNT` 2048, `PHASES` [0, pi/2, pi/4].
- Camera: yaw 0.6, pitch -0.45, distance 4, focal length 3.4.
These are starting values. They have been checked for fit in a browser, but the "rotating in real time" look still needs the owner's judgment.

## Consequences
- Pure math is in `curve.js`, `keymap.js` and `tuning.js` with unit tests (`npm test`).
- Octave shift (VIZ-21) and per-note colors (VIZ-22) are not built (could-have items).

# ADR-004: HARP paper not listed under Publications

- Date: 2026-10-10
- Status: accepted

## Context
The brief (D-18, section 7.4) lists the HARP paper with the other entries. The owner does not want it on the Publications page for now, and plans a new CV without it.

## Decision
Remove the `harp` entry from `_publications/`. HARP stays as research experience at the top of the Projects page (D-19, D-23). Publications now has three entries: `mix-jepa`, `oh-sheet`, `whatcha-lookin-for`.

## Consequences
- Nothing links to `/publications/#harp`, so removing the id breaks no link.
- To bring the paper back, add `_publications/harp.md` with `order` set to place it.
- The brief's section 7.4 table and D-18 are out of date on this point.

# ADR-005: Visualizer draws for one, two or three notes

- Date: 2026-10-11
- Status: accepted (owner request)

## Context
The brief (VIZ-10, VIZ-11) says the curve draws only for exactly three notes, and shows nothing for any other count.

## Decision
- One note: a dot moving left and right along the x axis.
- Two notes: a flat curve in a plain 2D view (sorted frequencies on x and y).
- Three notes: the 3D curve, as before.
- Zero notes, or four or more: the canvas stays empty. Sound is unaffected (O-06).
The heading stays "Visualize your favorite triad!" (VIZ-2).

## Consequences
- `curve.js` takes 1 to 3 frequencies. Missing axes are 0. Tests cover each case.
- The brief's VIZ-10 and VIZ-11 are out of date on this point.
- Voice: `VOICE` in `audio.js` sets the synth sound. The brief says sine (VIZ-5); the default is still sine, so a change would need a note here.

# Music page data

Performances and Instagram clips live in `_data/music.yml`, not in the page. See the comments at the top of that file.

# ADR-006: Visualizer rotation and a visual-only tuning option

- Date: 2026-10-11
- Status: accepted (owner request)

## Context
The brief (VIZ-13) says the camera is fixed and the curve drifts by itself. The owner expected the axes of the 3D figure to rotate.

## Decision
- With three notes the whole figure turns slowly around the vertical axis. `ROTATION_SPEED` in `view.js` sets the speed (radians per second). Set it to 0 for a still camera. With reduced motion the figure is drawn still, at the starting angle.
- `VISUAL_TUNING` in `index.js` (or the `visualTuning` option) picks what frequencies the curve uses: 'equal' (12-tone equal temperament, the default) or 'just' (perfect ratios above the lowest held note, for example 3:2 for a fifth). It changes only the drawing. The sound is always equal temperament (VIZ-4).

## Consequences
- With 'just', figures close into clean shapes. With 'equal' they slowly morph while they rotate.
- Tritones use 45/32 and minor sevenths use 9/5. Change `JUST_RATIOS` in `tuning.js` to try others.
- VIZ-13's "fixed perspective view" is out of date on this point.
