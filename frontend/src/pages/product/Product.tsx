// frontend/src/pages/Product.tsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById, getProducts } from "../../services/productService";
import { useNavigate } from "react-router-dom";

export default function Product() {
  const { id } = useParams(); // Obtenemos el ID de la URL
  //Para navegar
  const navigate = useNavigate();
  const [product, setProduct] = useState<any>(null);
  const [products, setProduct2] = useState<any[]>([]); //Para productos relacionados
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [hoveredCard, setHoveredCard] = useState<string | number | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        if (id) {
          const data = await getProductById(id);
          setProduct(data);
          if (data && data.category) {
            const filters: any = {
              page: 1,
              limit: 4,
              category: data.category[0],
            };

            const data2 = await getProducts(filters);
            setProduct2(data2.products);
          }
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading)
    return (
      <div className="text-center py-5 text-white">Cargando producto...</div>
    );
  if (error || !product)
    return (
      <div className="alert alert-danger m-5">
        {error || "Producto no encontrado"}
      </div>
    );

  return (
    <div className="min-vh-100 text-light pb-5">
      {/* Breadcrumb */}
      <nav className="container py-4" aria-label="breadcrumb">
        <ol className="breadcrumb mb-0">
          <li className="breadcrumb-item">
            <Link
              to="/"
              className="text-warning text-decoration-none opacity-75"
            >
              Inicio
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link
              to="/catalog"
              className="text-warning text-decoration-none opacity-75"
            >
              Catálogo de {product.category[0]}
            </Link>
          </li>
          <li
            className="breadcrumb-item active text-warning"
            aria-current="page"
          >
            {product.name}
          </li>
        </ol>
      </nav>

      <div className="container">
        {/*PRODUCTO*/}
        <div className="row g-5">
          {/* SECCIÓN IZQUIERDA: IMÁGEN PRINCIPAL */}
          <div className="col-lg-6 d-flex flex-column">
            <div
              className="p-4 d-flex justify-content-center align-items-center mb-3 rounded-4 border"
              style={{ backgroundColor: "#2D284A" }}
            >
              <img
                src={product.image || "/placeholder-product.png"}
                alt={product.name}
                className="img-fluid rounded-3"
                style={{
                  maxHeight: "450px",
                  objectFit: "contain",
                }}
              />
            </div>
          </div>

          {/* SECCIÓN DERECHA: INFORMACIÓN */}
          <div className="col-lg-6">
            <h1 className="fw-bold mb-2 text-light">{product.name}</h1>
            <h2 className="text-warning fw-bold mb-4">
              ${product.price.toLocaleString()}
            </h2>
            {/* LÓGICA DE ESTRELLAS DINÁMICAS */}
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

            <div className="mb-4">
              <div className="d-flex flex-wrap gap-2">
                {product.category?.map((cat: string, index: number) => (
                  <span
                    key={index}
                    className="badge bg-info text-dark p-2 px-3 rounded-pill"
                  >
                    {cat}
                  </span>
                ))}
                <span
                  className={`badge ${product.stock > 0 ? "bg-success" : "bg-danger"} p-2 px-3 rounded-pill`}
                >
                  {product.stock > 0 ? `Stock: ${product.stock}` : "Agotado"}
                </span>
              </div>
            </div>
            <div className="mb-4">
              <h5 className="text-secondary">Descripción</h5>
              <p className="lead">{product.description}</p>
            </div>

            <hr className="opacity-25" />

            {/* Selectores */}

            <div className="d-flex align-items-center gap-3 mb-4">
              <span className="fw-bold">Cantidad:</span>
              <div className="input-group" style={{ width: "120px" }}>
                <button className="btn btn-light btn-sm">-</button>
                <input
                  type="text"
                  className="form-control form-control-sm text-center fw-bold"
                  defaultValue="1"
                />
                <button className="btn btn-light btn-sm">+</button>
              </div>
            </div>

            {/* Botones de Acción */}
            <div className="d-grid gap-3 d-md-flex mt-5">
              <button className="btn btn-danger py-3 px-4 flex-grow-1 rounded-pill">
                Añadir al carrito
              </button>
              <button className="btn btn-danger py-3 px-4 flex-grow-1 rounded-pill">
                Comprar ahora
              </button>
              <button
                className="btn btn-light rounded-circle p-3 d-flex align-items-center justify-content-center"
                style={{ width: "55px", height: "55px" }}
              >
                <i className="bi bi-heart"></i> ♡
              </button>
            </div>

            <hr className="opacity-25" />

            {/* Metadatos */}
            <div className="small opacity-75">
              <p className="mb-2">
                <strong>Referencia:</strong>
                <span className="text-secondary mb-2"> {product._id}</span>
              </p>
              <p className="mb-2">
                <strong>Categoría:</strong>
                <span className="text-secondary">
                  {" "}
                  {product.category?.join(", ")}
                </span>
              </p>
              <div className="mb-2">
                <strong>Compartir:</strong>
                <i className="bi bi-link-45deg cursor-pointer">🔗</i>
              </div>
            </div>
          </div>
        </div>

        {/*//////////////////PRODUCTOS RELACIONADOS///////////////////// */}

        <h2 className=" my-4 mx-1 text-warning">Artículos relacionados</h2>
        {/* Sección de productos relacionados */}
        <div className="row g-4">
          {products.map(
            (
              relatedProduct, // Cambié el nombre a relatedProduct para evitar confusión con el producto principal
            ) => (
              <div
                key={relatedProduct._id}
                className="col-12 col-sm-6 col-lg-3"
                onMouseEnter={() => setHoveredCard(relatedProduct._id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div
                  className="card h-100 border shadow-sm overflow-hidden rounded-4 bg-transparent"
                  style={{
                    transition: "transform 0.3s ease",
                  }}
                >
                  {/* Parte Superior: Imagen */}
                  <div
                    className="position-relative d-flex justify-content-center align-items-center"
                    style={{ backgroundColor: "#2D284A", height: "200px" }}
                  >
                    <img
                      src={relatedProduct.image || "/placeholder-product.png"} // Corregido de .img a .image
                      alt={relatedProduct.name}
                      className="img-fluid"
                      style={{ maxHeight: "140px", objectFit: "contain" }}
                    />
                  </div>

                  {/* Parte Inferior: Info */}
                  <div className="card-body text-white p-3 d-flex flex-column">
                    <h6 className="mb-2 fw-bold">{relatedProduct.name}</h6>
                    <p className="text-warning fw-bold mb-1">
                      ${relatedProduct.price}
                    </p>

                    {/* Estrellas */}
                    <div className="text-secondary small mb-3">
                      <span className="text-primary fs-6">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span key={star}>
                            {star <=
                            Math.round(relatedProduct.ratingAverage || 0)
                              ? "★"
                              : "☆"}
                          </span>
                        ))}
                      </span>
                    </div>

                    {/* BOTONES CON HOVER CORREGIDO */}
                    <div
                      className="d-flex gap-2 mt-auto pt-2"
                      style={{
                        opacity: hoveredCard === relatedProduct._id ? 1 : 0, // Eliminado el "|| index"
                        visibility:
                          hoveredCard === relatedProduct._id
                            ? "visible"
                            : "hidden",
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
                        onClick={() =>
                          navigate(`/product/${relatedProduct._id}`)
                        }
                      >
                        👁️
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
}
