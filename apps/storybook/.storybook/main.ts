import tailwindcss from "@tailwindcss/vite";
import type { StorybookConfig } from "@storybook/react-vite";

/**
 * Stories are colocated with their components in packages/ui and rendered here.
 * Storybook-only docs (introduction, foundations playgrounds) live in apps/storybook/src.
 */
const config: StorybookConfig = {
  framework: { name: "@storybook/react-vite", options: {} },
  stories: [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(ts|tsx)",
    "../../../packages/ui/src/**/*.mdx",
    "../../../packages/ui/src/**/*.stories.@(ts|tsx)",
  ],
  addons: ["@storybook/addon-docs", "@storybook/addon-a11y", "@storybook/addon-themes"],
  typescript: { reactDocgen: "react-docgen-typescript" },
  core: { disableTelemetry: true },
  async viteFinal(viteConfig) {
    const { mergeConfig } = await import("vite");
    return mergeConfig(viteConfig, { plugins: [tailwindcss()] });
  },
};

export default config;
