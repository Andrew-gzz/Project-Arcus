import { useState, useEffect } from "react";
import { getProducts } from "../../services/productService";
import { useNavigate } from "react-router-dom";
import EmptyProductsState from "../../components/utils/EmptyProductsState";
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "../../services/wishlistService";
import { addToCart } from "../../services/cartService";

export default function ProductGrid() {
  const navigate = useNavigate();

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [activeCategory, setActiveCategory] = useState<string>("");

  const [hoveredCard, setHoveredCard] = useState<string | number | null>(null);

  const handleAddToCart = async (productId: string) => {
    try {
      await addToCart(productId, 1);
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.error(error);
    }
  };

  const [wishlistIds, setWishlistIds] = useState<Set<string>>(new Set());
  const [wishlistLoading, setWishlistLoading] = useState<Set<string>>(
    new Set(),
  );

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const data = await getWishlist();
        const ids = new Set<string>(data.products.map((p: any) => p._id));
        setWishlistIds(ids);
      } catch {
        // Si el usuario no está autenticado simplemente no se carga
      }
    };
    fetchWishlist();
  }, []);

  const handleWishlistToggle = async (
    e: React.MouseEvent,
    productId: string,
  ) => {
    e.stopPropagation();
    if (wishlistLoading.has(productId)) return;

    setWishlistLoading((prev) => new Set(prev).add(productId));
    try {
      if (wishlistIds.has(productId)) {
        await removeFromWishlist(productId);
        setWishlistIds((prev) => {
          const next = new Set(prev);
          next.delete(productId);
          return next;
        });
      } else {
        await addToWishlist(productId);
        setWishlistIds((prev) => new Set(prev).add(productId));
      }
      window.dispatchEvent(new Event("wishlistUpdated"));
    } catch (err) {
      console.error("Error al actualizar favoritos:", err);
    } finally {
      setWishlistLoading((prev) => {
        const next = new Set(prev);
        next.delete(productId);
        return next;
      });
    }
  };

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const filters: any = {
        page: currentPage,
        limit: 8,
      };

      if (activeCategory) {
        filters.category = [activeCategory];
      }

      const data = await getProducts(filters);

      setProducts(data.products);
      setCurrentPage(data.pagination.page);
      setTotalPages(data.pagination.pages);
    } catch (err: any) {
      setError("Error al cargar los productos de la base de datos");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [currentPage, activeCategory]);

  const handleCategoryClick = (category: string) => {
    if (activeCategory === category) {
      setActiveCategory("");
    } else {
      setActiveCategory(category);
    }
    setCurrentPage(1);
  };

  return (
    <div className="container-fluid py-5" style={{ minHeight: "100vh" }}>
      <div className="d-flex justify-content-between align-items-center mb-5 ">
        <h2 className="text-warning fw-bold">Productos populares</h2>

        <div className="d-none d-md-flex gap-2">
          {["Consola", "Videojuego", "Accesorios"].map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className={`btn rounded-pill px-4 ${
                activeCategory === cat
                  ? "btn-info text-dark fw-bold"
                  : "btn-outline-info"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {loading && (
        <div className="text-center text-info my-5">Cargando productos...</div>
      )}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && products.length === 0 ? (
        <EmptyProductsState
          title="No encontramos productos"
          message={
            activeCategory
              ? `No hay productos disponibles en la categoría "${activeCategory}".`
              : "Por el momento no hay productos disponibles."
          }
        />
      ) : (
        <>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
            {products.map((product, index) => {
              const cardId = product._id || index;
              const isFavorite = wishlistIds.has(product._id);
              const isHovered = hoveredCard === product._id;
              const isProcessing = wishlistLoading.has(product._id);

              return (
                <div className="col" key={cardId}>
                  <div
                    className="card h-100 border rounded-4 overflow-hidden"
                    style={{
                      backgroundColor: "#1e1b33",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      transform:
                        hoveredCard === cardId
                          ? "translateY(-5px)"
                          : "translateY(0)",
                      boxShadow:
                        hoveredCard === cardId
                          ? "0 10px 20px rgba(0,0,0,0.5)"
                          : "none",
                      cursor: "pointer",
                    }}
                    onClick={() => navigate(`/product/${product._id}`)}
                    onMouseEnter={() => setHoveredCard(cardId)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div
                      className="position-relative p-4 d-flex justify-content-center align-items-center"
                      style={{ backgroundColor: "#25223d", height: "200px" }}
                    >
                      <button
                        onClick={(e) => handleWishlistToggle(e, product._id)}
                        disabled={isProcessing}
                        title={
                          isFavorite
                            ? "Quitar de favoritos"
                            : "Añadir a favoritos"
                        }
                        className="btn position-absolute top-0 end-0 m-3 rounded-circle d-flex align-items-center justify-content-center p-0"
                        style={{
                          backgroundColor: "transparent",
                          width: "34px",
                          height: "34px",
                          border: "none",
                          zIndex: 10,
                          opacity: isHovered || isFavorite ? 1 : 0,
                          transform: isHovered ? "scale(1.15)" : "scale(1)",
                          transition:
                            "opacity 0.3s ease, transform 0.2s ease, background-color 0.2s ease",
                          pointerEvents:
                            isHovered || isFavorite ? "auto" : "none",
                          cursor: isProcessing ? "not-allowed" : "pointer",
                        }}
                      >
                        {isProcessing ? (
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
                            fill={isFavorite ? "#F31919" : "transparent"}
                            stroke={isFavorite ? "#F31919" : "white"}
                            strokeWidth="1.2"
                            style={{
                              transition: "fill 0.2s ease, stroke 0.2s ease",
                            }}
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

                    <div
                      className="card-body text-white p-3 d-flex flex-column"
                      style={{ backgroundColor: "#0C062E" }}
                    >
                      <h6 className="mb-2 fw-bold">{product.name}</h6>
                      <p className="text-warning fw-bold mb-1">
                        ${product.price}
                      </p>

                      <div className="text-secondary small mb-3 d-flex align-items-center">
                        <span className="me-1 text-info fs-6">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span key={star}>
                              {star <= Math.round(product.ratingAverage || 0)
                                ? "★ "
                                : "☆ "}
                            </span>
                          ))}
                        </span>
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
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart(product._id);
                          }}
                          className="btn btn-warning flex-grow-1 fw-bold rounded-pill d-flex align-items-center justify-content-center gap-2"
                          style={{
                            backgroundColor: "#e2f54d",
                            fontSize: "0.8rem",
                          }}
                        >
                          Añadir al carrito 🛒
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {!loading && totalPages > 1 && (
            <div className="d-flex justify-content-center align-items-center gap-3 mt-5">
              <button
                className="btn btn-outline-info rounded-pill px-4"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                Anterior
              </button>

              <span className="text-white fw-bold">
                Página {currentPage} de {totalPages}
              </span>

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

export function ProductGrid2() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const handleAddToCart = async (productId: string) => {
    try {
      await addToCart(productId, 1);
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.error(error);
    }
  };

  const [wishlistIds, setWishlistIds] = useState<Set<string>>(new Set());
  const [wishlistLoading, setWishlistLoading] = useState<Set<string>>(
    new Set(),
  );

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const data = await getWishlist();
        const ids = new Set<string>(data.products.map((p: any) => p._id));
        setWishlistIds(ids);
      } catch {
        // Usuario no autenticado
      }
    };
    fetchWishlist();
  }, []);

  const handleWishlistToggle = async (
    e: React.MouseEvent,
    productId: string,
  ) => {
    e.stopPropagation();
    if (wishlistLoading.has(productId)) return;

    setWishlistLoading((prev) => new Set(prev).add(productId));
    try {
      if (wishlistIds.has(productId)) {
        await removeFromWishlist(productId);
        setWishlistIds((prev) => {
          const next = new Set(prev);
          next.delete(productId);
          return next;
        });
      } else {
        await addToWishlist(productId);
        setWishlistIds((prev) => new Set(prev).add(productId));
      }
      window.dispatchEvent(new Event("wishlistUpdated"));
    } catch {
      // Silencioso
    } finally {
      setWishlistLoading((prev) => {
        const next = new Set(prev);
        next.delete(productId);
        return next;
      });
    }
  };

  useEffect(() => {
    const fetchVideojuegos = async () => {
      try {
        setLoading(true);
        const data = await getProducts({ category: ["Nuevo"], limit: 3 });
        setProducts(data.products);
      } catch (err: any) {
        setError("Error al cargar los videojuegos");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchVideojuegos();
  }, []);

  if (loading)
    return (
      <div className="text-center text-info my-5">Cargando destacados...</div>
    );
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (products.length === 0) {
    return (
      <EmptyProductsState
        title="No hay destacados disponibles"
        message="Todavía no encontramos productos destacados en esta categoría."
      />
    );
  }

  const mainProduct = products[0];
  const sideProducts = products.slice(1, 3);

  const WishlistButton = ({ productId }: { productId: string }) => {
    const isFavorite = wishlistIds.has(productId);
    const isHovered = hoveredCard === productId;
    const isProcessing = wishlistLoading.has(productId);

    return (
      <button
        onClick={(e) => handleWishlistToggle(e, productId)}
        disabled={isProcessing}
        title={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
        className="btn position-absolute top-0 end-0 m-3 rounded-circle d-flex align-items-center justify-content-center p-0"
        style={{
          backgroundColor: "transparent",
          width: "34px",
          height: "34px",
          border: "none",
          zIndex: 10,
          opacity: isFavorite || isHovered ? 1 : 0,
          pointerEvents: isFavorite || isHovered ? "auto" : "none",
          transform: isHovered ? "scale(1.15)" : "scale(1)",
          transition: "opacity 0.3s ease, transform 0.2s ease",
          cursor: isProcessing ? "not-allowed" : "pointer",
        }}
      >
        {isProcessing ? (
          <small className="text-white fw-bold" style={{ fontSize: "10px" }}>
            ···
          </small>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 16 16"
            fill={isFavorite ? "#F31919" : "transparent"}
            stroke={isFavorite ? "#F31919" : "white"}
            strokeWidth="1.2"
            style={{ transition: "fill 0.2s ease, stroke 0.2s ease" }}
          >
            <path d="M8 14s-6-3.33-6-8a3.5 3.5 0 0 1 6-2.45A3.5 3.5 0 0 1 14 6c0 4.67-6 8-6 8z" />
          </svg>
        )}
      </button>
    );
  };

  const ActionButtons = ({ productId }: { productId: string }) => (
    <div
      className="d-flex gap-2 mt-auto pt-2"
      style={{
        opacity: hoveredCard === productId ? 1 : 0,
        visibility: hoveredCard === productId ? "visible" : "hidden",
        transition: "opacity 0.3s ease, visibility 0.3s ease",
      }}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleAddToCart(productId);
        }}
        className="btn btn-warning flex-grow-1 fw-bold rounded-pill d-flex align-items-center justify-content-center gap-2"
        style={{ backgroundColor: "#e2f54d", fontSize: "0.8rem" }}
      >
        Añadir al carrito 🛒
      </button>
    </div>
  );

  return (
    <>
      <div className="row align-items-stretch mb-5">
        <div
          className="col-sm-6 mb-3 mb-sm-0"
          style={{ cursor: "pointer" }}
          onMouseEnter={() => setHoveredCard(mainProduct._id)}
          onMouseLeave={() => setHoveredCard(null)}
          onClick={() => navigate(`/product/${mainProduct._id}`)}
        >
          <div className="position-relative h-100">
            <WishlistButton productId={mainProduct._id} />

            <div
              className="row g-0 rounded-4 overflow-hidden h-100 border border-secondary shadow-sm"
              style={{
                transition: "transform 0.3s ease",
                transform:
                  hoveredCard === mainProduct._id ? "translateY(-5px)" : "none",
              }}
            >
              <div className="col-md-4 bg-white d-flex align-items-center p-2">
                <img
                  src={mainProduct.image || "src/assets/placeholder.png"}
                  className="img-fluid w-100"
                  style={{ objectFit: "contain", maxHeight: "250px" }}
                  alt={mainProduct.name}
                />
              </div>

              <div className="col-md-8">
                <div
                  className="card rounded-0 h-100 border-0 text-white p-2"
                  style={{ backgroundColor: "#110f2400" }}
                >
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title fw-bold text-info">
                      {mainProduct.name}
                    </h5>
                    <p
                      className="card-text small text-light flex-grow-1"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {mainProduct.description}
                    </p>
                    <p className="text-warning fw-bold fs-4 mb-2">
                      ${mainProduct.price}
                    </p>

                    <div className="mt-auto">
                      <div className="text-secondary small mb-2">
                        <span className="text-info fs-6">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span key={star}>
                              {star <=
                              Math.round(mainProduct.ratingAverage || 0)
                                ? "★"
                                : "☆"}
                            </span>
                          ))}
                        </span>
                        {mainProduct.ratingCount > 0 && (
                          <span
                            className="text-light ms-1"
                            style={{ fontSize: "0.75rem" }}
                          >
                            ({mainProduct.ratingCount})
                          </span>
                        )}
                      </div>
                      <ActionButtons productId={mainProduct._id} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-6 d-flex gap-4 flex-sm-column">
          {sideProducts.map((product) => (
            <div
              key={product._id}
              className="position-relative flex-grow-1"
              style={{ cursor: "pointer" }}
              onMouseEnter={() => setHoveredCard(product._id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => navigate(`/product/${product._id}`)}
            >
              <WishlistButton productId={product._id} />

              <div
                className="row g-0 rounded-4 overflow-hidden h-100 border border-secondary shadow-sm"
                style={{
                  transition: "transform 0.3s ease",
                  transform:
                    hoveredCard === product._id ? "translateX(5px)" : "none",
                }}
              >
                <div className="col-md-4 bg-white d-flex align-items-center p-2">
                  <img
                    src={product.image || "src/assets/placeholder.png"}
                    className="img-fluid w-100"
                    style={{ objectFit: "contain", maxHeight: "150px" }}
                    alt={product.name}
                  />
                </div>

                <div className="col-md-8">
                  <div className="card rounded-0 h-100 border-0 text-white p-1 bg-transparent">
                    <div className="card-body d-flex flex-column">
                      <h6 className="card-title fw-bold mb-1">
                        {product.name}
                      </h6>
                      <p className="text-warning fw-bold mb-1">
                        ${product.price}
                      </p>
                      <div className="text-secondary small mb-3 d-flex align-items-center">
                        <span className="me-1 text-info fs-6">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span key={star}>
                              {star <= Math.round(product.ratingAverage || 0)
                                ? "★ "
                                : "☆ "}
                            </span>
                          ))}
                        </span>
                        {product.ratingCount > 0 && (
                          <span
                            className="text-light ms-1"
                            style={{ fontSize: "0.75rem" }}
                          >
                            ({product.ratingCount})
                          </span>
                        )}
                      </div>
                      <ActionButtons productId={product._id} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {sideProducts.length < 2 && (
            <div
              className="row g-0 rounded-4 overflow-hidden border border-secondary flex-grow-1 opacity-50"
              style={{ backgroundColor: "#25223d" }}
            >
              <div className="d-flex align-items-center justify-content-center w-100 text-secondary">
                <small>Más productos pronto...</small>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export function ProductGrid3({
  categoria,
  activeFilters = { categories: [], inStock: undefined, minRating: undefined },
  searchQuery = "",
}: {
  categoria: string;
  activeFilters?: {
    categories: string[];
    inStock: boolean | undefined;
    minRating: number | undefined;
  };
  searchQuery?: string;
}) {
  const navigate = useNavigate();

  const [products, setProducts] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hoveredCard, setHoveredCard] = useState<string | number | null>(null);

  const handleAddToCart = async (productId: string) => {
    try {
      await addToCart(productId, 1);
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.error(error);
    }
  };

  const [wishlistIds, setWishlistIds] = useState<Set<string>>(new Set());
  const [wishlistLoading, setWishlistLoading] = useState<Set<string>>(
    new Set(),
  );

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const data = await getWishlist();
        const ids = new Set<string>(data.products.map((p: any) => p._id));
        setWishlistIds(ids);
      } catch {
        // Usuario no autenticado
      }
    };
    fetchWishlist();
  }, []);

  const handleWishlistToggle = async (
    e: React.MouseEvent,
    productId: string,
  ) => {
    e.stopPropagation();
    if (wishlistLoading.has(productId)) return;

    setWishlistLoading((prev) => new Set(prev).add(productId));
    try {
      if (wishlistIds.has(productId)) {
        await removeFromWishlist(productId);
        setWishlistIds((prev) => {
          const next = new Set(prev);
          next.delete(productId);
          return next;
        });
      } else {
        await addToWishlist(productId);
        setWishlistIds((prev) => new Set(prev).add(productId));
      }
      window.dispatchEvent(new Event("wishlistUpdated"));
    } catch {
      // Silencioso
    } finally {
      setWishlistLoading((prev) => {
        const next = new Set(prev);
        next.delete(productId);
        return next;
      });
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [categoria, activeFilters, searchQuery]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        setLoading(true);
        setError("");

        const categoryFromUrl = categoria !== "General" ? [categoria] : [];
        const categoriesFromSidebar = activeFilters.categories;

        const allCategories = [
          ...new Set([...categoryFromUrl, ...categoriesFromSidebar]),
        ];

        const data = await getProducts({
          page: currentPage,
          limit: 12,
          category: allCategories.length > 0 ? allCategories : undefined,
          inStock: activeFilters.inStock,
          minRating: activeFilters.minRating,
          search: searchQuery || undefined,
        });

        setProducts(data.products);
        setCurrentPage(data.pagination.page);
        setTotalPages(data.pagination.pages);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, [currentPage, categoria, activeFilters, searchQuery]);

  return (
    <div className="container-fluid" style={{ minHeight: "100vh" }}>
      {loading && (
        <div className="text-center text-info my-5">Cargando productos...</div>
      )}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && products.length === 0 ? (
        <EmptyProductsState
          title="No encontramos productos"
          message={
            searchQuery
              ? `No hay resultados para "${searchQuery}".`
              : categoria && categoria !== "General"
                ? `No hay productos disponibles en la categoría "${categoria}".`
                : "Por el momento no hay productos disponibles."
          }
        />
      ) : (
        <>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 row-col-lg-5 g-4">
            {products.map((product, index) => {
              const cardId = product._id || index;
              const isFavorite = wishlistIds.has(product._id);
              const isHovered = hoveredCard === product._id;
              const isProcessing = wishlistLoading.has(product._id);
              return (
                <div className="col" key={index}>
                  <div
                    className="card h-100 border rounded-4 overflow-hidden"
                    style={{
                      backgroundColor: "#1e1b33",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      transform:
                        hoveredCard === cardId
                          ? "translateY(-5px)"
                          : "translateY(0)",
                      boxShadow:
                        hoveredCard === cardId
                          ? "0 10px 20px rgba(0,0,0,0.5)"
                          : "none",
                      cursor: "pointer",
                    }}
                    onClick={() => navigate(`/product/${product._id}`)}
                    onMouseEnter={() => setHoveredCard(cardId)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div
                      className="position-relative p-4 d-flex justify-content-center align-items-center"
                      style={{ backgroundColor: "#25223d", height: "200px" }}
                    >
                      <button
                        onClick={(e) => handleWishlistToggle(e, product._id)}
                        disabled={isProcessing}
                        title={
                          isFavorite
                            ? "Quitar de favoritos"
                            : "Añadir a favoritos"
                        }
                        className="btn position-absolute top-0 end-0 m-3 rounded-circle d-flex align-items-center justify-content-center p-0"
                        style={{
                          backgroundColor: "transparent",
                          width: "34px",
                          height: "34px",
                          border: "none",
                          zIndex: 10,
                          opacity: isHovered || isFavorite ? 1 : 0,
                          transform: isHovered ? "scale(1.15)" : "scale(1)",
                          transition:
                            "opacity 0.3s ease, transform 0.2s ease, background-color 0.2s ease",
                          pointerEvents:
                            isHovered || isFavorite ? "auto" : "none",
                          cursor: isProcessing ? "not-allowed" : "pointer",
                        }}
                      >
                        {isProcessing ? (
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
                            fill={isFavorite ? "#F31919" : "transparent"}
                            stroke={isFavorite ? "#F31919" : "white"}
                            strokeWidth="1.2"
                            style={{
                              transition: "fill 0.2s ease, stroke 0.2s ease",
                            }}
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
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart(product._id);
                          }}
                          className="btn btn-warning flex-grow-1 fw-bold rounded-pill d-flex align-items-center justify-content-center gap-2"
                          style={{
                            backgroundColor: "#e2f54d",
                            fontSize: "0.8rem",
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

          {!loading && totalPages > 1 && (
            <div className="d-flex justify-content-center align-items-center gap-3 mt-5">
              <button
                className="btn btn-outline-info rounded-pill px-4"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                Anterior
              </button>

              <span className="text-white fw-bold">
                Página {currentPage} de {totalPages}
              </span>

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
