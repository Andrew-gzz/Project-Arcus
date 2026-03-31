import Navbar from "./navbar/Navbar";
import Footer from "./footer/Footer";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div style={{ backgroundColor: "#0C062E", minHeight: "100vh" }}>
      <Navbar />
      <Outlet /> {/* aquí se renderiza la página de la ruta */}
      <Footer />
    </div>
  );
}

export default Layout;
