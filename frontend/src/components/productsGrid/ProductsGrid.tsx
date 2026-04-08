import { useState, useEffect } from "react";
import { getProducts } from "../../services/productService";
import { useNavigate } from "react-router-dom";

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
          {["Consolas", "Videojuegos", "Accesorios"].map((cat) => (
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

      {/* GRID DE PRODUCTOS */}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
        {products.map((product, index) => {
          // Identificador único para el hover
          const cardId = product._id || index;

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
                  <button
                    className="btn position-absolute top-0 end-0 m-3 rounded-circle d-flex align-items-center justify-content-center"
                    style={{
                      backgroundColor: "#4fd1c5",
                      width: "30px",
                      height: "30px",
                      border: "none",
                    }}
                  >
                    <small>❤️</small>
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
                  <p className="text-warning fw-bold mb-1">${product.price}</p>

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
                        className="text-muted ms-1"
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
                      visibility: hoveredCard === cardId ? "visible" : "hidden",
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
    </div>
  );
}
//GRID2 DE PRODUCTOS DEL LANDIG (Proximamente con filtro de "Nuevo")
export function ProductGrid2() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  // 1. Estado para controlar el hover
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideojuegos = async () => {
      try {
        setLoading(true);
        const data = await getProducts({ category: ["Videojuegos"], limit: 3 });
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
  if (products.length === 0) return null;

  const mainProduct = products[0];
  const sideProducts = products.slice(1, 3);

  // Componente interno para los botones de acción para no repetir código
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
                            {star <= Math.round(mainProduct.ratingAverage || 0)
                              ? "★"
                              : "☆"}
                          </span>
                        ))}
                      </span>
                    </div>
                    <ActionButtons productId={mainProduct._id} />
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
              className="row g-0 rounded-4 overflow-hidden border border-secondary flex-grow-1 shadow-sm"
              onMouseEnter={() => setHoveredCard(product._id)}
              onMouseLeave={() => setHoveredCard(null)}
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
              <div className="col-md-8 ">
                <div className="card rounded-0 h-100 border-0 text-white p-1 bg-transparent">
                  <div className="card-body d-flex flex-column">
                    <h6 className="card-title fw-bold mb-1">{product.name}</h6>
                    <p className="text-warning fw-bold mb-1">
                      ${product.price}
                    </p>
                    <ActionButtons productId={product._id} />
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
      {/* GRID DE PRODUCTOS */}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
        {products.map((product, index) => {
          const cardId = product._id || index;

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
                  <button
                    className="btn position-absolute top-0 end-0 m-3 rounded-circle d-flex align-items-center justify-content-center"
                    style={{
                      backgroundColor: "#4fd1c5",
                      width: "30px",
                      height: "30px",
                      border: "none",
                    }}
                  >
                    <small>❤️</small>
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
                  <p className="text-warning fw-bold mb-1">${product.price}</p>
                  <div className="text-secondary small mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star}>
                        {star <= Math.round(product.ratingAverage || 0)
                          ? "★ "
                          : "☆ "}
                      </span>
                    ))}
                  </div>

                  {/* 3. LÓGICA DE HOVER PARA LOS BOTONES */}
                  <div
                    className="d-flex gap-2 mt-auto pt-2"
                    style={{
                      opacity: hoveredCard === cardId ? 1 : 0,
                      visibility: hoveredCard === cardId ? "visible" : "hidden",
                      transition: "opacity 0.3s ease, visibility 0.3s ease",
                    }}
                  >
                    <button
                      className="btn btn-warning flex-grow-1 fw-bold rounded-pill d-flex align-items-center justify-content-center gap-2"
                      style={{ backgroundColor: "#e2f54d", fontSize: "0.8rem" }}
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
    </div>
  );
}

//GRID DE PRODUCTOS DEL ADMINISTRADOR (FALTA MOVERLO AQUÍ O NO?)

//GRID DE PRODUCTOS SIMILARES (FALTA MOVERLO AQUÍ)
