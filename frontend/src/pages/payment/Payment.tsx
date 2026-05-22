import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../signin/SignIn.css";
import Breadcrumb, { BreadcrumbItem } from "../../components/utils/Breadcrumb";
import { getCart, addToCart } from "../../services/cartService";
import { createOrder } from "../../services/orderService";
import { createSubscription } from "../../services/subscriptionService";

interface CartProduct {
  _id: string;
  name: string;
  price: number;
  image: string;
}

interface CartProductItem {
  productId: CartProduct;
  quantity: number;
}

export default function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { planType?: string; planName?: string; planPrice?: number; planImg?: string; productId?: string; productName?: string; productPrice?: number; productImage?: string; quantity?: number } | undefined;
  const isMembershipPurchase = !!state?.planType;
  const isSingleProductPurchase = !!state?.productId && !isMembershipPurchase;

  const [cartItems, setCartItems] = useState<CartProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const breadcrumbPath: BreadcrumbItem[] = isMembershipPurchase
    ? [
        { name: "Inicio", url: "/" },
        { name: "Membresías", url: "/membership" },
        { name: state.planName!, url: `/membership/${state.planType!.toLowerCase()}` },
        { name: "Pago" },
      ]
    : isSingleProductPurchase
    ? [
        { name: "Inicio", url: "/" },
        { name: "Catálogo", url: "/catalog" },
        { name: state.productName!, url: `/product/${state.productId}` },
        { name: "Pago" },
      ]
    : [
        { name: "Inicio", url: "/" },
        { name: "Carrito de compras", url: "/cart" },
        { name: "Pago" },
      ];

  useEffect(() => {
    if (isMembershipPurchase || isSingleProductPurchase) {
      setLoading(false);
      return;
    }

    const loadCart = async () => {
      try {
        const data = await getCart();
        setCartItems(data.products || []);
        if (!data.products || data.products.length === 0) {
          setError("Tu carrito está vacío. Agrega productos antes de pagar.");
        }
      } catch {
        setError("No se pudo cargar el carrito.");
      } finally {
        setLoading(false);
      }
    };
    loadCart();
  }, [isMembershipPurchase, isSingleProductPurchase]);

  const subtotal = isMembershipPurchase
    ? state.planPrice!
    : isSingleProductPurchase
    ? state.productPrice! * (state.quantity || 1)
    : cartItems.reduce(
        (sum, item) => sum + item.productId.price * item.quantity,
        0
      );
  const shipping = isMembershipPurchase ? 0 : subtotal > 0 ? 26.30 : 0;
  const total = subtotal + shipping;

  const handlePurchase = async () => {
    if (!isMembershipPurchase && !isSingleProductPurchase && cartItems.length === 0) {
      setError("No puedes realizar una compra con el carrito vacío.");
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      if (isMembershipPurchase) {
        await createSubscription(state.planType!);
      } else if (isSingleProductPurchase) {
        await addToCart(state.productId!, state.quantity || 1);
        await createOrder();
      } else {
        await createOrder();
      }
      navigate("/");
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Error al procesar la compra";
      setError(message);
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="container text-white text-center py-5">
        <p>Cargando detalles de compra...</p>
      </div>
    );
  }

  return (
    <>
      <Breadcrumb items={breadcrumbPath}></Breadcrumb>

      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-6 d-flex flex-column p-4 text-white justify-content-center">
            <h1 className="fw-bold mb-4">Detalles de compra</h1>
            <div className="mb-4">
              <label className="form-label text-white mb-1">Nombre(s)</label>
              <input
                type="text"
                className="form-control arcus-input"
                placeholder="¿Cómo te llamas?"
              />
            </div>
            <div className="mb-4">
              <label className="form-label text-white mb-1">Apellido(s)</label>
              <input
                type="text"
                className="form-control arcus-input"
                placeholder="Escribenos tus apellidos"
              />
            </div>
            <div className="mb-4">
              <label className="form-label text-white mb-1">Dirección</label>
              <input
                type="text"
                className="form-control arcus-input"
                placeholder="¿Cual es tu dirección?"
              />
            </div>
            <div className="mb-4">
              <label className="form-label text-white mb-1">
                Casa, apartamento, piso, etc. (opcional)
              </label>
              <input
                type="text"
                className="form-control arcus-input"
                placeholder="¿Donde vives?"
              />
            </div>
            <div className="mb-4">
              <label className="form-label text-white mb-1">Estado</label>
              <input
                type="text"
                className="form-control arcus-input"
                placeholder="¿En qué estado vives? NO, No es estado de la materia"
              />
            </div>
            <div className="mb-4">
              <label className="form-label text-white mb-1">
                Número de telefono
              </label>
              <input
                type="tel"
                className="form-control arcus-input"
                placeholder="Si no, ¿Cómo quieres conocer a Neo?"
              />
            </div>
            <div className="mb-4">
              <label className="form-label text-white mb-1">Correo</label>
              <input
                type="email"
                className="form-control arcus-input"
                placeholder="Tu correo va aquí, ¿Quieres?"
              />
            </div>
            <div className="d-flex justify-content-between align-items-center w-100 mb-5">
              <div className="form-check">
                <input
                  className="form-check-input bg-transparent border border-light"
                  type="checkbox"
                  id="flexCheckDefault"
                  style={{ borderColor: "#FFFFFF", borderWidth: "2px" }}
                />
                <label
                  className="form-check-label text-light fs-6"
                  htmlFor="flexCheckDefault"
                >
                  Guardar informacion para tu próxima compra.
                </label>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-6 d-flex flex-column p-5 text-white justify-content-center">
            <div className="row row-cols-1 text-white gy-4 ps-lg-5">
              <h2 className="fs-4 fw-bold mb-2">
                {isMembershipPurchase ? "Resumen de la membresía" : isSingleProductPurchase ? "Resumen del producto" : "Resumen de la orden"}
              </h2>

              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <div className="col">
                {isMembershipPurchase ? (
                  <div className="d-flex align-items-center justify-content-between py-2">
                    <div className="d-flex align-items-center gap-3">
                      <img
                        src={state.planImg}
                        alt={state.planName}
                        style={{ width: "35px" }}
                      />
                      <p className="mb-0">
                        Membresía {state.planName}
                      </p>
                    </div>
                    <p className="mb-0 fw-bold">
                      ${state.planPrice!.toFixed(2)}/mes
                    </p>
                  </div>
                ) : isSingleProductPurchase ? (
                  <div className="d-flex align-items-center justify-content-between py-2">
                    <div className="d-flex align-items-center gap-3">
                      <img
                        src={state.productImage || "/src/assets/react.svg"}
                        alt={state.productName}
                        style={{ width: "35px" }}
                      />
                      <p className="mb-0">
                        {state.productName} (x{state.quantity})
                      </p>
                    </div>
                    <p className="mb-0 fw-bold">
                      ${(state.productPrice! * state.quantity!).toFixed(2)}
                    </p>
                  </div>
                ) : cartItems.length === 0 ? (
                  <p className="opacity-75">No hay artículos en el carrito.</p>
                ) : (
                  cartItems.map((item) => (
                    <div
                      key={item.productId._id}
                      className="d-flex align-items-center justify-content-between py-2"
                    >
                      <div className="d-flex align-items-center gap-3">
                        <img
                          src={
                            item.productId.image ||
                            "/src/assets/react.svg"
                          }
                          alt={item.productId.name}
                          style={{ width: "35px" }}
                        />
                        <p className="mb-0">
                          {item.productId.name} (x{item.quantity})
                        </p>
                      </div>
                      <p className="mb-0 fw-bold">
                        ${(item.productId.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))
                )}
              </div>

              <div className="col">
                <div className="d-flex justify-content-between align-items-center">
                  <p className="mb-0 opacity-75">Subtotal:</p>
                  <p className="mb-0 fw-bold">${subtotal.toFixed(2)}</p>
                </div>
                <hr className="my-3 opacity-25" />
              </div>

              <div className="col">
                <div className="d-flex justify-content-between align-items-center">
                  <p className="mb-0 opacity-75">Envío:</p>
                  <p className="mb-0 fw-bold">${shipping.toFixed(2)}</p>
                </div>
                <hr className="my-3 opacity-25" />
              </div>

              <div className="col">
                <div className="d-flex justify-content-between align-items-center">
                  <p className="mb-0 fs-5 fw-bold">Total:</p>
                  <p className="mb-0 fs-4 fw-bold text-warning">
                    ${total.toFixed(2)}
                    {isMembershipPurchase && <span className="fs-6 text-white-50 ms-1">/mes</span>}
                  </p>
                </div>
              </div>

              <div className="col pt-2">
                <div className="d-flex flex-column gap-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="form-check">
                      <input
                        className="form-check-input shadow-none"
                        type="radio"
                        name="paymentMethod"
                        id="creditCard"
                        defaultChecked
                        style={{
                          borderColor: "#67B3B5",
                          backgroundColor: "transparent",
                        }}
                      />
                      <label className="form-check-label" htmlFor="creditCard">
                        Tarjeta de Crédito
                      </label>
                    </div>
                    <div className="d-flex gap-2">
                      <img
                        src="/src/assets/Visa.png"
                        alt="visa"
                        style={{ height: "20px" }}
                      />
                      <img
                        src="/src/assets/Mastercard.png"
                        alt="master"
                        style={{ height: "20px" }}
                      />
                    </div>
                  </div>

                  <div className="form-check">
                    <input
                      className="form-input shadow-none form-check-input"
                      type="radio"
                      name="paymentMethod"
                      id="paypal"
                      style={{
                        borderColor: "#67B3B5",
                        backgroundColor: "transparent",
                      }}
                    />
                    <label className="form-check-label" htmlFor="paypal">
                      Paypal
                    </label>
                  </div>
                </div>
              </div>

              <div className="col pt-3">
                <div className="row g-2">
                  <div className="col-8">
                    <input
                      type="text"
                      className="form-control bg-transparent rounded-pill px-4 py-2 border-secondary shadow-none cola"
                      placeholder="Cupón de descuento"
                    />
                  </div>
                  <div className="col-4">
                    <button className="btn btn-warning rounded-pill w-100 fw-bold py-2">
                      Aplicar cupón
                    </button>
                  </div>
                </div>
              </div>

              <div className="col pt-4">
                <button
                  type="button"
                  className="btn w-100 py-3 rounded-4 fw-bold text-white shadow"
                  style={{ backgroundColor: "#1B5A7D", border: "none" }}
                  onClick={handlePurchase}
                  disabled={processing || (!isMembershipPurchase && !isSingleProductPurchase && cartItems.length === 0)}
                >
                  {processing ? "Procesando..." : isMembershipPurchase ? "Pagar membresía" : isSingleProductPurchase ? "Realizar compra" : "Realizar compra"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
