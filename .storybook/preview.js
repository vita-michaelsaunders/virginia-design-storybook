import "@vds-css";

const STYLES_EXPORT =
  "https://www.developer.virginia.gov/media/developer/assets/css/styles_export.css";

function ensureUswdsTheme() {
  if (typeof document === "undefined") return;
  if (document.getElementById("vds-uswds-theme")) return;
  const link = document.createElement("link");
  link.id = "vds-uswds-theme";
  link.rel = "stylesheet";
  link.href = STYLES_EXPORT;
  document.head.prepend(link);
}

ensureUswdsTheme();

/** @type { import('@storybook/html').Preview } */
const preview = {
  parameters: {
    layout: "padded",
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      options: {
        runOnly: {
          type: "tag",
          values: ["wcag2a", "wcag2aa", "wcag21aa"],
        },
      },
    },
    options: {
      storySort: {
        order: [
          "Foundations",
          [
            "Introduction",
            "Using VDS",
            "Using Storybook",
            "Starter Kit",
            "Tokens",
            "*",
          ],
          "Components",
          "Page Templates",
          "Adaptations",
          "*",
        ],
      },
    },
  },
  decorators: [
    (story) => {
      const wrapper = document.createElement("div");
      wrapper.className = "vds-story";
      wrapper.lang = "en";
      const result = story();
      if (typeof result === "string") {
        wrapper.innerHTML = result;
      } else if (result instanceof Node) {
        wrapper.appendChild(result);
      }
      return wrapper;
    },
  ],
};

export default preview;
