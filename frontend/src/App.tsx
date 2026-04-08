//frontend/src/App.tsx
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Layout from "./components/Layout";
import SignInPage from "./pages/signin/SignIn";
import Membership from "./components/membership/membership";
import SignUpPage from "./pages/signup/SignUp";
import Landing from "./pages/landing/Landing";
import Catalog from "./pages/catalog/Catalog";
import Product from "./pages/product/Product";
import Cart from "./pages/cart/cart";
import Payment from "./pages/payment/Payment";
import Admin from "./pages/admin/Admin";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* --- RUTAS PÚBLICAS --- */}
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/catalog/:category?" element={<Catalog />} />
        <Route path="/product/:id" element={<Product />} />
        {/* --- RUTAS PROTEGIDAS (USUARIO LOGEADO) --- */}
        <Route element={<ProtectedRoute />}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/payment" element={<Payment />} />
        </Route>

        {/*--- RUTAS PROTEGIDAS (SOLO ADMIN) --- */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<Admin />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
