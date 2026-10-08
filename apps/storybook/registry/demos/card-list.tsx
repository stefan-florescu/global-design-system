import { Avatar, Card, CardTitle } from "@stefan-florescu/ui";

export default function CardList() {
  return (
    <Card className="w-full max-w-md">
      <div className="flex items-center justify-between">
        <CardTitle className="text-xl">Latest customers</CardTitle>
        <a
          href="/components/avatar"
          className="text-brand-subtle-foreground text-sm font-medium hover:underline"
        >
          View all
        </a>
      </div>
      <ul className="divide-border m-0 list-none divide-y p-0">
        <li className="flex items-center gap-4 py-3">
          <Avatar src="/avatars/1.svg" alt="" size="sm" />
          <div className="min-w-0 flex-1">
            <p className="m-0 truncate text-sm font-medium">Ana Popescu</p>
            <p className="text-muted-foreground m-0 truncate text-sm">ana@example.com</p>
          </div>
          <span className="font-semibold">$320</span>
        </li>
        <li className="flex items-center gap-4 py-3">
          <Avatar src="/avatars/2.svg" alt="" size="sm" />
          <div className="min-w-0 flex-1">
            <p className="m-0 truncate text-sm font-medium">Mihai Ionescu</p>
            <p className="text-muted-foreground m-0 truncate text-sm">mihai@example.com</p>
          </div>
          <span className="font-semibold">$3,467</span>
        </li>
        <li className="flex items-center gap-4 py-3">
          <Avatar src="/avatars/3.svg" alt="" size="sm" />
          <div className="min-w-0 flex-1">
            <p className="m-0 truncate text-sm font-medium">Elena Dumitru</p>
            <p className="text-muted-foreground m-0 truncate text-sm">elena@example.com</p>
          </div>
          <span className="font-semibold">$67</span>
        </li>
        <li className="flex items-center gap-4 py-3">
          <Avatar src="/avatars/4.svg" alt="" size="sm" />
          <div className="min-w-0 flex-1">
            <p className="m-0 truncate text-sm font-medium">Radu Marin</p>
            <p className="text-muted-foreground m-0 truncate text-sm">radu@example.com</p>
          </div>
          <span className="font-semibold">$2,367</span>
        </li>
      </ul>
    </Card>
  );
}
