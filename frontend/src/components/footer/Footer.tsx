function Footer() {
  return (
    <footer style={{ backgroundColor: "#200C40" }} className="text-white py-5">
      {/* TOP BANNER - Log in Section */}
      <div className="container mb-5">
        <div className="bg-white text-dark rounded-5 p-4 shadow-sm">
          <div className="row align-items-center text-center text-md-start">
            {/* Log in Text */}
            <div className="col-md-3">
              <h1 className="fw-bold mb-0" style={{ color: "#E73124" }}>
                Log in
              </h1>
            </div>

            {/* Email Input Section */}
            <div className="col-md-5 my-3 my-md-0">
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
            </div>

            {/* Promo Text */}
            <div className="col-md-4">
              <p className="mb-0 small fw-semibold text-secondary">
                Consigue promociones exclusivas, cupones y las últimas noticias.
              </p>
            </div>
          </div>
        </div>
      </div>

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
                <a href="#!" className="text-white text-decoration-none">
                  Servicio al cliente
                </a>
              </li>
              <li className="mb-2 d-flex align-items-center">
                <span className="me-2" style={{ color: "#DFFF00" }}>
                  ●
                </span>
                <a href="#!" className="text-white text-decoration-none">
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
                <a href="#!" className="text-white text-decoration-none">
                  Servicios
                </a>
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
      </div>
    </footer>
  );
}

export default Footer;
