const sections = [
  {
    title: "Foundations",
    description: "Color, typography, spacing, radius, elevation, grid, motion.",
  },
  { title: "Components", description: "Accessible React primitives built on tokens." },
  { title: "Patterns", description: "Proven compositions for recurring UX problems." },
  { title: "Templates", description: "Page-level layouts assembled from patterns." },
  { title: "Accessibility", description: "WCAG 2.2 AA standards and testing guidance." },
  { title: "Content", description: "Voice, tone, and microcopy guidelines." },
  { title: "Decisions", description: "Architecture Decision Records (ADRs)." },
  { title: "Releases", description: "Changelogs and migration guides." },
];

export default function HomePage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <p className="text-sm font-medium tracking-wide uppercase opacity-60">v0 · foundation</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight">Stefan Design System</h1>
      <p className="mt-4 max-w-2xl text-lg opacity-80">
        Token-driven, accessible by default, multi-theme ready. Documentation is being built
        alongside the system.
      </p>
      <ul className="mt-12 grid gap-4 sm:grid-cols-2">
        {sections.map((s) => (
          <li key={s.title} className="rounded-lg border border-current/10 p-5">
            <h2 className="font-semibold">{s.title}</h2>
            <p className="mt-1 text-sm opacity-70">{s.description}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
