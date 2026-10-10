import { Triangle } from "@stefan-florescu/icons";
import {
  Kbd,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "@stefan-florescu/ui";

export default function KbdTable() {
  return (
    <Table bordered={false}>
      <TableCaption visuallyHidden>Keyboard shortcuts</TableCaption>
      <TableHead className="bg-neutral-tertiary text-body text-xs uppercase">
        <TableHeadCell>Key</TableHeadCell>
        <TableHeadCell>Description</TableHeadCell>
      </TableHead>
      <TableBody>
        <TableRow className="border-b">
          <TableHeadCell scope="row" className="text-body">
            <Kbd>Shift</Kbd>
            <span className="mx-2">or</span>
            <Kbd>Tab</Kbd>
          </TableHeadCell>
          <TableCell>Navigate to interactive elements</TableCell>
        </TableRow>
        <TableRow className="border-b">
          <TableHeadCell scope="row" className="text-body">
            <Kbd>Enter</Kbd>
            <span className="mx-2">or</span>
            <Kbd>Spacebar</Kbd>
          </TableHeadCell>
          <TableCell>
            Ensure elements with ARIA role=&quot;button&quot; can be activated with both key
            commands.
          </TableCell>
        </TableRow>
        <TableRow className="border-b">
          <TableHeadCell scope="row" className="text-body">
            <span className="inline-flex items-center">
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
            </span>
          </TableHeadCell>
          <TableCell>Choose and activate previous/next tab.</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
