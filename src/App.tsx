import SignInPage from "./pages/signin/SignIn";
import Layout from "./components/Layout";
import { Route, Routes } from "react-router-dom";
import Membership from "./components/membership/membership";
import SignUnPage from "./pages/signup/SignUp";
import Landing from "./pages/landing/Landing";
import Catalog from "./pages/catalog/Catalog";
import Product from "./pages/product/Product";
import Cart from "./pages/cart/cart";
import Payment from "./pages/payment/payment";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUnPage />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/product" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment" element={<Payment />} />
      </Route>
    </Routes>
  );
}

export default App;
