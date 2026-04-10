import { useEffect, useState } from "react";
import { getCategories } from "../../services/categoryService";
import { Link } from "react-router-dom";

export default function CategoryCarousel() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        // Orden alfabético
        const sortedCategories = data.sort((a: any, b: any) =>
          a.name.localeCompare(b.name),
        );
        setCategories(sortedCategories);
      } catch (error) {
        console.error("Error al cargar las categorías:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // Función para agrupar las categorías en grupos de 3 para las diapositivas
  const chunkArray = (arr: any[], size: number) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  };

  const categoryChunks = chunkArray(categories, 3);

  if (loading)
    return <div className="text-center text-white">Cargando categorías...</div>;

  return (
    <div className="container-fluid py-5">
      <div
        id="categoryCarousel"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          {categoryChunks.map((chunk, index) => (
            <div
              key={index}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
            >
              <div className="row g-3">
                {chunk.map((cat: any) => (
                  <div className="col-4" key={cat._id || cat.name}>
                    <Link
                      className="btn w-100 d-flex flex-column align-items-center justify-content-center p-4 rounded-4 shadow-sm border-0"
                      style={{
                        backgroundColor: "#1e1b33",
                      }}
                      to={`/catalog/${cat.name.replace(/\s+/g, "-")}`}
                    >
                      {cat.image && (
                        <img
                          src={cat.image}
                          alt={cat.name}
                          className="mb-2"
                          style={{
                            width: "50px",
                            height: "50px",
                            objectFit: "contain",
                          }}
                        />
                      )}
                      <span className="text-white fw-bold fs-5">
                        {cat.name}
                      </span>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Controles */}
        {categories.length > 3 && (
          <>
            <button
              className="carousel-control-prev opacity-100"
              type="button"
              data-bs-target="#categoryCarousel"
              data-bs-slide="prev"
              style={{ width: "5%" }}
            >
              <div
                className="bg-warning rounded-circle d-flex align-items-center justify-content-center shadow"
                style={{ width: "40px", height: "40px" }}
              >
                <span className="text-dark fw-bold">←</span>
              </div>
            </button>

            <button
              className="carousel-control-next opacity-100"
              type="button"
              data-bs-target="#categoryCarousel"
              data-bs-slide="next"
              style={{ width: "5%" }}
            >
              <div
                className="bg-warning rounded-circle d-flex align-items-center justify-content-center shadow"
                style={{ width: "40px", height: "40px" }}
              >
                <span className="text-dark fw-bold">→</span>
              </div>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
