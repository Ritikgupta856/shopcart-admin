import { useContext, useEffect, useState} from "react";
import Heading from "../heading";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MdOutlineClose } from "react-icons/md";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AppContext from "@/src/Context/AppContext";


const Products = () => {

  const { products } = useContext(AppContext);


  const removeProduct = async (id) => {
      try {
        const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/removeproduct`,{id});
        console.log("Product removed successfully:", response.data);
      } catch (error) {
        console.error("Error removing Products:", error);
      }
    };
  
  const navigate = useNavigate();
  
  return (
    <div className="py-8 px-10">
      <div className="flex justify-between">
        <Heading
          title={`Products (${products? products.length : 0})`}
          description="Manage Products"
        />

        <Button variant="destructive" onClick={() => navigate("/add-products")}> + Add New</Button>
      </div>


      <Table className="mt-10">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">#</TableHead>
            <TableHead>Thumbnail</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Category</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
        {products?.map((product, index) => (
            <TableRow key={index} className="cursor-pointer">
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>
                <img
                  src={product?.image}
                  alt={product?.name}
                  width={150}
                  height={150}
                />
              </TableCell>
              <TableCell className="font-medium">{product?.name}</TableCell>
              <TableCell className="font-medium">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(product?.price)}</TableCell>
              <TableCell className="font-medium">{product?.category}</TableCell>
              <TableCell
              onClick={() => removeProduct(product?._id)}
                className="text-right"
              >
                <MdOutlineClose />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
   
    </div>
  );
};

export default Products;
