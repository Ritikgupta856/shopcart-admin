import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Category from "./components/Category/Category";
import Products from "./components/Products/Products";
import Orders from "./components/Orders/Orders";
import Dashboard from "./components/Dashboard/Dashboard";
import AddProducts from "./components/Products/AddProducts";
import AddCategory from "./components/Category/AddCategory";
import { Toaster } from "react-hot-toast";
import AppProvider from "./Context/AppContext";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-react";
import SignInPage from "./components/Sign-in";
// import SignUpPage from "./components/Sign-up";
import { SidebarProvider } from "./components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

function App() {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <AppProvider>
        <BrowserRouter>
          <Toaster />

          <SignedIn>
            <SidebarProvider>
              <div className="flex min-h-screen">
                <AppSidebar />

                {/* Main content area */}
                <main className="flex-1 p-4">
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/categories" element={<Category />} />
                    <Route path="/add-category" element={<AddCategory />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/add-products" element={<AddProducts />} />
                    <Route path="/orders" element={<Orders />} />
                  </Routes>
                </main>
              </div>
            </SidebarProvider>
          </SignedIn>

          <SignedOut>
            <Routes>
              <Route path="/sign-in" element={<SignInPage />} />
              {/* <Route path="/sign-up" element={<SignUpPage />} /> */}
              <Route path="*" element={<Navigate to="/sign-in" replace />} />
            </Routes>
          </SignedOut>
        </BrowserRouter>
      </AppProvider>
    </ClerkProvider>
  );
}

export default App;
