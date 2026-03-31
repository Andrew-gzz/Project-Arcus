import { Link, useParams } from "react-router-dom";
import { ProductGrid3 } from "../../components/productsGrid/ProductsGrid";
import "./FiltersSidebar.css";
import FiltersSidebar from "../../components/utils/FilterSidebar";
import Breadcrumb, { BreadcrumbItem } from "../../components/utils/Breadcrumb";

export default function Catalog() {
  const { category } = useParams();

  const categoryName = category
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : "General";

  const breadcrumbPaths: BreadcrumbItem[] = [
    { name: "Inicio", url: "/" },
    {
      name: `Catálogo de ${categoryName}`,
      url: category ? `/catalog/${category}` : "/catalog",
    },
  ];
  return (
    <>
      {/*Breadcrumb */}
      <Breadcrumb items={breadcrumbPaths}></Breadcrumb>
      {/*GRID DE PRODUCTOS */}
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
