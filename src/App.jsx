import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Category from "./components/Category/Category";
import Products from "./components/Products/Products";
import Orders from "./components/Orders/Orders";
import Dashboard from "./components/Dashboard/Dashboard";
import AddProducts from "./components/Products/AddProducts";
import AddCategory from "./components/Category/AddCategory";
import SignInPage from "./components/Sign-in";
import SignUpPage from "./components/Sign-up";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/categories" element={<Category />} />
        <Route path="/add-category" element={<AddCategory />} />

        <Route path="/products" element={<Products />} />
        <Route path="/add-products" element={<AddProducts />} />

        <Route path="/orders" element={<Orders />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
