//frontend/src/App.tsx
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Layout from "./components/Layout";
import SignInPage from "./pages/signin/SignIn";
import Membership from "./components/membership/membership";
import MembershipDetail from "./pages/membership/MembershipDetail";
import SignUpPage from "./pages/signup/SignUp";
import Landing from "./pages/landing/Landing";
import Catalog from "./pages/catalog/Catalog";
import Product from "./pages/product/Product";
import Cart from "./pages/cart/cart";
import Payment from "./pages/payment/Payment";
import Admin from "./pages/admin/Admin";
import AdminUsers from "./pages/admin/users/AdminUsers";
import AdminReports from "./pages/admin/reports/AdminReports";
import ScrollToTop from "./components/utils/ScrollToTop";
import WishlistPage from "./pages/wishlist/Wishlist";
import AboutUsPage from "./pages/aboutUs/AboutUs";
import Profile from "./pages/profile/Profile";
import MyOrders from "./pages/orders/MyOrders";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          {/* --- RUTAS PÚBLICAS --- */}
          <Route path="/" element={<Landing />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/membership/:plan" element={<MembershipDetail />} />
          <Route path="/aboutus" element={<AboutUsPage />} />
          <Route path="/catalog/:category?" element={<Catalog />} />
          <Route path="/product/:id" element={<Product />} />

          {/* --- RUTAS PROTEGIDAS (USUARIO LOGEADO) --- */}
          <Route element={<ProtectedRoute />}>
            <Route path="/cart" element={<Cart />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/my-orders" element={<MyOrders />} />
          </Route>

          {/*--- RUTAS PROTEGIDAS (SOLO ADMIN) --- */}
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/reports" element={<AdminReports />} />
          </Route>

          {/* Ruta catch-all para páginas no encontradas */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
