import { useContext } from "react";
import Heading from "../Heading";
import { AppContext } from "@/Context/AppContext";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const Orders = () => {

  const { orders } = useContext(AppContext);

  return (
    <div className="py-8 px-10">
      <Heading
        title={`Orders (${orders ? orders.length : 0})`}
        description="Manage Orders"
      />

      <Table className="mt-10">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">#</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Products</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Total Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="cursor-pointer">
          {orders.map((order, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{index + 1}</TableCell>

              <TableCell className="font-medium">{order.user}</TableCell>
              <TableCell className="font-medium ">
                {order.products.map((p, index) => {
                  return (
                    <div key={index}>
                    {p.name} ({p.quantity}){index !== order.products.length - 1 ? <br /> : null}
                  </div>
                  );
                })}
              </TableCell>
              <TableCell className="font-medium">
                {order.paid ? (
                  <Button size="xs" className="bg-green-500">
                    Paid
                  </Button>
                ) : (
                  <Button size="xs" className="bg-red-500">
                    Unpaid
                  </Button>
                )}
              </TableCell>
              <TableCell className="font-medium">
                {new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR",
                }).format(order?.totalAmount)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Orders;
