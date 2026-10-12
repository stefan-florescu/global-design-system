import { Card, CardDescription, CardTitle } from "@stefan-florescu/ui";

import { AppCard } from "@/components/app-card";
import { apps } from "@/lib/apps";

export default function LauncherPage() {
  return (
    <main
      id="main-content"
      className="mx-auto flex w-full max-w-screen-xl flex-col gap-8 px-4 py-12"
    >
      <header className="flex flex-col gap-2">
        <h1 className="text-heading text-3xl font-bold">Apps</h1>
        <p className="text-body">Pick an app to open it.</p>
      </header>

      {apps.length > 0 ? (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {apps.map((app) => (
            <li key={app.id}>
              <AppCard app={app} />
            </li>
          ))}
        </ul>
      ) : (
        <Card>
          <CardTitle headingLevel={2}>No apps yet</CardTitle>
          <CardDescription>Apps added to this repository will appear here.</CardDescription>
        </Card>
      )}
    </main>
  );
}
