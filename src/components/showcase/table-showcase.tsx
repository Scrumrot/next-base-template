"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const invoices = [
  { id: "INV001", status: "Paid", method: "Credit Card", amount: "$250.00" },
  { id: "INV002", status: "Pending", method: "PayPal", amount: "$150.00" },
  { id: "INV003", status: "Unpaid", method: "Bank Transfer", amount: "$350.00" },
  { id: "INV004", status: "Paid", method: "Credit Card", amount: "$450.00" },
  { id: "INV005", status: "Paid", method: "PayPal", amount: "$550.00" },
];

function getStatusBadge(status: string) {
  switch (status) {
    case "Paid":
      return (
        <Badge className="bg-green-500/10 text-green-600 border-green-500/20">
          Paid
        </Badge>
      );
    case "Pending":
      return (
        <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20">
          Pending
        </Badge>
      );
    case "Unpaid":
      return (
        <Badge className="bg-red-500/10 text-red-600 border-red-500/20">
          Unpaid
        </Badge>
      );
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
}

export function TableShowcase() {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-6">Table</h2>
      <div className="space-y-8">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-4">
            Data Table
          </h3>
          <Table>
            <TableCaption>A list of recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                  <TableCell>{invoice.method}</TableCell>
                  <TableCell className="text-right">{invoice.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total</TableCell>
                <TableCell className="text-right">$1,750.00</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </div>
    </section>
  );
}
