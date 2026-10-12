# chughvansh.github.io

Personal site for Vansh Chugh. Built with Jekyll and served by GitHub Pages.

## Preview locally

You need Ruby 3.3 and Bundler.

```
bundle config set --local path vendor/bundle
bundle install
bundle exec jekyll serve
```

Open http://localhost:4000/ (use `localhost`, not `127.0.0.1`). Restart the server after editing `_config.yml`.

## Tests

The chord visualizer's pure functions have unit tests. They use Node's built-in runner and need no packages.

```
npm test
```

## Update the content

| To change | Edit |
|---|---|
| About text | `_pages/about.md` |
| Updates on Home | `_data/updates.yml` |
| A publication | a file in `_publications/` (the filename is its link id) |
| A project | a file in `_portfolio/` |
| Industry experience | `_data/industry.yml` |
| Research experience | `_data/research.yml` |
| Colors, fonts, spacing | `_sass/_tokens.scss` |
| Sidebar links, site name | `_config.yml` |
| Top bar links | `_data/navigation.yml` |

Anything still missing is marked `TODO(content)`, `TODO(asset)` or `TODO(decision)`. Find them with `grep -R "TODO(" .` (skip `vendor/`).

## Layout

- `_layouts/`, `_includes/`: page shell, sidebar, top bar.
- `_sass/`: styles, compiled to `assets/css/main.css`.
- `assets/js/chord-viz/`: the chord visualizer.
- `docs/`: project brief and decisions.

## License

Code is MIT (see `LICENSE`, which keeps the original template notices). Text, images, and video are all rights reserved.
