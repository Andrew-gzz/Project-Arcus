import { useState, useEffect } from "react";
import AddProduct from "../../components/modal/Product";
import AddCategory from "../../components/modal/Category";
import Breadcrumb, { BreadcrumbItem } from "../../components/utils/Breadcrumb";
import { getProducts } from "../../services/productService";

export default function Admin() {
  // MODALES
  const [showModal, setShowModal] = useState(false); // PRODUCTOS
  const [showModal2, setShowModal2] = useState(false); // CATEGORIAS
  // Producto en edición
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  // Estados para los productos, carga y errores
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ABRIR MODAL EN MODO CREAR
  const handleOpenModal = () => {
    setEditingProductId(null);
    setShowModal(true);
  };

  // ABRIR MODAL EN MODO EDITAR
  const handleEditProduct = (productId: string) => {
    setEditingProductId(productId);
    setShowModal(true);
  };

  const handleOpenModal2 = () => setShowModal2(true);

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProductId(null);
  };

  const handleCloseModal2 = () => setShowModal2(false);

  // Estados para Paginación y Filtros
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleConfirmAction = () => {
    setShowModal(false);
    setEditingProductId(null);
    loadProducts();
  };

  const handleConfirmAction2 = () => {
    setShowModal2(false);
    loadProducts();
  };

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const filters: any = {
        page: currentPage,
        limit: 12,
      };

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
  }, [currentPage]);

  const breadcrumbPaths: BreadcrumbItem[] = [
    { name: "Inicio", url: "/" },
    { name: "Lista de productos" },
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbPaths} />

      <div className="container mb-4">
        <div className="row text-light">
          <div className="col-4">
            <h1 className="text-warning">Productos</h1>
          </div>

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

          <div className="col-12">
            <p className="fs-4">Administra tus productos publicados</p>
          </div>

          {error && (
            <div className="col-12">
              <div className="alert alert-danger">{error}</div>
            </div>
          )}

          <div className="col-12">
            <div className="row g-4">
              {products.map((product, index) => (
                <div className="col-6 col-lg-3" key={product._id || index}>
                  <div
                    className="card h-100 border border-1 rounded-4 overflow-hidden"
                    style={{ backgroundColor: "#1e1b33" }}
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
                      className="card-body text-white p-3"
                      style={{ backgroundColor: "#0C062E" }}
                    >
                      <div className="row">
                        <div className="col-8">
                          <h6 className="fw-bold">{product.name}</h6>
                        </div>

                        <div className="col-4 text-end">
                          <h6 className="badge bg-transparent text-wrap border border-warning text-warning rounded-pill">
                            {product.category?.[0]}
                          </h6>

                          <h6 className="badge text-bg-info text-wrap rounded-pill">
                            {product.stock > 0 ? "En stock" : "Agotado"}
                          </h6>
                        </div>

                        <div className="col-12">
                          <p className="text-warning fw-bold">
                            ${product.price}
                          </p>
                        </div>

                        <div className="text-secondary small">
                          <p>Stock: {product.stock} unidades</p>
                        </div>

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

                        <div className="col-6 text-start">
                          <button
                            type="button"
                            className="btn btn-outline-danger d-inline-flex align-items-center gap-2 rounded-pill"
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
              ))}
            </div>
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
        </div>
      </div>

      <AddProduct
        show={showModal}
        productId={editingProductId}
        onClose={handleCloseModal}
        onConfirm={handleConfirmAction}
      />

      <AddCategory
        show={showModal2}
        onClose={handleCloseModal2}
        onConfirm={handleConfirmAction2}
      />
    </>
  );
}
