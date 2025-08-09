import { useContext } from "react";
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
import { AppContext } from "@/Context/AppContext";
import Heading from "../Heading";

const Category = () => {
  const navigate = useNavigate();
  
  const {categories} = useContext(AppContext);

  const removeCategory = async (id) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/removecategory`,
        { id }
      );
      console.log("Category removed successfully:", response.data);
    } catch (error) {
      console.error("Error removing Category:", error);
    }
  };

  return (
    <div className="py-8 px-10">
      <div className="flex justify-between">
        <Heading
          title={`Category (${categories.length})`}
          description="Manage Category"
        />
        <Button variant="destructive" onClick={() => navigate("/add-category")}>
          + Add New
        </Button>
      </div>

      <Table className="mt-10">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">#</TableHead>
            <TableHead>Thumbnail</TableHead>
            <TableHead>Category</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>
                <img
                  src={category.image}
                  alt={category.name}
                  width={200}
                  height={200}
                />
              </TableCell>
              <TableCell className="font-medium">{category.name}</TableCell>
              <TableCell
                onClick={() => removeCategory(category._id)}
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

export default Category;
