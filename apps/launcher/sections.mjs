/**
 * Apps served as sections of the launcher's site, e.g. /design-system. Each is a static Next.js
 * export with a matching `basePath`; the launcher's build copies its output into public/<path>,
 * and in development the launcher forwards <path> to the app's dev server.
 *
 * @type {{ path: string; outDir: string; devOrigin: string }[]}
 */
export const sections = [
  {
    path: "design-system",
    outDir: "../storybook/out",
    devOrigin: "http://localhost:3000",
  },
  {
    path: "task-board",
    outDir: "../task-board/out",
    devOrigin: "http://localhost:3002",
  },
];
