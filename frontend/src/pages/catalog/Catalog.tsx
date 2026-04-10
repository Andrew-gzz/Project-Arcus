import { useParams } from "react-router-dom";
import { ProductGrid3 } from "../../components/productsGrid/ProductsGrid";
import "./FiltersSidebar.css";
import FiltersSidebar from "../../components/utils/FilterSidebar";
import Breadcrumb, { BreadcrumbItem } from "../../components/utils/Breadcrumb";
import { OfferCard } from "../../components/utils/BonCard";

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
            <ProductGrid3 categoria={categoryName} />
          </div>
          <OfferCard></OfferCard>
        </div>
      </div>
    </>
  );
}
