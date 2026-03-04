import { Link } from "react-router-dom";
import { ProductGrid3 } from "../../components/productsGrid/ProductsGrid";
import "./FiltersSidebar.css";
import FiltersSidebar from "../../components/utils/FilterSidebar";

export default function Catalog() {
  return (
    <>
      {/*Breadcrumb */}
      <nav className="container py-4" aria-label="breadcrumb">
        <ol className="breadcrumb mb-0">
          <li className="breadcrumb-item">
            <Link
              to="/"
              className="text-warning text-decoration-none opacity-75"
            >
              Inicio
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/catalog" className="text-warning text-decoration-none">
              Catálogo de Nintendo
            </Link>
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
