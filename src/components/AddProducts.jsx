import { useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AppContext } from "@/Context/AppContext";
import Heading from "./Heading";

const AddProducts = () => {
  const { categories } = useContext(AppContext);

  const [product, setProduct] = useState({
    name: "",
    slug: "",
    description: "",
    price: "",
    image: null,
    category: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
  };

  const changeHandler = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setProduct({ ...product, [name]: files[0] });
    } else if (name === "name") {
      const newSlug = generateSlug(value);
      setProduct({ ...product, name: value, slug: newSlug });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const validateForm = () => {
    if (!product.name.trim()) {
      toast.error("Product name is required");
      return false;
    }
    if (!product.slug.trim()) {
      toast.error("Product slug is required");
      return false;
    }
    if (!product.price || isNaN(product.price)) {
      toast.error("Valid price is required");
      return false;
    }
    if (!product.category) {
      toast.error("Category is required");
      return false;
    }
    if (!product.image) {
      toast.error("Product image is required");
      return false;
    }
    return true;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      let formData = new FormData();
      formData.append("product", product.image);
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/upload/product`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.success) {
        const productData = {
          ...product,
          image: response.data.image_URL,
        };
        try {
          const addProductResponse = await axios.post(
            `${import.meta.env.VITE_SERVER_URL}/api/product`,
            productData
          );
          if (addProductResponse.data.success) {
            toast.success("Product added successfully");
            setProduct({
              name: "",
              description: "",
              price: "",
              image: null,
              category: "",
            });
          } else {
            toast.error(addProductResponse.data.message || "Failed to add product");
          }
        } catch (error) {
          toast.error("Something went wrong");
        }
      } else {
        toast.error(response.data.message || "Failed to upload image");
      }
    } catch (error) {
      toast.error("Error uploading image");
    } finally {
      setIsLoading(false);
    }
  };

  return (
  <div className="h-full flex flex-col overflow-y-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      <div className="mb-6">
        <h2 className="text-lg font-semibold">Add Product</h2>
      </div>
      <div className="flex-1">
        <div className="space-y-6">
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                type="text"
                name="name"
                value={product.name}
                onChange={changeHandler}
                className="w-full"
                disabled={isLoading}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug" className="text-sm font-medium">
                Slug <span className="text-red-500">*</span>
              </Label>
              <Input
                id="slug"
                type="text"
                name="slug"
                value={product.slug}
                onChange={changeHandler}
                className="w-full"
                disabled={isLoading}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium">
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                value={product.description}
                onChange={changeHandler}
                className="w-full"
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price" className="text-sm font-medium">
                Price <span className="text-red-500">*</span>
              </Label>
              <Input
                id="price"
                type="number"
                name="price"
                value={product.price}
                onChange={changeHandler}
                className="w-full"
                disabled={isLoading}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="image" className="text-sm font-medium">
                Image <span className="text-red-500">*</span>
              </Label>
              <Input
                id="image"
                type="file"
                name="image"
                onChange={changeHandler}
                accept="image/*"
                className="w-full"
                disabled={isLoading}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category" className="text-sm font-medium">
                Category <span className="text-red-500">*</span>
              </Label>
              <select
                id="category"
                name="category"
                className="w-full border rounded-md p-2"
                value={product.category}
                onChange={changeHandler}
                disabled={isLoading}
                required
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="pt-4">
              <Button
                type="submit"
                variant="default"
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? "Adding Product..." : "Add Product"}
              </Button>
            </div>
          </form>
        </div>
      </div>
      <style>{`
        .flex.flex-col::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default AddProducts;
