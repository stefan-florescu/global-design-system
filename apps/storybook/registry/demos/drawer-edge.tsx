import {
  Banknote,
  ChartPie,
  ClipboardList,
  Grid2x2Plus,
  ListOrdered,
  SlidersVertical,
  Table,
  Ticket,
  Users,
} from "@stefan-florescu/icons";
import { Drawer, DrawerContent, DrawerHandle, DrawerTrigger } from "@stefan-florescu/ui";

const widgets = [
  { label: "Chart", icon: ChartPie },
  { label: "Table", icon: Table },
  { label: "Ticket", icon: Ticket, wide: true },
  { label: "List", icon: ListOrdered },
  { label: "Price", icon: Banknote },
  { label: "Users", icon: Users },
  { label: "Task", icon: ClipboardList, wide: true },
  { label: "Custom", icon: SlidersVertical },
];

export default function DrawerEdge() {
  return (
    // `transform-gpu` keeps the closed drawer's strip inside this preview instead of the page.
    <div className="flex h-80 w-full transform-gpu items-start justify-center pt-8">
      <Drawer edge>
        <DrawerTrigger>Show swipeable drawer</DrawerTrigger>
        <DrawerContent>
          <DrawerHandle>
            <Grid2x2Plus aria-hidden />
            Add widget
          </DrawerHandle>
          <div className="grid grid-cols-3 gap-4 p-4 lg:grid-cols-4">
            {widgets.map(({ label, icon: Icon, wide }) => (
              <button
                key={label}
                type="button"
                className={`rounded-base bg-neutral-secondary-medium border-default-medium hover:bg-neutral-tertiary-medium focus-visible:outline-ring cursor-pointer border p-4 outline-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solid ${wide ? "hidden lg:block" : ""}`}
              >
                <span className="bg-neutral-primary-strong border-default-strong mx-auto mb-2 flex size-12 items-center justify-center rounded-full border p-2">
                  <Icon aria-hidden className="text-body size-7" />
                </span>
                <span className="text-body block text-center font-medium">{label}</span>
              </button>
            ))}
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
