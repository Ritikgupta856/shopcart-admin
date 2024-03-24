import { useContext } from "react";
import Heading from "../Heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppContext } from "@/src/Context/AppContext";
import {
  FaRupeeSign,
  FaShoppingCart,
  FaFolderOpen,
  FaClipboardList,
  FaUserFriends,
} from "react-icons/fa";

const Dashboard = () => {
  const { categories, products, orders, users, totalRevenue } =
    useContext(AppContext);

  return (
    <div className="py-8 px-10">
      <Heading title="Dashboard" description="Overview of your store" />

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-5 mt-10">
        <Card className="flex flex-col items-center w-48 hover:opacity-80 cursor-pointer">
          <CardHeader>
            <CardTitle className="text-lg">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center">
              <div>
                <FaRupeeSign size={30} />
              </div>
              <div>{totalRevenue}</div>
            </div>
          </CardContent>
        </Card>
        <Card className="flex flex-col items-center w-48 hover:opacity-80 cursor-pointer">
          <CardHeader>
            <CardTitle className="text-lg">Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex gap-2 items-center">
              <div>
                <FaShoppingCart size={30} />
              </div>
              <div>{products ? products.length : 0}</div>
            </div>
          </CardContent>
        </Card>
        <Card className="flex flex-col items-center w-48 hover:opacity-80 cursor-pointer">
          <CardHeader>
            <CardTitle className="text-lg">Total Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex gap-2 items-center">
              <div>
                <FaFolderOpen size={30} />
              </div>
              <div className="text-2xl font-bold">{categories?.length}</div>
            </div>
          </CardContent>
        </Card>
        <Card className="flex flex-col items-center w-48 hover:opacity-80 cursor-pointer">
          <CardHeader>
            <CardTitle className="text-lg">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex gap-2 items-center">
              <div>
                 <FaClipboardList size={30}/>
              </div>

              <div className="text-2xl font-bold">
                {orders ? orders.length : 0}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="flex flex-col items-center w-48 hover:opacity-80 cursor-pointer">
          <CardHeader>
            <CardTitle className="text-lg">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex gap-2 items-center">
              <div>
                <FaUserFriends size={30} />
              </div>

              <div className="text-2xl font-bold">
                {users ? users.length : 0}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
