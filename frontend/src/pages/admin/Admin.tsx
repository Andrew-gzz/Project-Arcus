import { useState, useEffect } from "react";
import AddProduct from "../../components/modal/Product";
import AddCategory from "../../components/modal/Category";
import Breadcrumb, { BreadcrumbItem } from "../../components/utils/Breadcrumb";
import { getProducts, deleteProduct } from "../../services/productService";
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "../../services/wishlistService";

export default function Admin() {
  // ==============================
  // ESTADOS DE MODALES
  // ==============================

  // Controla la visibilidad del modal de productos
  const [showModal, setShowModal] = useState(false); // PRODUCTOS

  // Controla la visibilidad del modal de categorías
  const [showModal2, setShowModal2] = useState(false); // CATEGORIAS

  // Guarda el ID del producto que se está editando
  // Si es null, el modal se entiende como modo "crear"
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  // ==============================
  // ESTADOS GENERALES DE LA PÁGINA
  // ==============================

  // Lista de productos que se mostrarán en el grid
  const [products, setProducts] = useState<any[]>([]);

  // Controla el estado de carga de productos
  const [loading, setLoading] = useState(true);

  // Guarda mensajes de error al cargar productos
  const [error, setError] = useState("");

  // ==============================
  // ESTADOS DE HOVER Y WISHLIST
  // ==============================

  // Guarda qué tarjeta está en hover para aplicar efectos visuales
  const [hoveredCard, setHoveredCard] = useState<string | number | null>(null);

  // Set con los IDs de productos que están en favoritos
  const [wishlistIds, setWishlistIds] = useState<Set<string>>(new Set());

  // Set con los IDs que están actualmente procesándose
  // para evitar múltiples clics simultáneos
  const [wishlistLoading, setWishlistLoading] = useState<Set<string>>(
    new Set(),
  );

  // ==============================
  // HANDLERS DE MODALES
  // ==============================

  // Abre el modal de producto en modo "crear"
  const handleOpenModal = () => {
    setEditingProductId(null);
    setShowModal(true);
  };

  // Abre el modal de producto en modo "editar"
  // guardando el ID del producto seleccionado
  const handleEditProduct = (productId: string) => {
    setEditingProductId(productId);
    setShowModal(true);
  };

  // Abre el modal de categorías
  const handleOpenModal2 = () => setShowModal2(true);

  // Cierra el modal de productos y limpia el ID de edición
  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProductId(null);
  };

  // Cierra el modal de categorías
  const handleCloseModal2 = () => setShowModal2(false);

  // ==============================
  // ESTADOS DE PAGINACIÓN
  // ==============================

  // Página actual del grid
  const [currentPage, setCurrentPage] = useState(1);

  // Total de páginas devuelto por el backend
  const [totalPages, setTotalPages] = useState(1);

  // Producto pendiente de eliminación
  const [productToDelete, setProductToDelete] = useState<any>(null);

  // Mensaje de éxito tras eliminar
  const [deleteMessage, setDeleteMessage] = useState("");

  // ==============================
  // CALLBACKS DE CONFIRMACIÓN
  // ==============================

  // Se ejecuta cuando el modal de producto confirma una acción
  // Cierra el modal, limpia el modo edición y recarga productos
  const handleConfirmAction = () => {
    setShowModal(false);
    setEditingProductId(null);
    loadProducts();
  };

  // Se ejecuta cuando el modal de categoría confirma una acción
  // Cierra el modal y recarga productos
  const handleConfirmAction2 = () => {
    setShowModal2(false);
    loadProducts();
  };

  // Abre el modal de confirmación para eliminar un producto
  const handleDeleteProduct = (product: any) => {
    setProductToDelete(product);
  };

  // Confirma la eliminación del producto
  const confirmDelete = async () => {
    if (!productToDelete) return;

    try {
      await deleteProduct(productToDelete._id);
      setDeleteMessage(`"${productToDelete.name}" eliminado correctamente.`);
      setProductToDelete(null);
      loadProducts();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error al eliminar el producto";
      setError(msg);
      setProductToDelete(null);
    }
  };

  // ==============================
  // CARGA INICIAL DE WISHLIST
  // ==============================

  // Carga la wishlist del usuario cuando el componente se monta
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const data = await getWishlist();

        // Convertimos la lista de productos favoritos en un Set de IDs
        const ids = new Set<string>(data.products.map((p: any) => p._id));
        setWishlistIds(ids);
      } catch {
        // Si el usuario no está autenticado simplemente no se carga
      }
    };
    fetchWishlist();
  }, []);

  // ==============================
  // TOGGLE DE WISHLIST
  // ==============================

  // Agrega o quita un producto de favoritos
  const handleWishlistToggle = async (
    e: React.MouseEvent,
    productId: string,
  ) => {
    // Evita que el clic afecte al contenedor padre
    e.stopPropagation();

    // Si ese producto ya se está procesando, no hacer nada
    if (wishlistLoading.has(productId)) return;

    // Marcamos el producto como "procesándose"
    setWishlistLoading((prev) => new Set(prev).add(productId));

    try {
      // Si ya existe en favoritos, lo removemos
      if (wishlistIds.has(productId)) {
        await removeFromWishlist(productId);

        setWishlistIds((prev) => {
          const next = new Set(prev);
          next.delete(productId);
          return next;
        });
      } else {
        // Si no existe, lo agregamos
        await addToWishlist(productId);

        setWishlistIds((prev) => new Set(prev).add(productId));
      }

      // Disparamos evento global por si otros componentes escuchan cambios de wishlist
      window.dispatchEvent(new Event("wishlistUpdated"));
    } catch (err) {
      console.error("Error al actualizar favoritos:", err);
    } finally {
      // Quitamos el producto del estado de carga
      setWishlistLoading((prev) => {
        const next = new Set(prev);
        next.delete(productId);
        return next;
      });
    }
  };

  // ==============================
  // CARGA DE PRODUCTOS
  // ==============================

  // Consulta los productos paginados desde el backend
  const loadProducts = async () => {
    try {
      setLoading(true);
      setError("");

      // Filtros enviados al backend
      const filters: any = {
        page: currentPage,
        limit: 8,
      };

      // Llamamos al servicio de productos
      const data = await getProducts(filters);

      // Guardamos la lista de productos y la info de paginación
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

  // Cada vez que cambia la página actual, se vuelven a cargar los productos
  useEffect(() => {
    loadProducts();
  }, [currentPage]);

  // ==============================
  // BREADCRUMB
  // ==============================

  // Rutas mostradas en la navegación superior
  const breadcrumbPaths: BreadcrumbItem[] = [
    { name: "Inicio", url: "/" },
    { name: "Lista de productos" },
  ];

  // ==============================
  // RENDER
  // ==============================

  return (
    <>
      {/* Breadcrumb de navegación */}
      <Breadcrumb items={breadcrumbPaths} />

      <div className="container mb-4">
        <div className="row text-light">
          {/* Título principal */}
          <div className="col-4">
            <h1 className="text-warning">Productos</h1>
          </div>

          {/* Botones para abrir modales */}
          <div className="col-8 d-flex flex-column flex-md-row justify-content-md-end align-items-center gap-3">
            <button
              type="button"
              className="btn bg-danger text-light rounded-pill btn-lg fw-bold"
              onClick={handleOpenModal}
            >
              + Añadir producto
            </button>

            <button
              type="button"
              className="btn bg-danger text-light rounded-pill btn-lg fw-bold"
              onClick={handleOpenModal2}
            >
              + Añadir categoría
            </button>
          </div>

          {/* Subtítulo */}
          <div className="col-12">
            <p className="fs-4">Administra tus productos publicados</p>
          </div>

          {/* Mensaje de error si algo falla */}
          {error && (
            <div className="col-12">
              <div className="alert alert-danger">{error}</div>
            </div>
          )}

          {/* Mensaje de éxito tras eliminar */}
          {deleteMessage && (
            <div className="col-12">
              <div className="alert alert-success">{deleteMessage}</div>
            </div>
          )}

          {/* Grid de productos */}
          <div className="col-12">
            <div className="row g-4">
              {products.map((product, index) => {
                // ID único de la tarjeta
                const cardId = product._id || index;

                // Determina si el producto está en favoritos
                const isFavorite = wishlistIds.has(product._id);

                // Determina si esa tarjeta está en hover
                const isHovered = hoveredCard === product._id;

                // Determina si el botón de wishlist está procesando
                const isProcessing = wishlistLoading.has(product._id);

                return (
                  <div className="col-6 col-lg-3" key={product._id || index}>
                    <div
                      className="card h-100 border border-1 rounded-4 overflow-hidden"
                      style={{
                        backgroundColor: "#1e1b33",
                        transition: "transform 0.3s ease, box-shadow 0.3s ease",

                        // Efecto visual al pasar el mouse sobre la tarjeta
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
                      {/* Parte superior de la tarjeta con imagen */}
                      <div
                        className="position-relative p-4 d-flex justify-content-center align-items-center"
                        style={{
                          backgroundColor: "#25223d",
                          height: "200px",
                        }}
                      >
                        {/* BOTÓN DE FAVORITOS */}
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
                            // Fondo transparente
                            backgroundColor: "transparent",
                            width: "34px",
                            height: "34px",
                            border: "none",
                            zIndex: 10,

                            // Visible si está en hover o si ya es favorito
                            opacity: isHovered || isFavorite ? 1 : 0,

                            // Escala sutil cuando hay hover
                            transform: isHovered ? "scale(1.15)" : "scale(1)",

                            transition:
                              "opacity 0.3s ease, transform 0.2s ease, background-color 0.2s ease",

                            // Evita clic cuando está oculto
                            pointerEvents:
                              isHovered || isFavorite ? "auto" : "none",

                            cursor: isProcessing ? "not-allowed" : "pointer",
                          }}
                        >
                          {/* Si se está procesando, mostrar puntitos */}
                          {isProcessing ? (
                            <small
                              className="text-white fw-bold"
                              style={{ fontSize: "10px" }}
                            >
                              ···
                            </small>
                          ) : (
                            // Si no, mostrar ícono de corazón
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

                        {/* Imagen del producto */}
                        <img
                          src={product.image}
                          alt={product.name}
                          className="img-fluid"
                          style={{ maxHeight: "140px", objectFit: "contain" }}
                        />
                      </div>

                      {/* Parte inferior de la tarjeta con info */}
                      <div
                        className="card-body text-white p-3"
                        style={{ backgroundColor: "#0C062E" }}
                      >
                        <div className="row">
                          {/* Nombre del producto */}
                          <div className="col-8">
                            <h6 className="fw-bold">{product.name}</h6>
                          </div>

                          {/* Categoría y estado de stock */}
                          <div className="col-4 text-end">
                            <h6 className="badge bg-transparent text-wrap border border-warning text-warning rounded-pill">
                              {product.category?.[0]}
                            </h6>

                            <h6 className="badge text-bg-info text-wrap rounded-pill">
                              {product.stock > 0 ? "En stock" : "Agotado"}
                            </h6>
                          </div>

                          {/* Precio */}
                          <p className="text-warning fw-bold ">
                            ${product.price}
                          </p>

                          {/* Calificación promedio */}
                          <div className="small d-flex align-items-center">
                            <span className="me-1 text-primary fs-6">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <span key={star}>
                                  {star <=
                                  Math.round(product.ratingAverage || 0)
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

                          {/* Stock numérico */}
                          <div className="text-secondary small">
                            <p>Stock: {product.stock} unidades</p>
                          </div>

                          {/* Botón editar */}
                          <div className="col-6 text-end">
                            <button
                              type="button"
                              className="btn btn-outline-info d-inline-flex align-items-center gap-2 rounded-pill"
                              onClick={() => handleEditProduct(product._id)}
                            >
                              Editar
                              <img
                                src="src/assets/edit.svg"
                                style={{ width: "16px" }}
                                alt="edit"
                              />
                            </button>
                          </div>

                          {/* Botón eliminar */}
                          <div className="col-6 text-start">
                            <button
                              type="button"
                              className="btn btn-outline-danger d-inline-flex align-items-center gap-2 rounded-pill"
                              onClick={() => handleDeleteProduct(product)}
                            >
                              Eliminar
                              <img
                                src="src/assets/trash.svg"
                                style={{ width: "16px" }}
                                alt="delete"
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Controles de paginación */}
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
      </div>

      {/* Modal de confirmación de eliminación */}
      {productToDelete && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{ backgroundColor: "rgba(0,0,0,0.6)", zIndex: 2000 }}
        >
          <div
            className="rounded-4 p-4"
            style={{ backgroundColor: "#1e1b33", minWidth: "350px" }}
          >
            <h5 className="text-white fw-bold mb-3">Confirmar eliminación</h5>
            <p className="text-white-50 mb-4">
              ¿Estás seguro de que deseas eliminar{" "}
              <strong className="text-warning">"{productToDelete.name}"</strong>?
              Esta acción no se puede deshacer.
            </p>
            <div className="d-flex gap-3 justify-content-end">
              <button
                className="btn btn-outline-light rounded-pill px-4"
                onClick={() => setProductToDelete(null)}
              >
                Cancelar
              </button>
              <button
                className="btn btn-danger rounded-pill px-4"
                onClick={confirmDelete}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de producto */}
      <AddProduct
        show={showModal}
        productId={editingProductId}
        onClose={handleCloseModal}
        onConfirm={handleConfirmAction}
      />

      {/* Modal de categoría */}
      <AddCategory
        show={showModal2}
        onClose={handleCloseModal2}
        onConfirm={handleConfirmAction2}
      />
    </>
  );
}
