import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { ProductGrid3 } from "../../components/productsGrid/ProductsGrid";
import "./FiltersSidebar.css";
import FiltersSidebar, {
  ActiveFilters,
} from "../../components/utils/FilterSidebar";
import Breadcrumb, { BreadcrumbItem } from "../../components/utils/Breadcrumb";
import { OfferCard } from "../../components/utils/BonCard";

const DEFAULT_FILTERS: ActiveFilters = {
  categories: [],
  inStock: undefined,
  minRating: undefined,
};

export default function Catalog() {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  const [activeFilters, setActiveFilters] =
    useState<ActiveFilters>(DEFAULT_FILTERS);

  const categoryName = category
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : "General";

  useEffect(() => {
    setActiveFilters(DEFAULT_FILTERS);
  }, [categoryName]);

  const breadcrumbPaths: BreadcrumbItem[] = searchQuery
    ? [
        { name: "Inicio", url: "/" },
        { name: `Búsqueda: "${searchQuery}"` },
      ]
    : [
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
            <FiltersSidebar
              filters={activeFilters}
              onChange={setActiveFilters}
              currentCategory={categoryName}
            />
          </div>
          <div className="col-12 col-lg-9">
            <ProductGrid3
              categoria={categoryName}
              activeFilters={activeFilters}
              searchQuery={searchQuery}
            />
          </div>
          <OfferCard />
        </div>
      </div>
    </>
  );
}
