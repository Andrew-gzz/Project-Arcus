import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getWishlist,
  removeFromWishlist,
} from "../../services/wishlistService";
import { addToCart } from "../../services/cartService";
import EmptyProductsState from "../../components/utils/EmptyProductsState";
import Breadcrumb, { BreadcrumbItem } from "../../components/utils/Breadcrumb";

const ITEMS_PER_PAGE = 8;

export default function WishlistPage() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [hoveredCard, setHoveredCard] = useState<string | number | null>(null);
  const [wishlistLoading, setWishlistLoading] = useState<Set<string>>(
    new Set(),
  );

  // PAGINACIÓN FRONTEND
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Derivados: se recalculan solos en cada render
  const totalPages = Math.ceil(allProducts.length / ITEMS_PER_PAGE);
  const products = allProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const breadcrumbPaths: BreadcrumbItem[] = [
    { name: "Inicio", url: "/" },
    { name: "Favoritos" },
  ];

  const loadWishlist = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getWishlist();
      setAllProducts(data.products);
      setCurrentPage(1); // Siempre arranca en página 1 al cargar
    } catch (err: any) {
      setError("Error al cargar tus favoritos. ¿Estás autenticado?");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWishlist();
  }, []);

  const handleAddToCart = async (productId: string) => {
    try {
      await addToCart(productId, 1);
      window.dispatchEvent(new Event("cartUpdated"));
    } catch {
      // Error silencioso
    }
  };

  const handleRemoveFromWishlist = async (
    e: React.MouseEvent,
    productId: string,
  ) => {
    e.stopPropagation();
    if (wishlistLoading.has(productId)) return;

    setWishlistLoading((prev) => new Set(prev).add(productId));
    try {
      await removeFromWishlist(productId);
      setAllProducts((prev) => {
        const updated = prev.filter((p) => p._id !== productId);
        // Si al eliminar la página actual queda vacía, retrocedemos una página
        const newTotalPages = Math.ceil(updated.length / ITEMS_PER_PAGE);
        if (currentPage > newTotalPages && newTotalPages > 0) {
          setCurrentPage(newTotalPages);
        }
        return updated;
      });
      window.dispatchEvent(new Event("wishlistUpdated"));
    } catch {
      setError("No se pudo eliminar el producto de favoritos.");
    } finally {
      setWishlistLoading((prev) => {
        const next = new Set(prev);
        next.delete(productId);
        return next;
      });
    }
  };

  return (
    <div className="container mb-5" style={{ minHeight: "100vh" }}>
      <Breadcrumb items={breadcrumbPaths} />

      <div className="d-flex align-items-center gap-3 mb-5">
        <h1 className="text-light mb-0">Favoritos</h1>
      </div>

      {loading && (
        <div className="text-center text-info my-5">Cargando favoritos...</div>
      )}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && allProducts.length === 0 ? (
        <EmptyProductsState
          title="No tienes favoritos aún"
          message="Explora el catálogo y guarda los productos que más te gusten."
        />
      ) : (
        <>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            {products.map((product, index) => {
              const cardId = product._id || index;

              return (
                <div className="col" key={product._id || index}>
                  <div
                    className="card h-100 border rounded-4 overflow-hidden"
                    style={{
                      backgroundColor: "#1e1b33",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      cursor: "pointer",
                      transform:
                        hoveredCard === cardId
                          ? "translateY(-5px)"
                          : "translateY(0)",
                      boxShadow:
                        hoveredCard === cardId
                          ? "0 10px 20px rgba(0,0,0,0.5)"
                          : "none",
                    }}
                    onClick={() => navigate(`/product/${product._id}`)}
                    onMouseEnter={() => setHoveredCard(cardId)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    {/* Imagen + Botón quitar */}
                    <div
                      className="position-relative p-4 d-flex justify-content-center align-items-center"
                      style={{ backgroundColor: "#25223d", height: "200px" }}
                    >
                      <button
                        onClick={(e) =>
                          handleRemoveFromWishlist(e, product._id)
                        }
                        disabled={wishlistLoading.has(product._id)}
                        title="Quitar de favoritos"
                        className="btn position-absolute top-0 end-0 m-3 rounded-circle d-flex align-items-center justify-content-center p-0"
                        style={{
                          backgroundColor: "transparent",
                          width: "34px",
                          height: "34px",
                          border: "none",
                          opacity: hoveredCard === cardId ? 1 : 0.7,
                          transform:
                            hoveredCard === cardId ? "scale(1.15)" : "scale(1)",
                          transition: "opacity 0.3s ease, transform 0.2s ease",
                          cursor: wishlistLoading.has(product._id)
                            ? "not-allowed"
                            : "pointer",
                        }}
                      >
                        {wishlistLoading.has(product._id) ? (
                          <small
                            className="text-white fw-bold"
                            style={{ fontSize: "10px" }}
                          >
                            ···
                          </small>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="22"
                            height="22"
                            viewBox="0 0 16 16"
                            fill="#F31919"
                          >
                            <path d="M8 14s-6-3.33-6-8a3.5 3.5 0 0 1 6-2.45A3.5 3.5 0 0 1 14 6c0 4.67-6 8-6 8z" />
                          </svg>
                        )}
                      </button>

                      <img
                        src={product.image}
                        alt={product.name}
                        className="img-fluid"
                        style={{ maxHeight: "140px", objectFit: "contain" }}
                      />
                    </div>

                    {/* Info */}
                    <div
                      className="card-body text-white p-3"
                      style={{ backgroundColor: "#0C062E" }}
                    >
                      <h6 className="mb-2 fw-bold">{product.name}</h6>
                      <p className="text-warning fw-bold mb-1">
                        ${product.price}
                      </p>
                      <div className="text-info small mb-3">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span key={star}>
                            {star <= Math.round(product.ratingAverage || 0)
                              ? "★ "
                              : "☆ "}
                          </span>
                        ))}
                        {product.ratingCount > 0 && (
                          <span
                            className="text-light ms-1"
                            style={{ fontSize: "0.75rem" }}
                          >
                            ({product.ratingCount})
                          </span>
                        )}
                      </div>

                      <div
                        className="d-flex gap-2 mt-auto pt-2"
                        style={{
                          opacity: hoveredCard === cardId ? 1 : 0,
                          visibility:
                            hoveredCard === cardId ? "visible" : "hidden",
                          transition: "opacity 0.3s ease, visibility 0.3s ease",
                        }}
                      >
                        <button
                          className="btn btn-warning flex-grow-1 fw-bold rounded-pill d-flex align-items-center justify-content-center gap-2"
                          style={{
                            backgroundColor: "#e2f54d",
                            fontSize: "0.8rem",
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart(product._id);
                          }}
                        >
                          Añadir al carrito
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* PAGINACIÓN — solo si hay más de una página */}
          {totalPages > 1 && (
            <div className="d-flex justify-content-center align-items-center gap-3 mt-5">
              <button
                className="btn btn-outline-info rounded-pill px-4"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                Anterior
              </button>

              {/* Números de página */}
              <div className="d-flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      className={`btn rounded-circle fw-bold ${
                        page === currentPage
                          ? "btn-info text-dark"
                          : "btn-outline-secondary text-white"
                      }`}
                      style={{ width: "38px", height: "38px", padding: 0 }}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  ),
                )}
              </div>

              <button
                className="btn btn-outline-info rounded-pill px-4"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                Siguiente
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
