import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const AddCategory = () => {
  const [category, setCategory] = useState({
    name: "",
    slug: "",
    image: null,
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
      setCategory({ ...category, [name]: files[0] });
    } else if (name === "name") {
      const newSlug = generateSlug(value);
      setCategory({
        ...category,
        [name]: value,
        slug: newSlug,
      });
    } else {
      setCategory({ ...category, [name]: value });
    }
  };

  const validateForm = () => {
    if (!category.name.trim()) {
      toast.error("Category name is required");
      return false;
    }
    if (!category.slug.trim()) {
      toast.error("Category slug is required");
      return false;
    }
    if (!category.image) {
      toast.error("Category image is required");
      return false;
    }
    return true;
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      
      const formData = new FormData();
      formData.append("category", category.image);

      const uploadResponse = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/upload/category`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (uploadResponse.data.success) {
        
        const categoryData = {
          name: category.name.trim(),
          slug: category.slug.trim(),
          image: uploadResponse.data.image_URL,
        };

        
        const addCategoryResponse = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/api/categories`,
          categoryData
        );

        if (addCategoryResponse.data.success) {
          toast.success("Category added successfully");
          console.log("Category added successfully:", addCategoryResponse.data);

          
          setCategory({
            name: "",
            slug: "",
            image: null
          });
        } else {
          toast.error(
            addCategoryResponse.data.message || "Failed to add category"
          );
        }
      } else {
        toast.error(uploadResponse.data.message || "Failed to upload image");
      }
    } catch (error) {
      console.error("Error adding category:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="mb-6">
        <h2 className="text-lg font-semibold">Add Category</h2>
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
                value={category.name}
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
                value={category.slug}
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

            <div className="pt-4">
              <Button
                type="submit"
                variant="default"
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? "Adding Category..." : "Add Category"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
