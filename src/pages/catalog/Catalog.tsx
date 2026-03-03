import { Link } from "react-router-dom";
import { ProductGrid3 } from "../../components/productsGrid/ProductsGrid";
import "./FiltersSidebar.css";
import FiltersSidebar from "../../components/utils/FilterSidebar";

export default function Catalog() {
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
            Catálogo de Nintendo
          </li>
        </ol>
      </nav>
      <div className="container">
        <div className="row g-4">
          <div className="col-12 col-lg-3">
            <FiltersSidebar />
          </div>
          <div className="col-12 col-lg-9">
            {/* ProductGrid aquí */}
            <ProductGrid3></ProductGrid3>
          </div>
        </div>

        {/*ANUNCIO */}
        <div
          className="py-5 rounded-4 my-5"
          style={{
            backgroundImage: "url('src/assets/MembresiaFondo.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
          }}
        >
          <div className="container position-relative">
            {/* Texto principal */}
            <div className="py-4" style={{ maxWidth: 520 }}>
              <button className="btn btn-outline-light rounded-pill px-4 py-2 fw-bold">
                Más información
              </button>
              <h1
                className="text-white fw-bold mb-2"
                style={{ fontSize: "3rem" }}
              >
                30% de descuento
              </h1>

              <button
                className="btn btn-danger rounded-pill px-4 py-2 fw-bold"
                style={{ backgroundColor: "#f02b2b", borderColor: "#f02b2b" }}
              >
                Comprar ahora
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
