
import { useState } from "react";
import Heading from "../heading";
import axios from "axios";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";

const AddCategory = () => {
  const [category,setCategory] = useState({
    name:"",
    image:"",

  })


  const changeHandler = (e) =>{

    if (e.target.name === "image") {
      setCategory({ ...category, [e.target.name]: e.target.files[0] });
    } else {
      setCategory({ ...category, [e.target.name]: e.target.value });
    }
  }


  const onSubmit = async(e) =>{

    e.preventDefault();

    try {
      let formData = new FormData();
      formData.append('category',category.image)
      const response = await axios.post( `${import.meta.env.VITE_SERVER_URL}/upload/category`,formData)
      
      console.log(response);
  
      if (response.data.success) {
        category.image = response.data.image_URL;
        console.log(category)

        try {
          const addcategoryResponse = await axios.post( `${import.meta.env.VITE_SERVER_URL}/addcategory`,category)

          if (addcategoryResponse.data.success) {
            toast.success('Category added successfully')
            console.log('Category added successfully:', addcategoryResponse.data);
          } 
          
        } catch (error) {
          console.log('Error adding category',error)
        }
     
      }
    
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally{
      setCategory({
        name:"",
        image:""
      })
    }
     

}


  return (
    <div className="py-4 pl-20 mb-10 mt-8">
      <Heading title="Add Category" description="Introduce New Category to Your Collection" />
      <form className="flex flex-col w-200 mt-10 gap-5">
        <div className="flex gap-4 items-center">
          <label className="font-medium">Category Title :</label>
          <input type="text" value={category.name} name="name" onChange={changeHandler} className="w-100 py-2 px-2 outline-none border w-[40vw]" />
        </div>

        <div className="flex gap-4 items-center">
          <label className="font-medium">Category Image :</label>
          <input type="file" name="image" onChange={changeHandler}  />
        </div>

        <div></div>

        <div className="flex gap-4 items-center">

        <Button variant="destructive"  onClick={onSubmit}>Add Category</Button>
        
        </div>
      </form>
    </div>
  );
};

export default AddCategory;
