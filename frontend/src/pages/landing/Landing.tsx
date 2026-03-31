import Carousel from "../../components/carousel/Carousel";
import CategoryCarousel from "../../components/categoryCarousel/CategoryCarousel";
import ProductGrid, {
  ProductGrid2,
} from "../../components/productsGrid/ProductsGrid";
import { BonCard2, MarkCard } from "../../components/utils/BonCard";

export default function Landing() {
  return (
    <>
      {/* CARRUSEL PRINCIPAL */}
      <Carousel></Carousel>
      <div className="container">
        {/* CARRUSEL DE CATEGORIAS */}
        <CategoryCarousel></CategoryCarousel>
        {/* GRID DE PRODUCTOS */}
        <ProductGrid></ProductGrid>
        {/* BANNER DE MARCAS */}
        <MarkCard></MarkCard>
        {/* ANUNCIO DE DESCUENTOS */}
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
        {/* Productos */}
        <ProductGrid2></ProductGrid2>
        {/*Benedicios card */}
        <BonCard2></BonCard2>
      </div>
    </>
  );
}
