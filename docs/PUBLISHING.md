# Publishing Storybook

This repository holds the source used to build Storybook. The live site is a published copy of that source. The generated files are not stored in git.

## What stays in git

People clone this repository and get:

- Storybook configuration (`.storybook/`)
- Scripts that find the Virginia Design System checkout
- Trial stories in `stories/`
- `package.json` and `package-lock.json`

`storybook-static/` is listed in `.gitignore`. A local `npm run build` writes that folder on your machine only.

## What the live site is

A push to `main` starts the **Publish Storybook** workflow:

1. GitHub checks out this repository.
2. It checks out `virginia-design-system` at `main` into `vendor/virginia-design-system`. That checkout is not committed.
3. It installs dependencies and runs `npm run build`.
4. It publishes the `storybook-static/` folder that the build just produced.
5. GitHub Pages serves that folder. The folder is discarded after publishing. It is not added to the repository.

The live address for this project site is:

`https://vita-michaelsaunders.github.io/virginia-design-storybook/`

In Terminalfour, add a link to that address. The media library does not need the Storybook scripts or images.

## How the two stay in sync

| You change | What you do | What updates the live site |
|------------|-------------|----------------------------|
| Storybook config or a trial story in this repo | Commit and push to `main` | The workflow builds that commit and publishes it |
| A pattern in the Virginia Design System | Merge it to `main` on `virginia-design-system`, then push any commit to this repo’s `main` (or re-run the workflow) | The workflow checks out the design system’s current `main` and builds again |

The design system is read at build time. This repository does not keep a copy of its stories or CSS.

## One-time setup

1. Make **this** repository public. GitHub Pages on the free plan requires a public repository. The site is public on the internet either way.
2. In this repository, open **Settings → Pages → Build and deployment**, and set **Source** to **GitHub Actions**.
3. Create a GitHub personal access token that can read `vita-michaelsaunders/virginia-design-system` (Contents: Read). That repository is private, so the workflow cannot see it with the default token.
4. In this repository, open **Settings → Secrets and variables → Actions**, and add a repository secret named `VDS_READ_TOKEN` with that token.
5. Push to `main`, or open **Actions → Publish Storybook → Run workflow**.

When the workflow succeeds, the Pages URL above serves the catalog.

## Run it locally

```bash
git clone https://github.com/vita-michaelsaunders/virginia-design-storybook.git
cd virginia-design-storybook
git clone https://github.com/vita-michaelsaunders/virginia-design-system.git ../virginia-design-system
npm install
npm run storybook
```

Open http://127.0.0.1:6006. That local server is separate from the Pages site.
