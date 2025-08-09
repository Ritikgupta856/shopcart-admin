import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

const AppProvider = ({ children }) => {

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState('0');



  useEffect(() => {
    const getCategories  = async () => {
      try {
        const categoryResponse = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/allcategories`
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
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/allproducts`);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    getProducts();
  }, []);

  useEffect(() => {
    const getOrdersDetails = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/orders`);
        setOrders(response.data.orders);
        setTotalRevenue(response.data.totalRevenue)
      } catch (error) {
        console.error("Error fetching Orders details:", error);
      }
    };

    getOrdersDetails();
  }, []);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/users`);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    getUsers();
  }, []);



  return (
    <AppContext.Provider
      value={{
        categories,
        products,
        users,
        orders,
        totalRevenue
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
