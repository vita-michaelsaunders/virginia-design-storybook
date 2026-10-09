import { resolve } from "node:path";
import { resolveVdsRoot } from "../scripts/resolve-vds.js";

const base = process.env.STORYBOOK_BASE_PATH || "/";
const vdsRoot = resolveVdsRoot();

/** @type { import('@storybook/html-vite').StorybookConfig } */
const config = {
  stories: [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    `${vdsRoot}/stories/**/*.mdx`,
    `${vdsRoot}/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)`,
  ],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-a11y",
    "@storybook/addon-links",
  ],
  framework: {
    name: "@storybook/html-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  core: {
    disableTelemetry: true,
  },
  staticDirs: [{ from: resolve(vdsRoot, "docs/assets/img"), to: "/assets/img" }],
  async viteFinal(viteConfig) {
    viteConfig.base = base.endsWith("/") ? base : `${base}/`;
    viteConfig.server = viteConfig.server || {};
    viteConfig.server.fs = {
      allow: [vdsRoot, resolve(vdsRoot, "..")],
    };
    viteConfig.resolve = viteConfig.resolve || {};
    viteConfig.resolve.alias = {
      ...(viteConfig.resolve.alias || {}),
      "@vds-css": resolve(vdsRoot, "packages/css/index.css"),
    };
    return viteConfig;
  },
};

export default config;
