import { Skeleton, SkeletonLine } from "@stefan-florescu/ui";

// Each row is a line of text: word widths, and the row's maximum width.
const rows = [
  { max: "", words: ["w-32", "ms-2 w-24", "ms-2 w-full"] },
  { max: "max-w-[480px]", words: ["w-full", "ms-2 w-full", "ms-2 w-24"] },
  { max: "max-w-[400px]", words: ["w-full", "ms-2 w-80", "ms-2 w-full"] },
  { max: "max-w-[480px]", words: ["ms-2 w-full", "ms-2 w-full", "ms-2 w-24"] },
  { max: "max-w-[440px]", words: ["ms-2 w-32", "ms-2 w-24", "ms-2 w-full"] },
  { max: "max-w-[360px]", words: ["ms-2 w-full", "ms-2 w-80", "ms-2 w-full"] },
];

export default function SkeletonText() {
  return (
    <Skeleton className="w-full max-w-lg space-y-2.5">
      {rows.map((row, i) => (
        <div key={i} className={`flex w-full items-center ${row.max}`}>
          {row.words.map((word, j) => (
            <SkeletonLine key={j} className={word} />
          ))}
        </div>
      ))}
    </Skeleton>
  );
}
