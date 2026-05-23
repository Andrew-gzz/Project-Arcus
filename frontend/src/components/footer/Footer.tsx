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

          {/* About Us Column */}
          <div className="col-lg-4 col-md-6">
            <h5 className="fw-bold mb-4">Sobre nosotros</h5>
            <ul className="list-unstyled">
              <li className="mb-2 d-flex align-items-center">
                <span className="me-2" style={{ color: "#DFFF00" }}>
                  ●
                </span>
                <Link
                  to="/membership"
                  className="text-white text-decoration-none"
                >
                  Membresías
                </Link>
              </li>
              <li className="mb-2 d-flex align-items-center">
                <span className="me-2" style={{ color: "#DFFF00" }}>
                  ●
                </span>
                <Link
                  to="/membership"
                  className="text-white text-decoration-none"
                >
                  Sobre Nosotros
                </Link>
              </li>
            </ul>
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
