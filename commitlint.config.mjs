/** Conventional Commits — scopes map to workspace packages and areas. */
export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "scope-enum": [
      2,
      "always",
      [
        "ui",
        "tokens",
        "themes",
        "icons",
        "config",
        "docs",
        "storybook",
        "ci",
        "repo",
        "deps",
        "ai",
      ],
    ],
  },
};
