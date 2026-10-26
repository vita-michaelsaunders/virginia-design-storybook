# Virginia Design Storybook

A single directory you can publish as its own GitHub repo. It runs Storybook against a checkout of [virginia-design-system](https://github.com/vita-michaelsaunders/virginia-design-system). Stories and CSS come from that checkout, so later upstream work shows up after you pull. It does not vendor a second copy of the design system.

## Acquire

```bash
git clone <this-repo>
cd <this-repo>
git clone https://github.com/vita-michaelsaunders/virginia-design-system.git ../virginia-design-system
npm install
npm run storybook
```

Open http://127.0.0.1:6006.

If the design system is somewhere else:

```bash
VDS_ROOT=/path/to/virginia-design-system npm run storybook
```

`vendor/virginia-design-system` is also accepted.

## Live site

Pushes to `main` publish the built catalog to GitHub Pages. The generated files stay out of git. Setup and the update flow are in [docs/PUBLISHING.md](docs/PUBLISHING.md).

A local static folder, when you need one, is still:

```bash
npm run build
```

Output: `storybook-static/` (gitignored).

## Working with upstream

| Change | Where |
|--------|--------|
| Component story, token, or `vds-*` CSS | Virginia Design System repo, then pull |
| Story you are still testing | `stories/` in this directory |
| Agency look-and-feel in local Storybook | `styles/agency-overrides.css` (see example next to it) |

When a local story is ready, move it into the design-system repo’s `stories/` folder. The next checkout loads it from upstream, and you can delete the copy here.

## Customizing CSS

**Agency sites (preferred):** one Commonwealth file, then optional overrides:

```html
<link rel="stylesheet" href="https://www.developer.virginia.gov/media/developer/virginia-design/assets/css/virginia.min.css">
<link rel="stylesheet" href="agency.css">
```

`virginia.min.css` is theme + Virginia surfaces. Foundations docs in this catalog describe that path.

**Local Storybook:** edit [`styles/agency-overrides.css`](styles/agency-overrides.css) (ideas in [`styles/agency-overrides.example.css`](styles/agency-overrides.example.css)), then refresh `npm run storybook`. Full notes: **Adaptations → Customizing appearance**, or [`stories/Customizing.mdx`](stories/Customizing.mdx).
