# Portfolio Site: Project Brief

| Field | Value |
|---|---|
| Owner | Vansh Chugh |
| Live URL | https://chughvansh.github.io |
| Repository | `ChughVansh/ChughVansh.github.io` (public) |
| Status | Draft 0.2.4, awaiting owner review |
| Last updated | 2026-10-08 |
| Suggested location | `docs/PROJECT_BRIEF.md` |

---

## 1. How to use this document

This brief is the source of truth for the project. It is written so that any coding assistant can pick up work in a fresh session.

At the start of every session:

1. Read §4 (collaboration rules) and §5 (decisions).
2. Read only the sections listed for the current phase in §13.
3. Check `docs/DECISIONS.md` for decisions made after this brief was written.
4. Do not rely on earlier chat history. Anything that matters is written down here or in `docs/DECISIONS.md`.

**Priority tags.** Requirements use MoSCoW tags: **[M]** must, **[S]** should, **[C]** could.

**Markers.** Anything missing is marked so it can be found with `grep`:

| Marker | Meaning |
|---|---|
| `TODO(content)` | The owner supplies the text or URL. |
| `TODO(asset)` | The owner supplies a file. |
| `TODO(decision)` | An open decision from §5.2. |

**This repository is public.** Do not commit secrets or private details. Contact details appear only if the owner enables them.

---

## 2. Summary

A personal portfolio for audio and machine-learning work. It has five pages: Home, Projects, Publications, Music, and Contact. Home includes an interactive chord visualizer: the visitor plays three notes on a computer keyboard and sees a 3D curve built from their frequencies.

The site is also a showcase of the owner's engineering. The repository will be read by others, so code quality, structure, and documentation matter. **The site itself must not say this.** It never mentions that it is a portfolio project, and it does not link to its own source.

### 2.1 Goals

| ID | Goal |
|---|---|
| G1 | Present research, projects, and music clearly to academic reviewers (admissions committees, prospective advisors) and collaborators. |
| G2 | Be simple, fast, accessible, and readable on a phone. |
| G3 | Keep the repository clean: readable code, short docs, tests for logic, automated checks. |
| G4 | Include one memorable interactive element: the chord visualizer. |
| G5 | Make updates easy: a new paper, project, or news item should take minutes. |

### 2.2 Non-goals

Blog, CMS, comments, contact form or any backend, analytics or tracking, live Instagram feed, internationalization.

**Deferred (may return later):** dark mode, motion outside the visualizer.

---

## 3. Users and primary use cases

| User | What they do | What they need |
|---|---|---|
| Admissions reviewer or prospective advisor | Reads About, opens Publications, downloads the CV, reads one project. | Everything important in under two minutes. |
| Collaborator or peer | Opens Projects, follows demo and GitHub links. | Accurate links and short, plain descriptions. |
| Music listener | Opens Music, watches clips, follows YouTube or Instagram. | Media that loads only when asked. |
| Curious visitor | Plays the chord visualizer. | It works on the first key press. |

---

## 4. Collaboration rules (apply to every assistant session)

1. **Ask, do not assume.** If a request is ambiguous or underspecified, ask one focused question before acting.
2. **Confirm architecture first.** Before adding a dependency, build tool, folder structure, data format, or pattern that other code will rely on, describe it and wait for approval. Record the outcome in `docs/DECISIONS.md`.
3. **Propose, then apply.** The default is ask mode. Show changes as a diff or a short description and wait for approval. Apply changes directly only when the owner says to proceed for that task.
4. **Verify before fixing.** When debugging, confirm the cause with a command, or ask the owner to run a snippet and share the output. Do not patch from guesses.
5. **Comment non-obvious code.** Keep comments short and explain why, not what.
6. **Keep phases self-contained.** Each session starts from this brief and the files listed for the phase.
7. **Keep copy plain.** Any text the assistant writes (labels, alt text, README, commit messages) uses simple sentences and plain words. The assistant never writes the owner's About or Updates.
8. **Do not invent facts.** Titles, venues, dates, links, and numbers come from §14 only. Missing items stay marked `TODO(...)`.
9. **This brief wins.** It overrides template defaults and any design guidance file added to the repo. If such a file suggests a bolder look, follow §9 instead unless the owner approves a change.

---

## 5. Decisions

### 5.1 Decided and proposed

Status **Decided** means the owner chose it. Status **Proposed** means the assistant must confirm it with the owner first (rule 4.2).

| ID | Decision | Status |
|---|---|---|
| D-01 | Host on GitHub Pages as a user site: repo `ChughVansh.github.io`, deploy from branch `main`, root folder. | Decided |
| D-02 | Pages: Home, Projects, Publications, Music, Contact. Fixed top bar. | Decided |
| D-03 | Layout A: left author sidebar (photo, name, icons) plus a main column. | Decided |
| D-04 | Publications is its own page. Plain citation list. No BibTeX toggle. | Decided |
| D-05 | Music is its own page. YouTube is embedded. Instagram clips are exported and self-hosted. A button links to the Instagram highlights. No Instagram embed or API. | Decided |
| D-06 | Social links are hyperlinked icons. GitHub and LinkedIn are live. Email and Google Scholar are present but commented out until the owner adds URLs. | Decided |
| D-07 | Visualizer behavior as specified in §8. | Decided |
| D-08 | No motion or transitions outside the visualizer, for now. The CSS must make it easy to add motion later (§9.4). | Decided |
| D-09 | Visual constraints in §9.1. | Decided |
| D-10 | Projects use plain bordered entries (§7.3), not shadowed or lifted cards. | Decided |
| D-11 | The owner writes About and Updates. | Decided |
| D-12 | No analytics, no cookies, no third-party scripts. YouTube embeds are the only third-party content. | Decided |
| D-13 | The site never mentions that it is a portfolio project and never links to its own source. | Decided |
| D-14 | The CV is a PDF at `/files/cv.pdf`, linked from the sidebar and the Contact page, not from the top bar. | Proposed |
| D-15 | Clean URLs through folder index files: `/projects/`, `/publications/`, `/music/`, `/contact/`. | Proposed |
| D-16 | The public CV has the phone number removed. The email stays as on the CV. The owner regenerates the PDF from source and checks that the number is gone from the text layer. | Decided |
| D-17 | The research-interests line from the CV is shown on the site. Default placement: sidebar, under the name, so it appears on Home. Text, verbatim: "Audio effects representation learning, automatic mixing, real-time human–AI music co-creation". | Decided |
| D-18 | Publications lists the entries as worded on the CV, including work under review or in preparation (§7.4). | Decided |
| D-19 | HARP appears as research experience, not as a project. | Decided |
| D-20 | The descriptions of Oh Sheet!, Whatcha Lookin' For?, and meeting-transcriber in §7.3 are approved. | Decided |
| D-21 | Entry ids are short lowercase slugs of the project or paper name (`oh-sheet`, `harp`, `whatcha-lookin-for`), not the `lastname-year-firstword` citation format. | Decided |
| D-22 | The Junior Honors Thesis is not listed on the Publications page and has no section or heading of its own. The owner mentions it in the About text. | Decided |
| D-23 | Research experience (HARP) appears as a section titled "Research experience" at the top of the Projects page. No new nav item. | Decided |

### 5.2 Open decisions

| ID | Question | Default if unanswered | Blocks |
|---|---|---|---|
| O-01 | Academic Pages template or custom build? | Decided by the Phase 0 evaluation. | Phase 1 |
| O-02 | Colors and fonts. | Provisional tokens in §9.4. | Nothing (tokens are swappable) |
| O-03 | Publications and projects as hand-written HTML, or rendered from JSON? | Hand-written HTML while lists stay under about 10 entries. JSON hides content from clients without JavaScript and needs a local server. | Phase 2 |
| O-04 | Shared header and sidebar across pages without a build step: duplicate the markup per page, or include it with a small script? | Duplicate the markup (five pages). | Phase 1 |
| O-05 | Where the visualizer sits on Home, and its line color. The owner will experiment. | Below About, one line color. | Nothing (config) |
| O-06 | Do notes sound for any number of held keys? | Yes. The curve draws only for exactly three. | Phase 4b |
| O-07 | Media for meeting-transcriber. The repo is a FastAPI backend, not a CLI, so "sample output" needs a new answer: a sample transcript excerpt or API response as text, or no media. | No media until the owner decides. | Phase 2 |
| O-08 | Licenses. | Code under MIT. Text, images, and video all rights reserved. | Phase 5 |
| O-09 | Visualizer renderer: Canvas 2D with manual perspective projection, or Three.js? | Prototype both in Phase 4a. Prefer the simpler one that meets §8. | Phase 4b |
| O-10 | Format of Updates entries. | Date, one sentence, optional link. | Phase 2 |
| O-12 | Does the sidebar appear on every page, or only on Home? | Every page, as in the template. | Phase 1 |

---

## 6. Information architecture

| Path | Page | Nav label | Purpose |
|---|---|---|---|
| `/` | Home | Site name "Vansh Chugh" (links home) | About, visualizer, updates |
| `/projects/` | Projects | Projects | Three projects with demos and source |
| `/publications/` | Publications | Publications | Papers and theses |
| `/music/` | Music | Music | YouTube embeds and Instagram clips |
| `/contact/` | Contact | Contact | Links and CV |

Use root-relative URLs (`/css/...`). This is a user site served from the domain root, so they are safe.

---

## 7. Page requirements

### 7.1 Shell (all pages)

| ID | Req | Pri |
|---|---|---|
| SHELL-1 | Fixed top bar: site name on the left, then Projects, Publications, Music, Contact. The current page has `aria-current="page"`. | M |
| SHELL-2 | Main content is offset by the header height. `scroll-padding-top` is at least the header height, so anchors and focused elements are never hidden (WCAG 2.2 SC 2.4.11). | M |
| SHELL-3 | Author sidebar at wide viewports: photo, name, the research-interests line (D-17), icon links, CV link. It appears on every page unless O-12 says otherwise. Below the breakpoint it stacks above the main content with a smaller photo. | M |
| SHELL-4 | Skip-to-content link is the first focusable element. | M |
| SHELL-5 | Icons are inline SVG with `aria-label`. No icon fonts and no CDNs. Record the icon set and its license in `docs/DECISIONS.md`. | M |
| SHELL-6 | Commented-out icons (email, Google Scholar) keep ready-to-uncomment markup with an obvious placeholder `href`. | M |
| SHELL-7 | Footer shows copyright only. No "built with" line and no link to the source repository (D-13). | M |
| SHELL-8 | `404.html` in the site root, using the same shell. | S |

### 7.2 Home

| ID | Req | Pri |
|---|---|---|
| HOME-1 | About: up to three paragraphs, written by the owner. Until supplied, show `TODO(content)`. The headshot is in the sidebar with plain `alt` text. | M |
| HOME-2 | Visualizer section (§8) with the heading "Visualize your favorite triad!". | M |
| HOME-3 | Updates: reverse-chronological list. Each entry has a date in a `<time datetime>` element, one sentence, and an optional link. | M |
| HOME-4 | Default order: About, Visualizer, Updates (O-05). | M |

### 7.3 Projects

Entries. Descriptions and tech lists come from the owner's CV. Do not add claims, numbers, or technologies that are not listed here.

1. **Oh Sheet!** Demo: https://music-app-924.pages.dev/
   - Description (approved): A browser app that turns photos and scans of sheet music into editable, playable MusicXML. It handles classical scores and handwritten jazz lead sheets by sending each score to a different model.
   - Tech: Modal (serverless GPU), an LLM, a CNN, and a YOLO plus sequence model for jazz.
   - Related paper: link to `#oh-sheet` on the Publications page.
2. **Whatcha Lookin' For?** Demo: https://whatcha-lookin-for.vercel.app/
   - Description (approved): Type what you want to hear, such as "metal songs with violin", and get matching tracks. An LLM turns the prompt into a database query. Instrument features for 650+ tracks come from source separation and audio analysis.
   - Tech: FastAPI, Groq-hosted LLaMA 3.3 70B, SQLite, Demucs, librosa, BeautifulSoup.
   - Related paper: link to `#whatcha-lookin-for` on the Publications page.
3. **meeting-transcriber.** Source: https://github.com/ChughVansh/meeting-transcriber
   - Description (approved): A FastAPI backend that transcribes in-person meetings. It splits the audio into segments, matches each one to enrolled voice samples to label the speaker, and produces a summary and action items with dates.
   - Tech: Python, FastAPI, Whisper, SpeechBrain, a Groq-hosted LLM. The README shows FastAPI, Whisper, and a Groq API key. SpeechBrain comes from the CV.
   - Do not call it a CLI or "local". The repository is a backend API, and its summary step uses a hosted LLM.

HARP is not a project entry (D-19). See §7.7.

| ID | Req | Pri |
|---|---|---|
| PROJ-1 | Each entry has a title (linked), a one-line description, the tech used, and links (demo and/or source). | M |
| PROJ-2 | Plain bordered entries: 1px border, radius 4px or less, no shadow, no hover lift. One column. Media on the left at wide viewports and on top on phones. | M |
| PROJ-3 | Screenshots live in `assets/img/projects/`, are under about 200 KB each, and have `width`, `height`, `alt`, and `loading="lazy"`. | M |
| PROJ-4 | meeting-transcriber media follows O-07. If a text excerpt is used, show it in a `<pre><code>` block. | M |
| PROJ-5 | Each project entry has an `id`: `oh-sheet`, `whatcha-lookin-for`, `meeting-transcriber`. The HARP entry (§7.7) uses `harp`. An id only has to be unique within its page. | M |

### 7.4 Publications

| ID | Req | Pri |
|---|---|---|
| PUB-1 | Plain list, newest first. Each entry: authors, title, venue, year, and links (PDF, arXiv, DOI, code) when they exist. No BibTeX toggle. | M |
| PUB-2 | Each entry has a stable `id`: a short lowercase slug of the project or paper name, with hyphens. The ids are listed below. | M |
| PUB-3 | Do not invent fields. A missing link or DOI is omitted or marked `TODO(content)`. | M |
| PUB-4 | Markup allows grouping headings (for example "Workshop papers", "Journal articles") to be added later without rewriting entries. | S |

Entries, newest first. The wording is verbatim from the owner's CV. Words like "under review" and "in preparation" stay in the entry text and are updated by the owner when the status changes. Links are `TODO(content)` for every entry.

| id | Entry |
|---|---|
| `mix-jepa` | V. Chugh and Y.-T. Yeh, "Mix-JEPA: A Joint Embedding Predictive Architecture for Music Mixing Representation," under review at IEEE International Conference on Acoustics, Speech and Signal Processing (ICASSP), 2027. |
| `harp` | F. Cwitkowitz, J. Smith, C. Lu, S. Paliwan, V. Chugh, V. Mistri, Z. Duan, and B. Pardo, "HARP: Bridging Cutting-Edge Music AI Research with Music Production Workflows," in preparation for Transactions of the International Society for Music Information Retrieval (TISMIR), 2027. |
| `oh-sheet` | V. Chugh, A. Phan, and K. Fatima, "Oh Sheet!: A Browser-Based Optical Music Recognition Tool for Classical and Handwritten Jazz Lead Sheets," in Extended Abstracts for the Late-Breaking Demo Session of the 27th International Society for Music Information Retrieval Conference (ISMIR), 2026. |
| `whatcha-lookin-for` | V. Chugh, "Prompt-Based Music Discovery: A Prototype Using Source Separation and LLMs," in Extended Abstracts for the Late-Breaking Demo Session of the 26th International Society for Music Information Retrieval Conference (ISMIR), 2025; also presented at the NeurIPS 2025 Workshop on Artificial Intelligence for Music: Where Creativity Meets Computation (AI4Music). |

The Junior Honors Thesis is not listed here (D-22). For reference, its official title is "Context-Aware Representation Learning for Mix Compatibility Estimation", with no hyphen in "Mix Compatibility".

An id is the `id` attribute of its entry on the Publications page. It makes direct links possible, for example `/publications/#oh-sheet`, and lets a project entry link to its paper. Once an id is public, do not change it.

Ids only have to be unique within a page. The Projects page uses the same names for its own entries (PROJ-5).

### 7.5 Music

| ID | Req | Pri |
|---|---|---|
| MUS-1 | One-sentence intro written by the owner. | M |
| MUS-2 | YouTube: specific videos embedded through `https://www.youtube-nocookie.com/embed/<id>` with `loading="lazy"` and a descriptive `title`. Link to the channel: https://www.youtube.com/@1shh855. First video: id `V1yAOLLeyXg` (https://www.youtube.com/watch?v=V1yAOLLeyXg). Check that embedding is allowed for each video before building around it. | M |
| MUS-3 | Instagram clips are self-hosted: `<video controls preload="none" poster="...">` with H.264 MP4 files in `assets/video/`. Keep each clip short, 720p at most, and about 10 MB or less. | M |
| MUS-4 | A plain link styled as a button, "See more on Instagram", goes to the highlights URL (`TODO(content)`). Until the owner supplies it, link to the profile: https://www.instagram.com/_.vansh_chugh._/. No Instagram scripts. | M |
| MUS-5 | Layout handles both 16:9 (YouTube) and vertical 9:16 (Instagram) media, using `aspect-ratio`. | S |
| MUS-6 | A lightweight click-to-load facade for YouTube. | C |

### 7.6 Contact

| ID | Req | Pri |
|---|---|---|
| CONT-1 | List GitHub and LinkedIn. Email and Google Scholar are present as commented-out markup (D-06). The CV link points to `/files/cv.pdf`. | M |

### 7.7 Research experience

Placement is decided (D-23): a section titled "Research experience" at the top of the Projects page.

| ID | Req | Pri |
|---|---|---|
| RES-1 | One entry for HARP: role, lab, advisor, dates, and the three points below. Link to HARP (`TODO(content)`). | M |
| RES-2 | The text comes from the CV. Shorten only with owner approval, and never change a number. | M |
| RES-3 | Same plain entry style as projects (PROJ-2), without a screenshot unless the owner supplies one. | M |

Entry text from the CV:

- **Research Intern**, Audio Information Research Lab, University of Rochester. Advisor: Zhiyao Duan. June 2026 to Sep. 2026.
- Deployed 25 of HARP's 75 models in 3 months, pairing LLM-agent judgment with deterministic verification gates (dead-code pruning, preflight checks, live inference probing), cutting deployment time from hours to minutes.
- Contributed to a systematic validation framework testing models across varied input lengths, sample rates, channel counts, and file types (95% of Spaces passing), and reviewed two 4,000+ line PRs, including the framework itself.
- Built a JUCE C++ text-output component, extending output support beyond audio and MIDI files.

---

## 8. Chord visualizer

### 8.1 Behavior

The visitor sees a heading, an on-screen piano, and an empty canvas. They press keys on the computer keyboard (or click and tap the on-screen keys). Each held key plays a note and lights up. When **exactly three** notes are sounding, the canvas draws a 3D curve built from their frequencies, and the curve keeps evolving in real time. For any other number of notes, the canvas shows nothing and the page shows no message.

Each on-screen key shows its computer-key letter. That is the only instruction.

### 8.2 Requirements

| ID | Req | Pri |
|---|---|---|
| VIZ-1 | Exposed as `mountChordViz(rootElement, options)`. No globals. Works wherever it is mounted (O-05). Options include `lineColor`, `a4Hz` (default 440), and `baseMidi` (default 60). | M |
| VIZ-2 | An `<h2>` reads exactly "Visualize your favorite triad!". | M |
| VIZ-3 | Key map as in §8.3, matched with `KeyboardEvent.code`, so it works on any keyboard layout. | M |
| VIZ-4 | Tuning is 12-tone equal temperament with A4 = 440 Hz. MIDI note `n` has frequency `440 * 2^((n - 69) / 12)`. | M |
| VIZ-5 | Audio uses the Web Audio API only: one sine oscillator per held key, a short gain attack and release (about 5 to 20 ms, as a named constant) to avoid clicks, and master gain scaled by voice count to avoid clipping. | M |
| VIZ-6 | The `AudioContext` is created or resumed on the first key press or pointer down. No prompt is shown. | M |
| VIZ-7 | A pressed key shows its active state immediately for both keyboard and pointer input. It clears on key up or pointer up. No transition. | M |
| VIZ-8 | Input hygiene: ignore `event.repeat`. Ignore combinations with Ctrl, Meta, or Alt. Ignore keys when focus is in an editable element. Call `preventDefault` only for mapped keys. Release all notes on window `blur`, when the tab becomes hidden, and on `pointercancel`. No stuck notes. | M |
| VIZ-9 | Support at least 10 simultaneous voices. | M |
| VIZ-10 | The curve draws only when exactly three notes sound. For 0, 1, 2, or 4 or more notes the canvas is empty and no message appears. | M |
| VIZ-11 | The three frequencies are sorted ascending and mapped to the x, y, and z axes in that order. | M |
| VIZ-12 | While three notes are held the curve evolves continuously. In 12-TET most ratios are irrational, so the figure does not close and drifts. That is intended. There are no frozen frames. | M |
| VIZ-13 | Rendering draws one polyline of N points per frame, with no per-frame memory allocation. Camera is a fixed perspective view. The canvas background matches the page. | M |
| VIZ-14 | 60 fps on a mid-range laptop. Rendering pauses when the canvas is offscreen. The pixel ratio is capped at 2. Resize is handled with `ResizeObserver`. Resources are released on unmount. | M |
| VIZ-15 | With `prefers-reduced-motion: reduce`, three held notes draw a static frame (no time evolution). Audio is unaffected. | M |
| VIZ-16 | Accessibility: on-screen keys are `<button type="button">` elements with `aria-label` (for example "C4") and `aria-pressed`. The canvas has `role="img"` and an `aria-label` describing it. Key outlines have at least 3:1 contrast (WCAG 1.4.11). | M |
| VIZ-17 | If a required browser feature is missing, the section shows one line, "This demo needs a browser with Web Audio." Adjust the wording if the renderer needs WebGL. This is the only permitted message. | M |
| VIZ-18 | Any heavy library loads after first paint, with a dynamic `import()`. It must not block rendering of the page. | M |
| VIZ-19 | Unit tests for the pure functions: key-to-MIDI, MIDI-to-frequency, triad sorting, curve sampling. Use Node's built-in test runner. | M |
| VIZ-20 | Narrow viewports (under 480 px) show a single octave. The key map still works. | S |
| VIZ-21 | Octave shift with Z (down) and X (up). | C |
| VIZ-22 | Per-note line colors through options. Thicker lines (WebGL lines are 1 px on most platforms, so this needs `Line2` or a 2D canvas). | C |

### 8.3 Key map (DAW layout)

White keys are on the home row. Black keys are on the row above.

| Key | `code` | Note | Key | `code` | Note |
|---|---|---|---|---|---|
| A | `KeyA` | C4 | W | `KeyW` | C#4 |
| S | `KeyS` | D4 | E | `KeyE` | D#4 |
| D | `KeyD` | E4 | T | `KeyT` | F#4 |
| F | `KeyF` | F4 | Y | `KeyY` | G#4 |
| G | `KeyG` | G4 | U | `KeyU` | A#4 |
| H | `KeyH` | A4 | O | `KeyO` | C#5 |
| J | `KeyJ` | B4 | P | `KeyP` | D#5 |
| K | `KeyK` | C5 | | | |
| L | `KeyL` | D5 | | | |
| ; | `Semicolon` | E5 | | | |
| ' | `Quote` | F5 | | | |

This is 18 keys, MIDI notes 60 to 77 (11 white, 7 black).

### 8.4 Math model

Let `f1 <= f2 <= f3` be the three sounding frequencies in Hz. Let `s` be a visual time scale, so the visual frequency of a note is `s * f`. For visual time `u` in seconds:

```
x(u) = sin(2π · s · f1 · u + φ1)
y(u) = sin(2π · s · f2 · u + φ2)
z(u) = sin(2π · s · f3 · u + φ3)
```

The polyline samples `u` at N evenly spaced points over the window `[u0 - W, u0]`. The end `u0` advances with real time.

- Starting points, to be tuned by eye in Phase 4a: choose `s` so the lowest note moves at about 0.5 visual cycles per second, and `W` so the window spans several periods of the lowest note. `N` starts near 2048.
- `s`, `W`, `N`, and the initial phases `φ` are named constants with a one-line comment each.
- For exact whole-number ratios (just intonation) the curve closes into a clean figure. The reference image shows these figures in 2D. In 12-TET the figure nearly closes for consonant intervals and then slowly drifts.
- This model is a starting point. Phase 4a confirms it gives the "rotating in real time" look the owner wants before Phase 4b builds on it.

### 8.5 Module layout (proposed, confirm per rule 4.2)

```
js/chord-viz/
  index.js     mountChordViz: wires everything together
  keymap.js    key code -> MIDI note (pure)
  tuning.js    MIDI -> frequency (pure)
  curve.js     sorting and curve sampling (pure)
  audio.js     Web Audio voices and envelopes
  view.js      renderer (Canvas 2D or Three.js, per O-09)
tests/
  keymap.test.mjs  tuning.test.mjs  curve.test.mjs
```

Keep pure math separate from audio and drawing so it can be unit tested without a browser.

---

## 9. Design constraints and tokens

### 9.1 Binding constraints

- No gradients anywhere.
- No glass, blur, or translucent panels.
- No drop shadows on cards or buttons.
- No transitions or animations. Only the visualizer moves. Hover, focus, and active states change instantly.
- No scroll-triggered reveals, parallax, or hover lift.
- No emoji in headings or labels.
- No centered hero with a slogan or tagline.
- No ALL-CAPS tracked-out labels, no small "eyebrow" labels above headings, no numbered section markers (01, 02, 03), no arrows added to link text, and no "A · B · C" meta strings.
- Do not emphasize a single word in a headline with color or italics.
- No purple-to-blue palettes and no neon accents on dark backgrounds.
- Do not default to a cream background with a display serif and a terracotta accent. If a warm tone is chosen, choose it on purpose (O-02).
- No stock illustrations and no decorative icons. The social icons are the only icons.

### 9.2 Principles

- Semantic HTML first. CSS and JavaScript add to it.
- One typeface family by default. Sentence case. Left-aligned text, never justified.
- Line length of 70 characters or less for body text. Generous, consistent spacing.
- One memorable element: the visualizer. Everything else stays quiet and plain.
- Mobile first. Nothing scrolls sideways at 320 px.

### 9.3 Writing rules for on-page text

Plain verbs and simple sentences. Name things by what a visitor expects ("Publications", not "Research output"). No marketing language. Placeholders are always an explicit `TODO(content)`, never lorem ipsum.

### 9.4 Tokens (provisional until O-02 is decided)

All colors, fonts, sizes, and spacing live in one file, `css/tokens.css`, as CSS custom properties. Changing the look is a one-file change. Verify every text and background pair for at least 4.5:1 contrast.

| Token | Provisional value |
|---|---|
| `--font-body` | System UI sans stack |
| `--font-mono` | System monospace stack |
| `--font-size-base` | `1.0625rem` |
| `--line-height-body` | `1.6` |
| `--color-bg` | `#ffffff` |
| `--color-text` | `#24292f` |
| `--color-text-muted` | `#57606a` |
| `--color-border` | `#d0d7de` |
| `--color-link` | `#0b5cab` |
| `--color-link-hover` | darker than `--color-link` |
| `--color-focus` | high-contrast outline color |
| `--color-key-active` | same as `--color-link` |
| `--color-curve` | same as `--color-text` |
| `--radius` | `2px` |
| `--header-height` | `3.5rem` |
| `--measure` | `70ch` |
| `--transition` | `none` (set to a real value if motion is added later) |

Spacing uses a 4 px base scale (`--space-1` to `--space-8`). The sidebar breakpoint is about `64rem`. CSS custom properties cannot be used in media queries, so write the value once, in one commented place.

---

## 10. Non-functional requirements

| Area | Requirement |
|---|---|
| Accessibility | WCAG 2.2 AA. Fully keyboard operable. Visible focus. Landmarks (`header`, `nav`, `main`, `aside`, `footer`). One `<h1>` per page. Alt text on all images. |
| Performance | Lighthouse (mobile) targets: 95 or higher for Accessibility, Best Practices, and SEO on all pages. Performance 95 or higher, and 90 or higher on Home. No render-blocking third-party code. System fonts. Lazy-load images, iframes, and video. |
| Browsers | Latest two versions of Chrome, Firefox, Safari (desktop and iOS), and Edge. |
| Responsive | Works from 320 px wide up. |
| Privacy | No analytics or cookies. YouTube through the privacy-enhanced domain. External links use `rel="noopener"`. |
| SEO | Unique `<title>` and meta description per page, `lang="en"`, favicon, Open Graph tags, `sitemap.xml`, `robots.txt`. |
| Size | GitHub Pages sites may be at most 1 GB, and the source repo has a recommended 1 GB limit. Keep far below that. Compress video. |
| Security | [C] A `<meta>` Content Security Policy (Pages cannot set headers), for example `default-src 'self'; frame-src https://www.youtube-nocookie.com; img-src 'self' data:; media-src 'self'`. Test that it does not break the page. |

---

## 11. Technical approach (custom path)

### 11.1 Stack

HTML5, CSS with custom properties (no preprocessor), and vanilla JavaScript as ES modules. No framework and no bundler. Node is used only for tests and a local server, with zero dependencies.

### 11.2 Repository layout

```
.
├── index.html
├── projects/index.html
├── publications/index.html
├── music/index.html
├── contact/index.html
├── 404.html
├── css/
│   ├── tokens.css
│   ├── base.css
│   ├── layout.css
│   └── components/
├── js/
│   └── chord-viz/
├── assets/
│   ├── img/            (profile, projects)
│   ├── video/          (Instagram exports and posters)
│   └── vendor/         (only if a library is approved)
├── files/cv.pdf
├── tests/
├── docs/
│   ├── PROJECT_BRIEF.md
│   ├── DECISIONS.md
│   └── reference/      (design references)
├── .nojekyll
├── .editorconfig
├── .gitignore
├── package.json        (type: module; scripts: serve, test; no dependencies)
├── LICENSE
└── README.md
```

`.nojekyll` stops GitHub Pages from running Jekyll over plain files.

### 11.3 Conventions

- CSS: mobile first. Small, single-purpose classes with a BEM-like naming scheme. No `!important`. Avoid selectors that fight each other on spacing.
- JavaScript: ES modules, `const` by default, no global state. Pure functions separate from DOM code.
- Formatting: `.editorconfig` is required. Prettier through `npx` is recommended for formatting only.
- Local preview: `npm run serve` (a simple static server on port 8000) and `npm test` (`node --test`). Use the current Node LTS.

### 11.4 Git workflow

- Trunk-based. `main` is always deployable and is what Pages serves.
- One short-lived branch per phase, named `phase-N-short-name`.
- Open a pull request per phase, even when working alone, so the owner reviews a real diff. Squash merge.
- Conventional Commits for messages (`feat:`, `fix:`, `docs:`, `chore:`).

### 11.5 Deployment and CI

- Pages: Settings, Pages, deploy from branch `main`, folder `/`.
- [S] A GitHub Actions workflow on pull requests runs unit tests, HTML validation, and an internal link check. Lighthouse CI is optional. Verify the current stable versions of any actions at implementation time and pin them.

---

## 12. Template path (Academic Pages)

This section applies only if Phase 0 chooses the template. Facts below were checked against the template repository.

- Create the repo with "Use this template" (the README's recommended path), not a fork. Updates from the template do not merge cleanly once customized, so treat it as a one-time copy.
- Local preview: Docker (`docker compose up`, port 4000), the VS Code Dev Container ("Reopen in Container"), or Ruby plus Bundler.
- Author sidebar: the `author:` block in `_config.yml` (avatar, name, bio, location, employer, email, and many social fields). Unused fields are commented out.
- Navigation: `_data/navigation.yml`. It ships with Publications, Talks, Teaching, Portfolio, Blog Posts, and CV.
- Content: `_publications/` (one file per paper), `_portfolio/` (projects), `_pages/` (custom pages such as Music). Collections are declared in `_config.yml`.
- Styles: Sass in `_sass/`, with themes in `_sass/theme/`. The theme files define `$border-radius`, `$box-shadow`, and `$global-transition`. Check where they are consumed before changing them.
- The repo ships sample entries (for example `_publications/2009-10-01-paper-title-number-1.md`). Delete all sample content before launch.
- The repo ships an `AGENTS.md`. Keep it or merge it with §4.
- The nav item "Portfolio" maps to the `_portfolio/` collection. Relabel it "Projects" in navigation. Ask before renaming the collection itself.

---

## 13. Delivery plan

Each phase can run in its own session. "Attach" lists the files to open at the start.

| Phase | Goal | Depends on |
|---|---|---|
| 0 | Evaluate template vs custom and decide O-01 | none |
| 1 | Foundation and shell (custom path) | 0 |
| 2 | Content pages | 1 |
| 3 | Music page | 1 |
| 4a | Visualizer spike | 1 |
| 4b | Visualizer build | 4a |
| 5 | Quality and launch | 2, 3, 4b |

### Phase 0: Evaluation spike

- **Attach:** this brief.
- **Time-box:** about half a day per path, one day at most.
- **Tasks:**
  1. Run Academic Pages locally in a throwaway folder. Add placeholder Home content, one project, and the two publications.
  2. Build the same Home page in layout A with plain HTML and CSS, in a second throwaway folder.
  3. Score both against the criteria below.
  4. Write ADR-001 in `docs/DECISIONS.md`.
- **Criteria:**

| Criterion | Question |
|---|---|
| Look | Does it match §9 and the owner's taste? |
| Control | Can shadows, radii, and transitions be removed in a few lines? |
| Understanding | How many files could the owner not explain? |
| Visualizer | How much work to add it cleanly? |
| Mobile | Does it hold up at 320 px? |
| Setup | How long to get a local preview running? |

- **Output:** ADR-001 with the decision and reasons. Spike code is thrown away.

### Phase 1: Foundation (custom path)

- **Attach:** this brief (§4, §5, §6, §7.1, §9, §10, §11).
- **Resolve first:** O-04, O-12.
- **Tasks:** repo setup files, `css/tokens.css`, `base.css`, `layout.css`, the shell (header, sidebar, footer, skip link) on five stub pages, responsive sidebar, first deploy.
- **Acceptance:**
  - All five URLs load on the live site.
  - No sideways scroll at 320 px.
  - Keyboard navigation works and the fixed header never covers the focused element.
  - Lighthouse Accessibility is 95 or higher on the stubs.
  - HTML validates.

### Phase 2: Content pages

- **Attach:** this brief (§7.2 without the visualizer, §7.3, §7.4, §7.6, §7.7, §9, §14), `css/`, `index.html`.
- **Resolve first:** O-03, O-07, O-10.
- **Acceptance:**
  - All supplied content is present and anything missing is marked.
  - Links work.
  - Images have alt text and dimensions.
  - No invented data.

### Phase 3: Music page

- **Attach:** this brief (§7.5, §9, §10), `css/`, `music/index.html`.
- **Acceptance:**
  - Embeds are lazy and videos do not preload.
  - Vertical and horizontal media both display correctly.
  - Page weight is measured and noted in the pull request.

### Phase 4a: Visualizer spike

- **Attach:** this brief (§8, §9, §10).
- **Tasks:** prototype Canvas 2D and Three.js renderers. Tune `s`, `W`, and `N` by eye. Write a one-page design note with a recommendation and screenshots or a short recording.
- **Output:** the owner approves a renderer (O-09) and the constants. Record them in `docs/DECISIONS.md`.

### Phase 4b: Visualizer build

- **Attach:** this brief (§8, §9, §10), the approved design note, `index.html`, `css/`.
- **Tasks:** implement per §8 with unit tests. Mount on Home per O-05.
- **Acceptance:**
  - All [M] requirements in §8.2 pass.
  - Stuck-note test passes: hold a key, switch tabs, return.
  - Holding four keys draws nothing.
  - Releasing all keys goes silent.
  - Reduced-motion check passes.

### Phase 5: Quality and launch

- **Attach:** this brief (§10, §14, §15).
- **Tasks:** run the release checklist, fix issues, add CI if approved, enable commented-out icons whose URLs now exist, write the README, add a LICENSE.
- **Acceptance:** every item in §15 is checked.

### Template path phases (replace 1 to 3 if the template wins)

| Phase | Work |
|---|---|
| B1 | Configure `_config.yml` and navigation. Remove Talks, Teaching, Blog Posts, and all sample content. |
| B2 | Add content: two entries in `_publications/`, three in `_portfolio/`, Home in `_pages/about.md`. |
| B3 | Restyle to §9 by editing theme variables and Sass. |
| B4 | Add the Music page. |
| B5 | Add the visualizer (Phases 4a and 4b apply unchanged, with files under `assets/js/chord-viz/`, loaded on Home only). |

### Definition of done (every phase)

- Acceptance criteria are met.
- The owner has reviewed the diff and approved it.
- No console errors.
- `npm test` passes where tests exist.
- `docs/DECISIONS.md` is updated.
- The change is merged and the live site is checked.

---

## 14. Content inventory

| Item | Value or location | Status | Owner action |
|---|---|---|---|
| Site name | Vansh Chugh | Provided | none |
| GitHub | https://github.com/ChughVansh | Provided | none |
| YouTube channel | https://www.youtube.com/@1shh855 | Provided | none |
| LinkedIn | https://www.linkedin.com/in/vansh-chugh-ds (from the CV) | Provided | Confirm it is current |
| Instagram profile | https://www.instagram.com/_.vansh_chugh._/ | Provided | none |
| Instagram highlights | URL | `TODO(content)` | Supply the URL later. The button uses the profile until then. |
| Email | Placeholder `you@example.com`, commented out | `TODO(content)` | Supply address, then uncomment |
| Google Scholar | Commented out | `TODO(content)` | Supply URL, then uncomment |
| CV | `files/cv.pdf` | `TODO(asset)` | Place the version without the phone number. Search the PDF text to confirm the number is gone. |
| Headshot | `assets/img/profile.jpg` | `TODO(asset)` | Supply photo |
| About | Up to three paragraphs | `TODO(content)` | Owner writes |
| Research-interests line | "Audio effects representation learning, automatic mixing, real-time human–AI music co-creation" | Provided | none |
| Updates | Date, sentence, link | `TODO(content)` | Supply a few |
| Oh Sheet! | Demo URL, description, and tech list in §7.3 | Provided | none. OMR means Optical Music Recognition. |
| Whatcha Lookin' For? | Demo URL, description, and tech list in §7.3 | Provided | none |
| meeting-transcriber | Source URL, description, and tech list in §7.3 | Provided | Decide media (O-07). |
| Project screenshots | `assets/img/projects/oh-sheet.png`, `whatcha-lookin-for.png` | `TODO(asset)` | Place files |
| Publications | Four entries (§7.4) | Partial | Supply PDF, arXiv, DOI, or code links where they exist |
| HARP (research experience) | Entry text in §7.7 | Partial | Supply the HARP link. |
| YouTube videos | https://www.youtube.com/watch?v=V1yAOLLeyXg | Partial | Add more videos if wanted |
| Instagram clips | `assets/video/*.mp4` and posters | `TODO(asset)` | Export and compress |
| Reference image | `docs/reference/lissajous-ratios.png` | `TODO(asset)` | Add the ratio figures image |

---

## 15. Release checklist (Phase 5 gate)

- [ ] Keyboard-only pass on every page.
- [ ] Screen reader smoke test on Home and Publications.
- [ ] Layout checked at 320, 768, and 1280 px.
- [ ] Tested on iOS Safari and Android Chrome (real devices).
- [ ] Tested on a throttled slow connection.
- [ ] No console errors and no mixed content.
- [ ] All internal and external links work.
- [ ] `grep -R "TODO(" .` returns nothing in published pages, except deliberately commented-out icons.
- [ ] Lighthouse targets in §10 met.
- [ ] HTML validates.
- [ ] Unique titles and descriptions. Open Graph tags present. `sitemap.xml` and `robots.txt` exist.
- [ ] Visualizer: stuck-note test, four-key test, silence on release, reduced motion.
- [ ] No mention of the site being a portfolio project and no link to the source repository.
- [ ] README and LICENSE present.

---

## 16. Risks

| Risk | Impact | Mitigation |
|---|---|---|
| The visualizer grows beyond scope. | Delays everything else. | Phase 4a spike first. Keep [C] items out. |
| The drift model does not look like the owner expects. | Rework. | Owner approves the prototype before Phase 4b. |
| Browser autoplay rules block audio. | Silent first key press. | Create or resume the context on the first key press (VIZ-6) and test on real devices. |
| iOS Safari may mute Web Audio when the silent switch is on. | Visitors hear nothing. | Test on a real iPhone. Look up a current workaround before adding code. |
| Template styles are hard to strip. | A generic look. | Phase 0 measures this. |
| Media makes the repo heavy. | Slow pages, size limits. | Compress video, lazy-load, and measure page weight. |
| A fixed header hides focused elements. | Accessibility failure. | `scroll-padding-top` and a keyboard test in Phase 1. |

---

## Appendix A: ADR template (`docs/DECISIONS.md`)

```markdown
# ADR-NNN: Short title

- Date: YYYY-MM-DD
- Status: proposed | accepted | superseded by ADR-MMM

## Context
What problem or question this decision answers.

## Options considered
1. Option A: pros and cons.
2. Option B: pros and cons.

## Decision
What was chosen.

## Consequences
What gets easier, what gets harder, and what to revisit later.
```

## Appendix B: Change log

| Date | Version | Change |
|---|---|---|
| 2026-10-06 | 0.1 | First draft. |
| 2026-10-08 | 0.2 | Added CV facts: publications, project text, HARP entry, research-interests line, LinkedIn, Instagram profile, first YouTube video. Added D-16 to D-20 and O-11, O-12. Revised O-07: meeting-transcriber is a backend, not a CLI. |
| 2026-10-08 | 0.2.1 | meeting-transcriber description approved. |
| 2026-10-08 | 0.2.2 | Entry ids are now project-name slugs (D-21, PUB-2, PROJ-5). |
| 2026-10-08 | 0.2.3 | Thesis removed from Publications (D-22). |
| 2026-10-08 | 0.2.4 | HARP placement decided (D-23). O-11 closed. |
