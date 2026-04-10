import { useState, useEffect } from "react";
import { getProducts } from "../../services/productService";
import { useNavigate } from "react-router-dom";
import EmptyProductsState from "../../components/utils/EmptyProductsState";
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "../../services/wishlistService";

//GRID PRINCIPAL DE PRODUCTOS PARA EL LANDING
export default function ProductGrid() {
  //Para navegar
  const navigate = useNavigate();

  // Estados para los productos, carga y errores
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Estados para Paginación y Filtros
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [activeCategory, setActiveCategory] = useState<string>(""); // "" significa que muestra todos

  const [hoveredCard, setHoveredCard] = useState<string | number | null>(null);

  // WISHLIST: Set de IDs para saber qué productos ya están guardados
  const [wishlistIds, setWishlistIds] = useState<Set<string>>(new Set());
  const [wishlistLoading, setWishlistLoading] = useState<Set<string>>(
    new Set(),
  );

  // Carga la wishlist del usuario al montar el componente
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
    e.stopPropagation(); // Evita activar el hover de la card
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

  // Función para cargar los productos con los filtros actuales
  const loadProducts = async () => {
    try {
      setLoading(true);
      setError("");

      // Construimos el objeto de filtros
      const filters: any = {
        page: currentPage,
        limit: 8,
      };

      // Si hay una categoría activa, la enviamos como array
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

  // UseEffect: Se ejecuta al montar el componente y cada vez que cambia la página o la categoría
  useEffect(() => {
    loadProducts();
  }, [currentPage, activeCategory]);

  // Manejador para los botones de filtros rápidos
  const handleCategoryClick = (category: string) => {
    // Si hace clic en la misma categoría, la desactiva
    if (activeCategory === category) {
      setActiveCategory("");
    } else {
      setActiveCategory(category);
    }
    // Siempre que cambiamos de filtro, regresamos a la página 1
    setCurrentPage(1);
  };

  return (
    <div className="container-fluid py-5" style={{ minHeight: "100vh" }}>
      {/* HEADER: Título y Filtros Rápidos */}
      <div className="d-flex justify-content-between align-items-center mb-5 ">
        <h2 className="text-warning fw-bold">Productos populares</h2>

        {/* FILTROS DINÁMICOS */}
        <div className="d-none d-md-flex gap-2">
          {["Consola", "Videojuego", "Accesorios"].map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className={`btn rounded-pill px-4 ${
                activeCategory === cat
                  ? "btn-info text-dark fw-bold" // Estilo activo
                  : "btn-outline-info" // Estilo inactivo
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ESTADOS DE CARGA Y ERROR */}
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
          {/* GRID DE PRODUCTOS */}
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
            {products.map((product, index) => {
              // Identificador único para el hover
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
                      // Pequeño efecto visual extra al hacer hover en toda la tarjeta
                      transform:
                        hoveredCard === cardId
                          ? "translateY(-5px)"
                          : "translateY(0)",
                      boxShadow:
                        hoveredCard === cardId
                          ? "0 10px 20px rgba(0,0,0,0.5)"
                          : "none",
                    }}
                    // 2. EVENTOS: Detectan cuando el ratón entra y sale
                    onMouseEnter={() => setHoveredCard(cardId)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div
                      className="position-relative p-4 d-flex justify-content-center align-items-center"
                      style={{ backgroundColor: "#25223d", height: "200px" }}
                    >
                      {/* BOTÓN DE FAVORITOS*/}
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
                          // 1. Fondo transparente (eliminado el turquesa)
                          backgroundColor: "transparent",
                          width: "34px",
                          height: "34px",
                          border: "none",
                          zIndex: 10,

                          // 2. Lógica de visibilidad (Opacity)
                          // Visible (1) si: está en hover O si ya es favorito. Invisible (0) si no.
                          opacity: isHovered || isFavorite ? 1 : 0,

                          // 3. Efecto de escala solo en hover real (no solo por ser favorito)
                          transform: isHovered ? "scale(1.15)" : "scale(1)",

                          transition:
                            "opacity 0.3s ease, transform 0.2s ease, background-color 0.2s ease",

                          // Evitar clics cuando está invisible (opacity 0)
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
                            // Color de relleno: Rojo si es favorito, transparente si no.
                            fill={isFavorite ? "#F31919" : "transparent"}
                            // Borde: Rojo si es favorito, blanco si no (para que se vea en hover).
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
                        <span className="me-1 text-primary fs-6">
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

                      {/* 3. LÓGICA DE HOVER PARA LOS BOTONES */}
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
                        >
                          Añadir al carrito 🛒
                        </button>
                        <button
                          className="btn btn-warning rounded-3"
                          style={{ backgroundColor: "#e2f54d" }}
                          onClick={() => navigate(`/product/${product._id}`)}
                        >
                          👁️
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {/* CONTROLES DE PAGINACIÓN REALES */}
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
//GRID2 DE PRODUCTOS DEL LANDIG (Proximamente con filtro de "Nuevo")
export function ProductGrid2() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  // Estado para controlar el hover
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  // WISHLIST
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

  // Botón de wishlist reutilizable
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
          // Lógica de visibilidad
          opacity: isFavorite || isHovered ? 1 : 0,
          pointerEvents: isFavorite || isHovered ? "auto" : "none",
          // Escala solo en hover real
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
  // Componente interno para los botones de acción
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
        className="btn btn-warning flex-grow-1 fw-bold rounded-pill d-flex align-items-center justify-content-center gap-2"
        style={{ backgroundColor: "#e2f54d", fontSize: "0.8rem" }}
      >
        Añadir al carrito 🛒
      </button>
      <button
        className="btn btn-warning rounded-3"
        style={{ backgroundColor: "#e2f54d" }}
        onClick={() => navigate(`/product/${productId}`)}
      >
        👁️
      </button>
    </div>
  );

  return (
    <>
      <div className="row align-items-stretch mb-5">
        {/* Sección 1: Producto Principal */}
        <div
          className="col-sm-6 mb-3 mb-sm-0"
          onMouseEnter={() => setHoveredCard(mainProduct._id)}
          onMouseLeave={() => setHoveredCard(null)}
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
              {/* Imagen */}
              <div className="col-md-4 bg-white d-flex align-items-center p-2">
                <img
                  src={mainProduct.image || "src/assets/placeholder.png"}
                  className="img-fluid w-100"
                  style={{ objectFit: "contain", maxHeight: "250px" }}
                  alt={mainProduct.name}
                />
              </div>

              {/* Texto */}
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

                    {/* Estrellas y Botones */}
                    <div className="mt-auto">
                      <div className="text-secondary small mb-2">
                        <span className="text-primary fs-6">
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

        {/* Sección 2: Productos Secundarios */}
        <div className="col-sm-6 d-flex gap-4 flex-sm-column">
          {sideProducts.map((product) => (
            <div
              key={product._id}
              // ✅ position-relative aquí, overflow-hidden eliminado de este nivel
              className="position-relative flex-grow-1"
              onMouseEnter={() => setHoveredCard(product._id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <WishlistButton productId={product._id} />

              <div
                // ✅ overflow-hidden se queda en el row interno, sin afectar al botón
                className="row g-0 rounded-4 overflow-hidden h-100 border border-secondary shadow-sm"
                style={{
                  transition: "transform 0.3s ease",
                  transform:
                    hoveredCard === product._id ? "translateX(5px)" : "none",
                }}
              >
                {/* Imagen */}
                <div className="col-md-4 bg-white d-flex align-items-center p-2">
                  <img
                    src={product.image || "src/assets/placeholder.png"}
                    className="img-fluid w-100"
                    style={{ objectFit: "contain", maxHeight: "150px" }}
                    alt={product.name}
                  />
                </div>

                {/* Texto */}
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
                        <span className="me-1 text-primary fs-6">
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

          {/* Relleno si faltan productos */}
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

//GRID DE PRODUCTOS POR CATALOGO(O CATEGORÍA)
export function ProductGrid3({ categoria }: { categoria: string }) {
  const navigate = useNavigate();

  const [products, setProducts] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hoveredCard, setHoveredCard] = useState<string | number | null>(null);

  // WISHLIST
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
  }, [categoria]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        setLoading(true);
        setError("");

        const filters: any = {
          page: currentPage,
          limit: 12,
        };

        // Solo agregamos el filtro de categoría si NO es "General"
        if (categoria && categoria !== "General") {
          filters.category = [categoria];
        }

        const data = await getProducts(filters);
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
  }, [currentPage, categoria]);

  return (
    <div className="container-fluid" style={{ minHeight: "100vh" }}>
      {/* ESTADOS DE CARGA Y ERROR */}
      {loading && (
        <div className="text-center text-info my-5">Cargando productos...</div>
      )}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && products.length === 0 ? (
        <EmptyProductsState
          title="No encontramos productos"
          message={
            categoria && categoria !== "General"
              ? `No hay productos disponibles en la categoría "${categoria}".`
              : "Por el momento no hay productos disponibles."
          }
        />
      ) : (
        <>
          {/* GRID DE PRODUCTOS */}
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
                      // Pequeño efecto visual extra al hacer hover en toda la tarjeta
                      transform:
                        hoveredCard === cardId
                          ? "translateY(-5px)"
                          : "translateY(0)",
                      boxShadow:
                        hoveredCard === cardId
                          ? "0 10px 20px rgba(0,0,0,0.5)"
                          : "none",
                    }}
                    onMouseEnter={() => setHoveredCard(cardId)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    {/* Parte Superior: Imagen y Heart */}
                    <div
                      className="position-relative p-4 d-flex justify-content-center align-items-center"
                      style={{ backgroundColor: "#25223d", height: "200px" }}
                    >
                      {/* BOTÓN DE FAVORITOS*/}
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
                          // 1. Fondo transparente (eliminado el turquesa)
                          backgroundColor: "transparent",
                          width: "34px",
                          height: "34px",
                          border: "none",
                          zIndex: 10,

                          // 2. Lógica de visibilidad (Opacity)
                          // Visible (1) si: está en hover O si ya es favorito. Invisible (0) si no.
                          opacity: isHovered || isFavorite ? 1 : 0,

                          // 3. Efecto de escala solo en hover real (no solo por ser favorito)
                          transform: isHovered ? "scale(1.15)" : "scale(1)",

                          transition:
                            "opacity 0.3s ease, transform 0.2s ease, background-color 0.2s ease",

                          // Evitar clics cuando está invisible (opacity 0)
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
                            // Color de relleno: Rojo si es favorito, transparente si no.
                            fill={isFavorite ? "#F31919" : "transparent"}
                            // Borde: Rojo si es favorito, blanco si no (para que se vea en hover).
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

                    {/* Parte Inferior: Info */}
                    <div
                      className="card-body text-white p-3"
                      style={{ backgroundColor: "#0C062E" }}
                    >
                      <h6 className="mb-2 fw-bold">{product.name}</h6>
                      <p className="text-warning fw-bold mb-1">
                        ${product.price}
                      </p>
                      <div className="text-secondary small mb-3">
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

                      {/* 3. LÓGICA DE HOVER PARA LOS BOTONES */}
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
                        >
                          Añadir al carrito
                        </button>
                        <button
                          className="btn btn-warning rounded-3"
                          style={{ backgroundColor: "#e2f54d" }}
                          onClick={() => navigate(`/product/${product._id}`)}
                        >
                          👁️
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CONTROLES DE PAGINACIÓN REALES */}
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

//GRID DE PRODUCTOS DEL ADMINISTRADOR (FALTA MOVERLO AQUÍ O NO?)

//GRID DE PRODUCTOS SIMILARES (FALTA MOVERLO AQUÍ)
