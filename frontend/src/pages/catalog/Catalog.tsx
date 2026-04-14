import { useState } from "react";
import { useParams } from "react-router-dom";
import { ProductGrid3 } from "../../components/productsGrid/ProductsGrid";
import "./FiltersSidebar.css";
import FiltersSidebar, {
  ActiveFilters,
} from "../../components/utils/FilterSidebar";
import Breadcrumb, { BreadcrumbItem } from "../../components/utils/Breadcrumb";
import { OfferCard } from "../../components/utils/BonCard";

// Estado inicial de filtros — todo vacío (sin restricciones)
const DEFAULT_FILTERS: ActiveFilters = {
  categories: [],
  inStock: undefined,
  minRating: undefined,
};

export default function Catalog() {
  const { category } = useParams();

  const categoryName = category
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : "General";

  // ✅ El estado de filtros vive aquí — fluye hacia sidebar y grid
  const [activeFilters, setActiveFilters] =
    useState<ActiveFilters>(DEFAULT_FILTERS);

  const breadcrumbPaths: BreadcrumbItem[] = [
    { name: "Inicio", url: "/" },
    {
      name: `Catálogo de ${categoryName}`,
      url: category ? `/catalog/${category}` : "/catalog",
    },
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbPaths} />

      <div className="container">
        <div className="row g-4">
          <div className="col-12 col-lg-3">
            {/* Sidebar recibe el estado y un callback para actualizarlo */}
            <FiltersSidebar
              filters={activeFilters}
              onChange={setActiveFilters}
              currentCategory={categoryName} // ← pasa la categoría de la URL
            />
          </div>
          <div className="col-12 col-lg-9">
            {/* Grid recibe la categoría de la URL + los filtros activos */}
            <ProductGrid3
              categoria={categoryName}
              activeFilters={activeFilters}
            />
          </div>
          <OfferCard />
        </div>
      </div>
    </>
  );
}
