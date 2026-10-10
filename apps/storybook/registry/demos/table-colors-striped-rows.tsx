import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "@stefan-florescu/ui";

const products = [
  { name: 'Apple MacBook Pro 17"', color: "Silver", category: "Laptop", price: "$2999" },
  { name: "Microsoft Surface Pro", color: "White", category: "Laptop PC", price: "$1999" },
  { name: "Magic Mouse 2", color: "Black", category: "Accessories", price: "$99" },
  { name: "Google Pixel Phone", color: "Gray", category: "Phone", price: "$799" },
  { name: "Apple Watch 5", color: "Red", category: "Wearables", price: "$999" },
];

export default function TableColorsStripedRows() {
  return (
    <Table variant="brand" striped>
      <TableCaption visuallyHidden>Products</TableCaption>
      <TableHead>
        <TableHeadCell>Product name</TableHeadCell>
        <TableHeadCell>Color</TableHeadCell>
        <TableHeadCell>Category</TableHeadCell>
        <TableHeadCell>Price</TableHeadCell>
        <TableHeadCell>Action</TableHeadCell>
      </TableHead>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.name}>
            <TableHeadCell scope="row">{product.name}</TableHeadCell>
            <TableCell>{product.color}</TableCell>
            <TableCell>{product.category}</TableCell>
            <TableCell>{product.price}</TableCell>
            <TableCell>
              <a href="#edit" className="text-brand-foreground font-medium hover:underline">
                Edit<span className="sr-only"> {product.name}</span>
              </a>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
