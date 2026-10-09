import Link from "next/link";

export default function NotFound() {
  return (
    <main
      id="main-content"
      className="mx-auto flex max-w-md flex-1 flex-col items-center justify-center gap-3 px-4 py-24 text-center"
    >
      <h1 className="text-2xl font-semibold tracking-tight">Page not found</h1>
      <p className="text-body">This page doesn’t exist yet.</p>
      <Link href="/components" className="font-medium underline underline-offset-4">
        Back to Components
      </Link>
    </main>
  );
}
