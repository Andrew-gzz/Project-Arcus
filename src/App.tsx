import LoginPage from "./pages/login/Login";
import Layout from "./components/Layout";
import { Route, Routes } from "react-router-dom";
import Card from "./components/Card";
import Membership from "./components/membership/membership";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<LoginPage />} />
        <Route path="/card" element={<Card body={"Hola mundo"} />} />
        <Route path="/membership" element={<Membership />} />
      </Route>
    </Routes>
  );
}

export default App;
