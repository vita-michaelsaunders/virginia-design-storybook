import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");

/**
 * Locate a Virginia Design System checkout.
 * Stories and CSS are read from that tree, so a later pull upstream
 * shows up in this Storybook without copying files.
 */
export function resolveVdsRoot() {
  const fromEnv = process.env.VDS_ROOT;
  const candidates = [
    fromEnv && resolve(fromEnv),
    resolve(packageRoot, "vendor/virginia-design-system"),
    resolve(packageRoot, "../virginia-design-system"),
  ].filter(Boolean);

  for (const candidate of candidates) {
    const css = resolve(candidate, "packages/css/index.css");
    const stories = resolve(candidate, "stories");
    if (existsSync(css) && existsSync(stories)) return candidate;
  }

  throw new Error(
    "Virginia Design System checkout not found. Clone https://github.com/vita-michaelsaunders/virginia-design-system beside this folder (../virginia-design-system) or into vendor/virginia-design-system, or set VDS_ROOT to that checkout."
  );
}
