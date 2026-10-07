import { reactConfig } from "@stefan-florescu/eslint-config/react";

export default [...reactConfig, { ignores: ["storybook-static/**"] }];
