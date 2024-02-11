import { useEffect, useState } from "react";
import Heading from "../heading";
import axios from "axios";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";

const AddProducts = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const categoryResponse = await axios.get(
          "http://localhost:8000/allcategories"
        );
        setCategories(categoryResponse.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategory();
  }, []);

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "",
  });

  const changeHandler = (e) => {
    if (e.target.name === "image") {
      setProduct({ ...product, [e.target.name]: e.target.files[0] });
    } else {
      setProduct({ ...product, [e.target.name]: e.target.value });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let formData = new FormData();
      formData.append("product", product.image);
      const response = await axios.post(
        "http://localhost:8000/upload/product",
        formData
      );

      console.log(response);

      if (response.data.success) {
        product.image = response.data.image_URL;
        console.log(product);

        try {
          const addProductResponse = await axios.post(
            "http://localhost:8000/addproduct",
            product
          );

          if (addProductResponse.data.success) {
            toast.success("Product added successfully");
            console.log("Product added successfully:", addProductResponse.data);
          }
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setProduct({
        name: "",
        description: "",
        price: "",
        image: "",
        category: "",
      });
    }
  };

  return (
    <div className="py-4 pl-20 mb-10 mt-8">
      <Heading title="Add Products" description="Introduce New Items to Your Collection" />

      <div className="flex flex-col w-200 mt-8 gap-8 ">
        <div className="flex gap-4 items-center">
          <label className="font-medium">Product Title :</label>
          <input
            type="text"
            value={product.name}
            name="name"
            onChange={changeHandler}
            className="w-[50vw] py-2 px-2 outline-none border"
          />
        </div>

        <div className="flex gap-4 items-center">
          <label className="font-medium">Product Description :</label>
          <input
            type="text"
            name="description"
            value={product.description}
            onChange={changeHandler}
            className=" w-[50vw] h-[200px] py-2 px-2 outline-none border"
          />
        </div>

        <div className="flex gap-4 items-center">
          <label className="font-medium">Price :</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={changeHandler}
            className="w-100 py-2 px-2 outline-none border"
          />
        </div>

        <div className="flex gap-4 items-center">
          <label className="font-medium">Product Image :</label>
          <input type="file" onChange={changeHandler} name="image" />
        </div>

        <div className="flex gap-4 items-center">
          <label className="font-medium">Category:</label>
          <select
            name="category"
            className="border"
            value={product.category}
            onChange={changeHandler}
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category._id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-4 items-center">

        <Button variant="destructive" onClick={onSubmit}>Add Product</Button>
         
        </div>
      </div>
    </div>
  );
};

export default AddProducts;
