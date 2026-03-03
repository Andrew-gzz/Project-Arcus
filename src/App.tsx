import SignInPage from "./pages/signin/SignIn";
import Layout from "./components/Layout";
import { Route, Routes } from "react-router-dom";
import Card from "./components/Card";
import Membership from "./components/membership/membership";
import SignUnPage from "./pages/signup/SignUp";
import Landing from "./pages/landing/Landing";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/card" element={<Card body={"Hola mundo"} />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUnPage />} />
      </Route>
    </Routes>
  );
}

export default App;
