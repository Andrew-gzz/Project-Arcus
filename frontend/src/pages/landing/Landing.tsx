import Carousel from "../../components/carousel/Carousel";
import CategoryCarousel from "../../components/categoryCarousel/CategoryCarousel";
import ProductGrid, {
  ProductGrid2,
} from "../../components/productsGrid/ProductsGrid";
import { BonCard2, MarkCard, OfferCard } from "../../components/utils/BonCard";

export default function Landing() {
  return (
    <>
      {/* CARRUSEL PRINCIPAL */}
      <Carousel></Carousel>
      <div className="container">
        {/* CARRUSEL DE CATEGORIAS */}
        <CategoryCarousel></CategoryCarousel>
        {/* GRID DE PRODUCTOS GENERALES*/}
        <ProductGrid></ProductGrid>
        {/* BANNER DE MARCAS */}
        <MarkCard></MarkCard>
        {/* BANNER DE DESCUENTOS */}
        <OfferCard></OfferCard>
        {/* PRODUCTOS NUEVOS O EN OFERTA */}
        <ProductGrid2></ProductGrid2>
        {/*Benedicios card */}
        <BonCard2></BonCard2>
      </div>
    </>
  );
}
