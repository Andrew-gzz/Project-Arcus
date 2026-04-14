import { useEffect, useState } from "react";
import { getCategories } from "../../services/categoryService";

// ✅ Tipo compartido exportado — lo importan Catalog y ProductGrid3
export type ActiveFilters = {
  categories: string[]; // categorías extra seleccionadas en sidebar
  inStock: boolean | undefined; // true=con stock, false=agotados, undefined=todos
  minRating: number | undefined; // rating mínimo seleccionado
};

interface FiltersSidebarProps {
  filters: ActiveFilters;
  onChange: (filters: ActiveFilters) => void;
  currentCategory?: string; // categoría activa por URL — se marca sola, no se puede desmarcar
}

function SectionHeader({
  title,
  rightAction,
}: {
  title: string;
  rightAction?: React.ReactNode;
}) {
  return (
    <div className="d-flex justify-content-between align-items-center mb-2">
      <div className="text-warning fw-semibold small">{title}</div>
      {rightAction}
    </div>
  );
}

function Divider() {
  return <hr className="arcus-hr my-3" />;
}

function ResetLink({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      className="btn btn-link p-0 text-danger arcus-reset"
      onClick={onClick}
    >
      Reset
    </button>
  );
}

export default function FiltersSidebar({
  filters,
  onChange,
  currentCategory = "General",
}: FiltersSidebarProps) {
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(
          data.sort((a: any, b: any) => a.name.localeCompare(b.name)),
        );
      } catch (error) {
        console.error("Error al cargar las categorías:", error);
      }
    };
    fetchCategories();
  }, []);

  // --- Handlers ---

  const handleCategoryToggle = (catName: string) => {
    const updated = filters.categories.includes(catName)
      ? filters.categories.filter((c) => c !== catName)
      : [...filters.categories, catName];
    onChange({ ...filters, categories: updated });
  };

  const handleStockChange = (value: boolean | undefined) => {
    onChange({
      ...filters,
      inStock: filters.inStock === value ? undefined : value,
    });
  };

  const handleRatingChange = (value: number | undefined) => {
    onChange({
      ...filters,
      minRating: filters.minRating === value ? undefined : value,
    });
  };

  const resetCategories = () => onChange({ ...filters, categories: [] });
  const resetStock = () => onChange({ ...filters, inStock: undefined });
  const resetRating = () => onChange({ ...filters, minRating: undefined });

  // Estrellas para el label de rating
  const starLabel = (min: number) => "★".repeat(min) + "☆".repeat(5 - min);

  return (
    <aside className="arcus-filter p-3 rounded-4 border-0">
      {/* CATEGORÍAS */}
      <SectionHeader
        title="Categorías"
        rightAction={<ResetLink onClick={resetCategories} />}
      />
      {categories.length > 0 ? (
        categories.map((cat) => (
          <div key={cat._id} className="mb-1">
            <div className="d-flex align-items-center py-1">
              <div className="form-check m-0 d-flex align-items-center gap-2">
                <input
                  className="form-check-input arcus-check"
                  type="checkbox"
                  id={cat._id}
                  checked={
                    cat.name === currentCategory || // ← activa por URL: siempre marcada
                    filters.categories.includes(cat.name)
                  }
                  disabled={cat.name === currentCategory} // ← no se puede desmarcar
                  onChange={() => handleCategoryToggle(cat.name)}
                />
                <label
                  className={`form-check-label arcus-label ${
                    cat.name === currentCategory
                      ? "text-info fw-semibold" // resaltada si es la categoría activa
                      : "text-white-50"
                  }`}
                  htmlFor={cat._id}
                >
                  {cat.name}
                  {cat.name === currentCategory && (
                    <span
                      className="ms-1 badge bg-info text-dark"
                      style={{ fontSize: "0.6rem" }}
                    >
                      activa
                    </span>
                  )}
                </label>
              </div>
            </div>
          </div>
        ))
      ) : (
        <span className="text-muted small">Cargando...</span>
      )}

      <Divider />

      {/* DISPONIBILIDAD */}
      <SectionHeader
        title="Disponibilidad"
        rightAction={<ResetLink onClick={resetStock} />}
      />
      {(
        [
          { label: "In stock", value: true },
          { label: "Out of stock", value: false },
        ] as { label: string; value: boolean }[]
      ).map(({ label, value }) => (
        <div key={label} className="d-flex align-items-center py-1">
          <div className="form-check m-0 d-flex align-items-center gap-2">
            <input
              className="form-check-input arcus-check"
              type="radio"
              id={`stock-${value}`}
              name="stockFilter"
              checked={filters.inStock === value}
              onChange={() => handleStockChange(value)}
            />
            <label
              className="form-check-label text-white-50 arcus-label"
              htmlFor={`stock-${value}`}
            >
              {label}
            </label>
          </div>
        </div>
      ))}

      <Divider />

      {/* CALIFICACIÓN MÍNIMA */}
      <SectionHeader
        title="Calificación mínima"
        rightAction={<ResetLink onClick={resetRating} />}
      />
      {[5, 4, 3, 2, 1].map((stars) => (
        <div key={stars} className="d-flex align-items-center py-1">
          <div className="form-check m-0 d-flex align-items-center gap-2">
            <input
              className="form-check-input arcus-check"
              type="radio"
              id={`rt-${stars}`}
              name="ratingFilter"
              checked={filters.minRating === stars}
              onChange={() => handleRatingChange(stars)}
            />
            <label
              className="form-check-label text-warning arcus-label"
              htmlFor={`rt-${stars}`}
            >
              {starLabel(stars)}
            </label>
          </div>
        </div>
      ))}
    </aside>
  );
}
