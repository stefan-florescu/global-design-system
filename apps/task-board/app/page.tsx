import { Board } from "@/components/board";

export default function TaskBoardPage() {
  return (
    <main
      id="main-content"
      className="mx-auto flex w-full max-w-screen-xl flex-col gap-8 px-4 py-12"
    >
      <Board />
    </main>
  );
}
