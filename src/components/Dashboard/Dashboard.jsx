import { useContext } from "react";
import Heading from "../Heading";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AppContext } from "@/src/Context/AppContext";

const Dashboard = () => {
  const { categories, products, orders, users } = useContext(AppContext);

  return (
    <div className="py-8 px-10">
      <Heading title="Dashboard" description="Manage Products" />

      <div className="grid grid-cols-4 gap-10 mt-10">
        <Card className="flex flex-col items-center hover:opacity-80 cursor-pointer">
          <CardHeader>
            <CardTitle>Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-2xl font-bold">{products? products.length : 0}</CardDescription>
          </CardContent>
        </Card>
        <Card className="flex flex-col items-center hover:opacity-80 cursor-pointer">
          <CardHeader>
            <CardTitle>Total Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-2xl font-bold">{categories?.length}</CardDescription>
          </CardContent>
        </Card>
        <Card className="flex flex-col items-center hover:opacity-80 cursor-pointer">
          <CardHeader>
            <CardTitle>Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-2xl font-bold">{orders? orders.length: 0}</CardDescription>
          </CardContent>
        </Card>
        <Card className="flex flex-col items-center hover:opacity-80 cursor-pointer">
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-2xl font-bold">{users? users.length : 0}</CardDescription>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
