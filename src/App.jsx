import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AppProvider from "./Context/AppContext";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-react";
import SignInPage from "./components/Sign-in";
// import SignUpPage from "./components/Sign-up";
import { SidebarProvider } from "./components/ui/sidebar";
import { AdminSidebar } from "./components/AdminSidebar";
import Category from "./pages/Category";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Dashboard from "./pages/Dashboard";
import User from "./pages/User";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const AuthenticatedLayout = ({ children }) => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AdminSidebar />
        <main className="flex-1 w-full overflow-auto">{children}</main>
      </div>
    </SidebarProvider>
  );
};

function App() {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <AppProvider>
        <BrowserRouter>
          <Toaster />
          <Routes>
            <Route
              path="/sign-in"
              element={
                <SignedOut>
                  <SignInPage />
                </SignedOut>
              }
            />
            <Route
              path="/"
              element={
                <SignedIn>
                  <AuthenticatedLayout>
                    <Dashboard />
                  </AuthenticatedLayout>
                </SignedIn>
              }
            />

            <Route
              path="/categories"
              element={
                <SignedIn>
                  <AuthenticatedLayout>
                    <Category />
                  </AuthenticatedLayout>
                </SignedIn>
              }
            />

            <Route
              path="/products"
              element={
                <SignedIn>
                  <AuthenticatedLayout>
                    <Products />
                  </AuthenticatedLayout>
                </SignedIn>
              }
            />

            <Route
              path="/orders"
              element={
                <SignedIn>
                  <AuthenticatedLayout>
                    <Orders />
                  </AuthenticatedLayout>
                </SignedIn>
              }
            />

            <Route
              path="/users"
              element={
                <SignedIn>
                  <AuthenticatedLayout>
                    <User />
                  </AuthenticatedLayout>
                </SignedIn>
              }
            />

            <Route
              path="*"
              element={
                <>
                  <SignedIn>
                    <Navigate to="/" replace />
                  </SignedIn>
                  <SignedOut>
                    <Navigate to="/sign-in" replace />
                  </SignedOut>
                </>
              }
            />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </ClerkProvider>
  );
}

export default App;
