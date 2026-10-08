import { CodeBlock } from "./code-block";
import { Tabs } from "./tabs";

const managers = [
  { value: "pnpm", command: (pkgs: string) => `pnpm add ${pkgs}` },
  { value: "npm", command: (pkgs: string) => `npm install ${pkgs}` },
  { value: "yarn", command: (pkgs: string) => `yarn add ${pkgs}` },
  { value: "bun", command: (pkgs: string) => `bun add ${pkgs}` },
];

export function InstallCommand({ packages }: { packages: string }) {
  return (
    <Tabs
      label="Package manager"
      variant="pill"
      className="bg-surface my-6 rounded-lg border p-2"
      items={managers.map((manager) => ({
        value: manager.value,
        label: manager.value,
        content: (
          <CodeBlock
            code={manager.command(packages)}
            lang="bash"
            className="mt-2 border-0 bg-transparent"
          />
        ),
      }))}
    />
  );
}
