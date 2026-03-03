import Carousel from "../../components/carousel/Carousel";
import CategoryCarousel from "../../components/categoryCarousel/CategoryCarousel";
import ProductGrid from "../../components/productsGrid/ProductsGrid";

export default function Landing() {
  return (
    <>
      <Carousel></Carousel>
      <div className="container">
        <CategoryCarousel></CategoryCarousel>
        <ProductGrid></ProductGrid>
        {/* MARKS BANNER */}
        <div className="bg-white text-dark rounded-4 p-4 shadow-sm">
          <div className="row align-items-center">
            {/* Log in Text */}
            <div className="col text-center">
              <img src="/src/assets/react.svg" alt="brand"></img>
            </div>
            <div className="col text-center">
              <img src="/src/assets/react.svg" alt="brand"></img>
            </div>
            <div className="col text-center">
              <img src="/src/assets/react.svg" alt="brand"></img>
            </div>
            <div className="col text-center">
              <img src="/src/assets/react.svg" alt="brand"></img>
            </div>
          </div>
        </div>
        <div
          className="py-5 my-5 rounded-4"
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
              <h1
                className="text-white fw-bold mb-2"
                style={{ fontSize: "3rem" }}
              >
                30% de descuento
              </h1>
              <div className="d-flex gap-3 mt-4">
                <button
                  className="btn btn-danger rounded-pill px-4 py-2 fw-bold"
                  style={{ backgroundColor: "#f02b2b", borderColor: "#f02b2b" }}
                >
                  Comprar ahora
                </button>
                <button className="btn btn-outline-light rounded-pill px-4 py-2 fw-bold">
                  Más info
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
