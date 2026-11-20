# Engineer portfolio template

A one-page portfolio for embedded / hardware-adjacent engineers: a career told as a `git log --graph`,
animated line-drawing figures for projects, light and dark themes. Plain HTML, CSS and JS in `site/`,
with no build step and no dependencies.

**Live demo:** https://embd-io.github.io/

## Use it

1. Click **Use this template** (or fork), then in your copy go to **Settings → Pages → Source: GitHub Actions**.
   Every push to `main` publishes `site/` (see `.github/workflows/pages.yml`).
2. Run it locally: `cd site && python3 -m http.server 8000`, then open http://localhost:8000.

## Make it yours

| What | Where |
| --- | --- |
| Name, summary, expertise, projects, publications, contact | `site/index.html` (search for "Your Name", "you@example.com", "Replace") |
| Career timeline commits | `GRAPH` in `site/js/main.js` |
| Timeline lines and dots | the `<svg>` inside `#gl` in `site/index.html`: rows are 48 px, so row *n* sits at `y = 24 + 48n` |
| Branch names in the legend | `.legend` in `site/index.html` |
| Colours (light and dark) | CSS variables at the top of `site/css/styles.css` |
| Portraits | replace `site/assets/portrait-light.svg` / `portrait-dark.svg` (4:5, e.g. 920×1150 WebP) and update the `<img>` tags |
| Project figures | the inline `<svg class="art">` in each `.work-card`; animation classes are `wa-flow`, `wa-dots`, `wa-trace`, `wa-blink`, `wa-spin`, `wa-scan`, `wa-step` |

All animations stop for visitors who ask their system for reduced motion.

## Custom domain

Settings → Pages → Custom domain, then add the DNS record GitHub shows at your DNS provider.

## Licence

MIT. See `LICENSE`.
