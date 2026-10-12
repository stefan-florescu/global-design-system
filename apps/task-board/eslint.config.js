import { nextConfig } from "@stefan-florescu/eslint-config/next";

export default [...nextConfig, { ignores: [".next/**", "out/**", "next-env.d.ts"] }];
