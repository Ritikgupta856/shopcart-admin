import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

const AppProvider = ({ children }) => {

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);


  useEffect(() => {
    const getCategories  = async () => {
      try {
        const categoryResponse = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/allcategories`
        );
        setCategories(categoryResponse.data);
      } catch (error) {
        console.log(error);
      }
    };

    getCategories();
  }, []);

  
  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/allproducts`);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    getProducts();
  }, []);



  return (
    <AppContext.Provider
      value={{
        categories,
        products,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
