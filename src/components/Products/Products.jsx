import { useEffect, useState } from "react";
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



const Products = () => {
  const [allProducts, setAllProducts] = useState([]);
  
  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8000/allproducts");
        setAllProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    getProducts();
  }, []);


  const removeProduct = async (id) => {
      try {
        const response = await axios.post("http://localhost:8000/removeproduct",{id});
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
          title={`Products (${allProducts.length})`}
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
        {allProducts.map((product, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>
                <img
                  src={product.image}
                  alt={product.name}
                  width={150}
                  height={150}
                />
              </TableCell>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell className="font-medium">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(product.price)}</TableCell>
              <TableCell className="font-medium">{product.category}</TableCell>
              <TableCell
              onClick={() => removeProduct(product._id)}
                className="text-right"
              >
                <MdOutlineClose />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
   






      {/* // <table className="flex flex-col gap-10 mt-10">
      //   <thead>
      //     <tr className="flex flex-row gap-40">
      //       <th>#</th>
      //       <th>Image</th>
      //       <th>Name</th>
      //       <th>Price</th>
      //       <th>Category</th>
      //     </tr>
      //   </thead>
      //   <tbody className="flex flex-col gap-10">
      //     {allProducts.map((product, index) => (
            <tr key={index} className="flex flex-row gap-28 items-center">
              <td>{index + 1}</td>
              <td><img src={product.image} alt={product.name} width={200} height={200} /></td>
              <td>{product.name}</td>
              <td>{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(product.price)}</td>
              <td>{product.category}</td>
              <td onClick={() => removeProduct(product._id)} className="cursor-pointer"><MdOutlineClose/></td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  );
};

export default Products;
