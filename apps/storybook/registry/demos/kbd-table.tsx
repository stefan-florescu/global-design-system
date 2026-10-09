import { Triangle } from "@stefan-florescu/icons";
import { Kbd } from "@stefan-florescu/ui";

export default function KbdTable() {
  return (
    <div className="relative w-full overflow-x-auto">
      <table className="text-body w-full text-left text-sm rtl:text-right">
        <thead className="text-body bg-neutral-tertiary text-xs uppercase">
          <tr>
            <th scope="col" className="px-6 py-3">
              Key
            </th>
            <th scope="col" className="px-6 py-3">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-neutral-primary border-default border-b">
            <th scope="row" className="text-body px-6 py-4 font-medium whitespace-nowrap">
              <Kbd>Shift</Kbd>
              <span className="mx-2">or</span>
              <Kbd>Tab</Kbd>
            </th>
            <td className="px-6 py-4">Navigate to interactive elements</td>
          </tr>
          <tr className="bg-neutral-primary border-default border-b">
            <th scope="row" className="text-body px-6 py-4 font-medium whitespace-nowrap">
              <Kbd>Enter</Kbd>
              <span className="mx-2">or</span>
              <Kbd>Spacebar</Kbd>
            </th>
            <td className="px-6 py-4">
              Ensure elements with ARIA role=&quot;button&quot; can be activated with both key
              commands.
            </td>
          </tr>
          <tr className="bg-neutral-primary">
            <th
              scope="row"
              className="text-body inline-flex items-center px-6 py-4 font-medium whitespace-nowrap"
            >
              <Kbd className="me-1">
                <Triangle aria-hidden className="fill-current" />
                <span className="sr-only">Arrow key up</span>
              </Kbd>
              <Kbd>
                <Triangle aria-hidden className="rotate-180 fill-current" />
                <span className="sr-only">Arrow key down</span>
              </Kbd>
              <span className="mx-2">or</span>
              <Kbd className="me-1 rtl:rotate-180">
                <Triangle aria-hidden className="-rotate-90 fill-current" />
                <span className="sr-only">Arrow key left</span>
              </Kbd>
              <Kbd className="rtl:rotate-180">
                <Triangle aria-hidden className="rotate-90 fill-current" />
                <span className="sr-only">Arrow key right</span>
              </Kbd>
            </th>
            <td className="px-6 py-4">Choose and activate previous/next tab.</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
