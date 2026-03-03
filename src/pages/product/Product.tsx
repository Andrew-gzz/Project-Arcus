import { Link } from "react-router-dom";

export default function Product() {
  return (
    <>
      {/*Breadcrumb */}
      <nav
        className="container my-4"
        aria-label="breadcrumb"
        style={{ ["--bs-breadcrumb-divider" as any]: "'>'" }}
      >
        <ol className="breadcrumb breadcrumb-white-divider">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li
            className="breadcrumb-item active text-warning"
            aria-current="page"
          >
            <Link to="/catalog">Catálogo de Nintendo</Link>
          </li>
          <li
            className="breadcrumb-item active text-warning"
            aria-current="page"
          >
            Pokemon Ola
          </li>
        </ol>
      </nav>
      {/*PRODUCT DETAILS */}

      <div className="container">
        <div className="row align-items-stretch mb-5">
          {/*Seccion 1 */}
          <div className="col-sm-6 mb-3 mb-sm-0">
            <div className="row g-0 rounded-4 overflow-hidden h-100">
              {/* Imagen */}
              <div className="col">
                <img
                  src="src/assets/MembresiaFondo.png"
                  className="img-fluid h-100 w-100 object-fit-cover"
                  alt="Producto 1"
                />
              </div>
            </div>
          </div>
          {/* Seccion 2 */}
          <div className="col-sm-6 d-flex gap-4 flex-sm-column">
            {/*PRODUCTO */}
            <div className="row g-0 rounded-4 overflow-hidden">
              {/* Texto */}
              <div className="col">
                <div
                  className="card rounded-0 h-100 border-0 text-white"
                  style={{ backgroundColor: "#25223d" }}
                >
                  <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">
                      This is a wider card with supporting text below as a
                      natural lead-in to additional content.
                    </p>
                    <p className="card-text">
                      <small className="text-white">
                        Last updated 3 mins ago
                      </small>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
