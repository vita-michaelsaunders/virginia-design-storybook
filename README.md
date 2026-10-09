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

When a local story is ready, move it into the design-system repo’s `stories/` folder. The next checkout loads it from upstream, and you can delete the copy here.
