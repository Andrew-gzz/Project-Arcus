// frontend/src/pages/Product.tsx

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getProductById,
  getProducts,
  rateProduct,
} from "../../services/productService";
import { getCategories } from "../../services/categoryService";
import { OfferCard } from "../../components/utils/BonCard";
import RatingModal from "../../components/modal/RatingModal";
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "../../services/wishlistService";
import Breadcrumb, { BreadcrumbItem } from "../../components/utils/Breadcrumb";
import { addToCart } from "../../services/cartService";

export default function Product() {
  // Obtenemos el ID del producto desde la URL
  const { id } = useParams();

  // Hook para navegación programática
  const navigate = useNavigate();

  // Estado del producto principal
  const [product, setProduct] = useState<any>(null);

  // Estado de productos relacionados
  const [products, setProduct2] = useState<any[]>([]);

  // Estados generales de UI
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [hoveredCard, setHoveredCard] = useState<string | number | null>(null);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // CART: Set de IDs para saber qué productos están en el carrito 
  const handleAddToCart = async (productId: string, qty: number) => {
    try {
      await addToCart(productId, qty);

      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.error(error);
    }
  };
  // Estado de wishlist:
  // - wishlistIds guarda los IDs de productos favoritos del usuario
  // - wishlistLoading guarda temporalmente los IDs que se están procesando
  const [wishlistIds, setWishlistIds] = useState<Set<string>>(new Set());
  const [wishlistLoading, setWishlistLoading] = useState<Set<string>>(
    new Set(),
  );

  // Guarda el _id real de la categoría principal para poder construir el breadcrumb
  const [mainCategoryId, setMainCategoryId] = useState("");

  // Obtiene el nombre de la categoría principal del producto
  // Si todavía no existe product o no tiene categorías, usa "General"
  const mainCategory = product?.category?.[0] || "General";

  // Carga la wishlist del usuario al montar el componente
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const data = await getWishlist();
        const ids = new Set<string>(data.products.map((p: any) => p._id));
        setWishlistIds(ids);
      } catch {
        // Si el usuario no está autenticado simplemente no se carga la wishlist
      }
    };

    fetchWishlist();
  }, []);

  // Maneja agregar o quitar un producto de la wishlist
  const handleWishlistToggle = async (
    e: React.MouseEvent,
    productId: string,
  ) => {
    e.stopPropagation(); // Evita propagar el clic al contenedor padre

    // Si ese producto ya se está procesando, no volvemos a ejecutar
    if (wishlistLoading.has(productId)) return;

    // Marcamos temporalmente el producto como "en proceso"
    setWishlistLoading((prev) => new Set(prev).add(productId));

    try {
      // Si ya es favorito, lo quitamos
      if (wishlistIds.has(productId)) {
        await removeFromWishlist(productId);

        setWishlistIds((prev) => {
          const next = new Set(prev);
          next.delete(productId);
          return next;
        });
      } else {
        // Si no es favorito, lo agregamos
        await addToWishlist(productId);

        setWishlistIds((prev) => new Set(prev).add(productId));
      }

      // Disparamos evento global por si otro componente escucha cambios en wishlist
      window.dispatchEvent(new Event("wishlistUpdated"));
    } catch (err) {
      console.error("Error al actualizar favoritos:", err);
    } finally {
      // Quitamos el producto del set de "en proceso"
      setWishlistLoading((prev) => {
        const next = new Set(prev);
        next.delete(productId);
        return next;
      });
    }
  };

  // Maneja el envío de calificación del producto
  const handleRatingSubmit = async (rating: number, comment: string) => {
    try {
      if (!id) return;

      // Envía la calificación al backend
      await rateProduct(id, { rating, comment });

      // Refresca el producto para que se actualicen ratingAverage y ratingCount
      const updatedProduct = await getProductById(id);
      setProduct(updatedProduct);
    } catch (err: any) {
      // Si el usuario no está logueado o ya calificó, se muestra el error
      alert(err.message);
    }
  };

  // Carga el producto principal y sus relacionados
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        if (id) {
          // 1. Obtenemos el producto principal
          const data = await getProductById(id);
          setProduct(data);

          // 2. Si el producto tiene categoría, buscamos relacionados usando la primera
          if (data && data.category) {
            const filters: any = {
              page: 1,
              limit: 4,
              category: [data.category[0]],
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

  // Resuelve el _id de la categoría principal a partir del nombre
  // Esto se usa para armar correctamente la URL del breadcrumb
  useEffect(() => {
    const fetchMainCategoryId = async () => {
      try {
        // Si todavía no existe una categoría principal, no hacemos nada
        if (!product?.category?.[0]) return;

        // Traemos las categorías y buscamos la que coincida por nombre
        const categories = await getCategories();
        const matchedCategory = categories.find(
          (cat: any) => cat.name === product.category[0],
        );

        // Guardamos el _id encontrado, o string vacío si no hubo match
        setMainCategoryId(matchedCategory?._id || "");
      } catch (error) {
        console.error("Error al resolver el ID de la categoría:", error);
      }
    };

    fetchMainCategoryId();
  }, [product]);

  // Estado de carga general del producto
  if (loading)
    return (
      <div className="text-center py-5 text-white">Cargando producto...</div>
    );

  // Estado de error o producto no encontrado
  if (error || !product)
    return (
      <div className="alert alert-danger m-5">
        {error || "Producto no encontrado"}
      </div>
    );

  // Estas variables ya se calculan aquí, cuando product ya existe
  const isFavorite = wishlistIds.has(product._id);
  const isProcessing = wishlistLoading.has(product._id);

  // Breadcrumb dinámico:
  // Inicio > Categoría principal > Nombre del producto
  const breadcrumbPaths: BreadcrumbItem[] = [
    { name: "Inicio", url: "/" },
    {
      name: `Catálogo de ${mainCategory}`,
      url: mainCategoryId ? `/catalog/${mainCategory}` : "/catalog",
    },
    { name: product.name || "Producto" },
  ];

  return (
    <div className="min-vh-100 text-light pb-5">
      {/* Breadcrumb de navegación */}
      <Breadcrumb items={breadcrumbPaths} />

      <div className="container">
        {/* PRODUCTO PRINCIPAL */}
        <div className="row g-5">
          {/* SECCIÓN IZQUIERDA: IMAGEN PRINCIPAL */}
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

          {/* SECCIÓN DERECHA: INFORMACIÓN DEL PRODUCTO */}
          <div className="col-lg-6">
            <h1 className="fw-bold mb-2 text-light">{product.name}</h1>

            <h2 className="text-warning fw-bold mb-4">
              ${product.price.toLocaleString()}
            </h2>

            {/* BLOQUE DE ESTRELLAS Y BOTÓN DE CALIFICAR */}
            <div className="text-secondary small mb-3 d-flex align-items-center row-cols-2">
              <div className="col-8">
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

              <div className="col-4 text-end">
                <button
                  className="btn btn-warning rounded-pill fw-bold px-4 py-2"
                  onClick={() => setShowRatingModal(true)}
                >
                  Calificar
                </button>
              </div>
            </div>

            {/* BADGES DE CATEGORÍAS Y STOCK */}
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

            {/* DESCRIPCIÓN */}
            <div className="mb-4">
              <h5 className="text-secondary">Descripción</h5>
              <p className="lead">{product.description}</p>
            </div>

            <hr className="opacity-25" />

            {/* SELECTOR DE CANTIDAD */}
            <div className="d-flex align-items-center gap-3 mb-4">
              <span className="fw-bold">Cantidad:</span>
              <div className="input-group" style={{ width: "120px" }}>
                <button className="btn btn-light btn-sm" onClick={() => setQuantity(Math.max(1, quantity - 1))}> - </button>
                <input
                  type="text"
                  className="form-control form-control-sm text-center fw-bold"
                  value={quantity}
                  readOnly
                />
                <button className="btn btn-light btn-sm" onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
            </div>

            {/* BOTONES DE ACCIÓN */}
            <div className="d-grid gap-3 d-md-flex mt-5">
              <button
                className="btn btn-danger py-3 px-4 flex-grow-1 rounded-pill"
                onClick={() => handleAddToCart(product._id, quantity)}
              >
                Añadir al carrito
              </button>
              
              <button
                className="btn btn-danger py-3 px-4 flex-grow-1 rounded-pill"
                onClick={() => navigate("/payment", { state: { productId: product._id, productName: product.name, productPrice: product.price, productImage: product.image, quantity } })}
              >
                Comprar ahora
              </button>


              {/* BOTÓN DE FAVORITOS EN LA VISTA PRINCIPAL */}
              <button
                onClick={(e) => handleWishlistToggle(e, product._id)}
                disabled={isProcessing}
                title={
                  isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"
                }
                className="btn border border-secondary rounded-circle d-flex align-items-center justify-content-center p-0 flex-shrink-0"
                style={{
                  backgroundColor: "transparent",
                  width: "56px",
                  height: "56px",
                  opacity: 1,
                  pointerEvents: "auto",
                  transition: "transform 0.1s ease",
                  cursor: isProcessing ? "not-allowed" : "pointer",
                }}
                onMouseDown={(e) =>
                  (e.currentTarget.style.transform = "scale(0.9)")
                }
                onMouseUp={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                {isProcessing ? (
                  <small className="text-white fw-bold">···</small>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="26"
                    height="26"
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
            </div>

            <hr className="opacity-25" />

            {/* METADATOS */}
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
                <i className="bi bi-link-45deg cursor-pointer"></i>
              </div>
            </div>
          </div>
        </div>

        {/* PRODUCTOS RELACIONADOS */}
        <h2 className=" my-4 mx-1 text-warning">Artículos relacionados</h2>

        <div className="row g-4">
          {products.map((relatedProduct) => {
            return (
              <div
                key={relatedProduct._id}
                className="col-12 col-sm-6 col-lg-3"
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/product/${relatedProduct._id}`)}
                onMouseEnter={() => setHoveredCard(relatedProduct._id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div
                  className="card h-100 border shadow-sm overflow-hidden rounded-4 bg-transparent"
                  style={{
                    transition: "transform 0.3s ease",
                  }}
                >
                  <div
                    className="position-relative d-flex justify-content-center align-items-center"
                    style={{ backgroundColor: "#2D284A", height: "200px" }}
                  >
                    <img
                      src={relatedProduct.image || "/placeholder-product.png"}
                      alt={relatedProduct.name}
                      className="img-fluid"
                      style={{ maxHeight: "140px", objectFit: "contain" }}
                    />
                  </div>

                  <div className="card-body text-white p-3 d-flex flex-column">
                    <h6 className="mb-2 fw-bold">{relatedProduct.name}</h6>

                    <p className="text-warning fw-bold mb-1">
                      ${relatedProduct.price}
                    </p>

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

                      {relatedProduct.ratingCount > 0 && (
                        <span
                          className="text-light ms-1"
                          style={{ fontSize: "0.75rem" }}
                        >
                          ({relatedProduct.ratingCount})
                        </span>
                      )}
                    </div>

                    <div
                      className="d-flex gap-2 mt-auto pt-2"
                      style={{
                        opacity: hoveredCard === relatedProduct._id ? 1 : 0,
                        visibility:
                          hoveredCard === relatedProduct._id
                            ? "visible"
                            : "hidden",
                        transition: "opacity 0.3s ease, visibility 0.3s ease",
                      }}
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(relatedProduct._id, 1);
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

        {/* OFERTAS */}
        <OfferCard></OfferCard>

        {/* MODAL DE CALIFICACIÓN */}
        <RatingModal
          show={showRatingModal}
          onClose={() => setShowRatingModal(false)}
          onSubmit={handleRatingSubmit}
          productName={product?.name || "este producto"}
        />
      </div>
    </div>
  );
}
