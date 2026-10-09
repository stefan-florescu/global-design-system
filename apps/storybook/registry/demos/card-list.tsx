import { Avatar, Card, CardTitle } from "@stefan-florescu/ui";

const customers = [
  { name: "Neil Sims", avatar: "/avatars/1.svg", amount: "$320" },
  { name: "Bonnie Green", avatar: "/avatars/3.svg", amount: "$3467" },
  { name: "Michael Gough", avatar: "/avatars/2.svg", amount: "$67" },
  { name: "Lana Byrd", avatar: "/avatars/4.svg", amount: "$367" },
  { name: "Thomas Lean", avatar: "/avatars/5.svg", amount: "$2367" },
];

export default function CardList() {
  return (
    <Card className="w-full max-w-sm">
      <div className="mb-4 flex items-center justify-between">
        <CardTitle className="mb-0 text-xl leading-none">Latest Customers</CardTitle>
        <a href="/components/avatar" className="text-fg-brand font-medium hover:underline">
          View all
        </a>
      </div>
      <ul className="divide-default divide-y">
        {customers.map(({ name, avatar, amount }, index) => (
          <li key={name} className={index === customers.length - 1 ? "pt-4 pb-0" : "py-4"}>
            <div className="flex items-center gap-2">
              <Avatar src={avatar} alt="" size="sm" />
              <div className="ms-2 min-w-0 flex-1">
                <p className="text-heading truncate font-medium">{name}</p>
                <p className="text-body truncate text-sm">email@windster.com</p>
              </div>
              <div className="text-heading inline-flex items-center font-medium">{amount}</div>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}
