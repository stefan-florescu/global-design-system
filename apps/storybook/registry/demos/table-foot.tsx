import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFoot,
  TableHead,
  TableHeadCell,
  TableRow,
} from "@stefan-florescu/ui";

const items = [
  { name: 'Apple MacBook Pro 17"', quantity: 1, price: "$2999" },
  { name: "Microsoft Surface Pro", quantity: 1, price: "$1999" },
  { name: "Magic Mouse 2", quantity: 1, price: "$99" },
];

export default function TableFootDemo() {
  return (
    <Table bordered={false} rounded>
      <TableCaption visuallyHidden>Order summary</TableCaption>
      <TableHead>
        <TableHeadCell>Product name</TableHeadCell>
        <TableHeadCell>Qty</TableHeadCell>
        <TableHeadCell>Price</TableHeadCell>
      </TableHead>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item.name}>
            <TableHeadCell scope="row">{item.name}</TableHeadCell>
            <TableCell>{item.quantity}</TableCell>
            <TableCell>{item.price}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFoot>
        <TableHeadCell scope="row">Total</TableHeadCell>
        <TableCell>3</TableCell>
        <TableCell>21,000</TableCell>
      </TableFoot>
    </Table>
  );
}
