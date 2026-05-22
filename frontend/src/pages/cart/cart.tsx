import { Link } from "react-router-dom";
import Breadcrumb, { BreadcrumbItem } from "../../components/utils/Breadcrumb";
import { useState, useEffect } from "react";
import {
  getCart,
  updateCart,
  removeFromCart,
  clearCart
}  from "../../services/cartService";

export default function Cart() {
  const [cart, setCart] = useState<any>(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const data = await getCart();
        setCart(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCart();
  }, []);

  const subtotal = cart?.products?.reduce(
    (acc: number, item: any) =>
      acc + item.productId.price * item.quantity,
    0
  ) || 0;

  const shipping = subtotal > 0 ? 26.30 : 0;

  const total = subtotal + shipping;

  // Colores personalizados solicitados
  const colors = {
    headerTable: "#67B3B5",
    bgTable: "#2D2653",
    summaryHeader: "#1B5A7D",
    btnProceed: "#1B5A7D",
  };
  const breadcrumbPaths: BreadcrumbItem[] = [
    { name: "Inicio", url: "/" },
    { name: "Carrito de compras" },
  ];

  


  return (
    <div className="min-vh-100 text-light pb-5">
      {/* Breadcrumb*/}
      <Breadcrumb items={breadcrumbPaths}></Breadcrumb>

      <div className="container">
        <div className="row g-4">
          {/* SECCIÓN IZQUIERDA: TABLA DE PRODUCTOS */}
          <div className="col-lg-8">
            <div className="table-responsive rounded-4 overflow-hidden">
              <table className="table table-borderless align-middle mb-0 table-dark">
                <thead style={{ backgroundColor: colors.headerTable }}>
                  <tr className="text-dark">
                    <th className="py-3 ps-4">Producto</th>
                    <th className="py-3 text-center">Precio</th>
                    <th className="py-3 text-center">Cantidad</th>
                    <th className="py-3 text-center">Subtotal</th>
                    <th className="py-3"></th>
                  </tr>
                </thead>
                  <tbody
                    style={{ backgroundColor: colors.bgTable }}
                    className="text-white"
                  >
                    {cart?.products?.length > 0 ? (
                      cart.products.map((item: any) => (
                        <tr
                          key={item.productId._id}
                          className="border-bottom border-secondary border-opacity-25"
                        >
                          {/* Producto */}
                          <td className="py-4 ps-4">
                            <div className="d-flex align-items-center gap-3">
                              <img
                                src={item.productId.image || "/src/assets/react.svg"}
                                alt="game"
                                className="rounded"
                                style={{ width: "60px" }}
                              />
                              <div>
                                <p className="mb-0 text-warning fw-bold">
                                  {item.productId.name}
                                </p>
                              </div>
                            </div>
                          </td>

                          {/* Precio */}
                          <td className="text-center fw-bold">
                            $ {item.productId.price}
                          </td>

                          {/* Cantidad */}
                          <td className="text-center">
                            <div
                              className="input-group input-group-sm mx-auto"
                              style={{ width: "100px" }}
                            >
                              <button
                                className="btn btn-outline-light bg-white text-dark"
                                onClick={async () => {
                                  if (item.quantity > 1) {
                                    await updateCart(item.productId._id, item.quantity - 1);
                                    const updated = await getCart();
                                    setCart(updated);
                                  }
                                  window.dispatchEvent(new Event("cartUpdated"));
                                }}
                              >
                                -
                              </button>

                              <input
                                type="text"
                                className="form-control text-center bg-white"
                                value={item.quantity}
                                readOnly
                              />

                              <button
                                className="btn btn-outline-light bg-white text-dark"
                                onClick={async () => {
                                  await updateCart(item.productId._id, item.quantity + 1);
                                  const updated = await getCart();
                                  setCart(updated);
                                  window.dispatchEvent(new Event("cartUpdated"));
                                }}
                              >
                                +
                              </button>
                            </div>
                          </td>

                          {/* Subtotal */}
                          <td className="text-center fw-bold">
                            $ {item.productId.price * item.quantity}
                          </td>

                          {/* Eliminar */}
                          <td className="text-center pe-4">
                            <button
                              className="btn btn-link text-warning fs-5"
                              onClick={async () => {
                                await removeFromCart(item.productId._id);
                                const updated = await getCart();
                                setCart(updated);
                                window.dispatchEvent(new Event("cartUpdated"));
                              }}
                            >
                              ⓧ
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="text-center py-5">
                          Tu carrito está vacío
                        </td>
                      </tr>
                    )}
                  </tbody>
              </table>
            </div>

            {/* Botones inferiores de la tabla */}
            <div className="d-flex justify-content-between mt-4">
              <Link to="/"> 
                <button className="btn btn-warning rounded-pill px-4 py-2 fw-bold text-dark">
                  Seguir comprando
                </button>
              </Link>
              <button className="btn btn-outline-danger rounded-pill px-4 py-2 fw-bold border-2"
                onClick={async () => {
                  try {
                    await clearCart();
                    const updated = await getCart();
                    setCart(updated);
                    window.dispatchEvent(new Event("cartUpdated"));
                  } catch (error) {
                    console.error("Error al vaciar carrito:", error);
                  }
                }}
                >
                Vaciar carrito
              </button>
            </div>
          </div>

          {/* SECCIÓN DERECHA: RESUMEN DE LA ORDEN */}
          <div className="col-lg-4">
            <div className="border border-secondary rounded-3 overflow-hidden h-100 d-flex flex-column">
              <div
                className="py-3 text-center fw-bold text-white"
                style={{ backgroundColor: colors.summaryHeader }}
              >
                Resumen de la orden
              </div>

              <div className="p-4 flex-grow-1">
                <div className="d-flex justify-content-between mb-3 fs-5">
                  <span>Subtotal</span>
                  <span className="fw-bold">$ {subtotal.toFixed(2)}</span>
                </div>

                <hr className="opacity-50" />

                <div className="d-flex justify-content-between mb-3 opacity-75">
                  <span>Envío</span>
                  <span> $ {shipping.toFixed(2)}</span>
                </div>

                <div className="d-flex justify-content-between mb-4">
                  <span>Total estimado</span>
                  <span className="fw-bold">$ {total.toFixed(2)}</span>
                </div>

                <Link to="/payment">
                  <button
                    className="btn w-100 py-3 rounded-pill text-white fw-bold mt-3"
                    style={{ backgroundColor: colors.btnProceed }}
                  >
                    Comprar
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    
  );
}
