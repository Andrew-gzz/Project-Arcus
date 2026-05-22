import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface TopLoginBannerProps {
  user: { username: string } | null;
}
function Footer() {
  const [user, setUser] = useState<{ username: string } | null>(null);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  return (
    <footer style={{ backgroundColor: "#200C40" }} className="text-white py-5">
      {/* TOP BANNER - Log in Section */}
      <TopBanner user={user}></TopBanner>
      {/* BOTTOM SECTION - Columns */}
      <div className="container">
        <div className="row g-4">
          {/* Logo & Address */}
          <div className="col-lg-5 col-md-12">
            <div className="d-flex align-items-center mb-4">
              <img
                src="src/assets/logo.png"
                alt="Project Arcus"
                height="40"
                className="me-2"
              />
            </div>
            <p className="small lh-lg" style={{ opacity: 0.8 }}>
              Pedro de Alba S/N, Niños Héroes, <br />
              Ciudad Universitaria, 66455 <br />
              San Nicolás de los Garza, N.L.
            </p>
          </div>

          {/* Ayuda Column */}
          <div className="col-lg-3 col-md-6">
            <h5 className="fw-bold mb-4">Ayuda</h5>
            <ul className="list-unstyled">
              <li className="mb-2 d-flex align-items-center">
                <span className="me-2" style={{ color: "#DFFF00" }}>
                  ●
                </span>
                <Link
                  to="/aboutus"
                  className="text-white text-decoration-none"
                >
                  Servicio al cliente
                </Link>
              </li>
              <li className="mb-2 d-flex align-items-center">
                <span className="me-2" style={{ color: "#DFFF00" }}>
                  ●
                </span>
                <a
                  href="tel:+528183294000"
                  className="text-white text-decoration-none"
                >
                  Contactanos 81-8329-4000
                </a>
              </li>
            </ul>
          </div>

          {/* About Us Column */}
          <div className="col-lg-4 col-md-6">
            <h5 className="fw-bold mb-4">Sobre nosotros</h5>
            <ul className="list-unstyled">
              <li className="mb-2 d-flex align-items-center">
                <span className="me-2" style={{ color: "#DFFF00" }}>
                  ●
                </span>
                <Link
                  to="/aboutus"
                  className="text-white text-decoration-none"
                >
                  Servicios
                </Link>
              </li>
              <li className="mb-2 d-flex align-items-center">
                <span className="me-2" style={{ color: "#DFFF00" }}>
                  ●
                </span>
                <a href="#!" className="text-white text-decoration-none">
                  Facturación
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Redes Sociales */}
        <div className="row mt-4 pt-4 border-top border-secondary">
          <div className="col-12 text-center">
            <h5 className="fw-bold mb-3">Síguenos</h5>
            <div className="d-flex justify-content-center gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-decoration-none fs-4"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-decoration-none fs-4"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633Z" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-decoration-none fs-4"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 2.176a1.4 1.4 0 1 1-2.8 0 1.4 1.4 0 0 1 2.8 0zm-5.14 1.442a5.14 5.14 0 1 0 0 10.28 5.14 5.14 0 0 0 0-10.28zm2.57 2.57a2.57 2.57 0 1 1-5.14 0 2.57 2.57 0 0 1 5.14 0z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="row mt-3">
          <div className="col-12 text-center">
            <p className="small mb-0" style={{ opacity: 0.6 }}>
              © {new Date().getFullYear()} Project Arcus. Todos los derechos
              reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

//UTILIDADES DEL FOOTER
function TopBanner({ user }: TopLoginBannerProps) {
  if (user) return null;
  return (
    <>
      <div className="container mb-5">
        <div className="bg-white text-dark rounded-5 p-4 shadow-sm">
          <div className="row align-items-center text-center text-md-start">
            {/* Log in Text */}
            <div className="col-md-3">
              <h1 className="fw-bold mb-0" style={{ color: "#E73124" }}>
                Inicia sesión
              </h1>
            </div>

            {/* Email Input Section */}
            <Link
              className="col-md-5 my-3 my-md-0 rounded-pill border-0 bg-transparent text-decoration-none"
              to="/signin"
            >
              <div
                className="d-flex align-items-center justify-content-between px-4 py-2 rounded-pill"
                style={{ backgroundColor: "#E73124", color: "white" }}
              >
                <span className="mb-0">Correo electrónico</span>
                {/* Paper Plane Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M227.32,28.68a16,16,0,0,0-15.66-4.08l-180,48a16,16,0,0,0-2.49,29.8L102,128,154,76a8,8,0,0,1,11.32,11.32L113.33,139.3l45.64,72.82a16,16,0,0,0,13.5,7.88h.61a16,16,0,0,0,13.25-10.42l48-180A16,16,0,0,0,227.32,28.68Z"></path>
                </svg>
              </div>
            </Link>

            {/* Promo Text */}
            <div className="col-md-4">
              <p className="mb-0 small fw-semibold text-secondary">
                Consigue promociones exclusivas, cupones y las últimas noticias.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Footer;
