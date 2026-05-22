import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb, { BreadcrumbItem } from "../../components/utils/Breadcrumb";
import { getMyOrders, cancelOrder } from "../../services/orderService";

interface OrderProduct {
  productId: {
    _id: string;
    name: string;
    image: string;
  };
  quantity: number;
  priceAtPurchase: number;
}

interface OrderData {
  _id: string;
  products: OrderProduct[];
  total: number;
  status: string;
  createdAt: string;
}

const statusLabels: Record<string, string> = {
  pending: "Pendiente",
  processing: "En proceso",
  shipped: "Enviado",
  delivered: "Entregado",
  cancelled: "Cancelado",
};

const statusColors: Record<string, string> = {
  pending: "bg-warning text-dark",
  processing: "bg-info",
  shipped: "bg-primary",
  delivered: "bg-success",
  cancelled: "bg-danger",
};

export default function MyOrders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [orderToCancel, setOrderToCancel] = useState<OrderData | null>(null);

  const breadcrumbPaths: BreadcrumbItem[] = [
    { name: "Inicio", url: "/" },
    { name: "Mis órdenes" },
  ];

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/signin");
      return;
    }
    loadOrders();
  }, [navigate]);

  const loadOrders = async () => {
    try {
      const data = await getMyOrders();
      setOrders(data);
    } catch {
      setError("Error al cargar tus órdenes.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async () => {
    if (!orderToCancel) return;

    try {
      await cancelOrder(orderToCancel._id);
      setMessage(`Orden #${orderToCancel._id.slice(-6)} cancelada correctamente.`);
      setOrderToCancel(null);
      loadOrders();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error al cancelar la orden";
      setError(msg);
      setOrderToCancel(null);
    }
  };

  if (loading) {
    return (
      <div className="container text-white text-center py-5">
        <p>Cargando tus órdenes...</p>
      </div>
    );
  }

  return (
    <>
      <Breadcrumb items={breadcrumbPaths} />

      <div className="container text-white py-5">
        <h1 className="fw-bold mb-4">Mis órdenes</h1>

        {message && (
          <div className="alert alert-success">{message}</div>
        )}
        {error && (
          <div className="alert alert-danger">{error}</div>
        )}

        {orders.length === 0 ? (
          <div
            className="text-center py-5 rounded-4"
            style={{ backgroundColor: "#1e1b33" }}
          >
            <p className="fs-5 mb-3">No tienes órdenes registradas.</p>
            <button
              className="btn btn-warning rounded-pill px-4"
              onClick={() => navigate("/catalog")}
            >
              Ir al catálogo
            </button>
          </div>
        ) : (
          <div className="d-flex flex-column gap-4">
            {orders.map((order) => (
              <div
                key={order._id}
                className="rounded-4 overflow-hidden"
                style={{ backgroundColor: "#1e1b33" }}
              >
                {/* Header de la orden */}
                <div
                  className="d-flex flex-wrap justify-content-between align-items-center p-3 px-4"
                  style={{ backgroundColor: "#2D2653" }}
                >
                  <div className="d-flex flex-wrap gap-3 align-items-center">
                    <span className="fw-bold">
                      Orden #{order._id.slice(-6)}
                    </span>
                    <span className={`badge ${statusColors[order.status]}`}>
                      {statusLabels[order.status] || order.status}
                    </span>
                  </div>
                  <div className="d-flex flex-wrap gap-3 align-items-center">
                    <span className="text-white-50 small">
                      {new Date(order.createdAt).toLocaleDateString("es-MX", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                    <span className="fw-bold text-warning">
                      ${order.total.toFixed(2)}
                    </span>
                    {order.status === "pending" && (
                      <button
                        className="btn btn-sm btn-outline-danger rounded-pill"
                        onClick={() => setOrderToCancel(order)}
                      >
                        Cancelar
                      </button>
                    )}
                  </div>
                </div>

                {/* Productos de la orden */}
                <div className="p-4">
                  {order.products.map((item, idx) => (
                    <div
                      key={idx}
                      className="d-flex align-items-center gap-3 py-3"
                      style={{
                        borderBottom:
                          idx < order.products.length - 1
                            ? "1px solid rgba(255,255,255,0.1)"
                            : "none",
                      }}
                    >
                      <img
                        src={
                          item.productId?.image ||
                          "/src/assets/react.svg"
                        }
                        alt={item.productId?.name || "Producto"}
                        className="rounded"
                        style={{ width: "60px", height: "60px", objectFit: "cover" }}
                      />
                      <div className="flex-grow-1">
                        <p className="mb-0 fw-bold text-warning">
                          {item.productId?.name || "Producto no disponible"}
                        </p>
                        <p className="mb-0 text-white-50 small">
                          Cantidad: {item.quantity}
                        </p>
                      </div>
                      <span className="fw-bold">
                        ${(item.priceAtPurchase * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal de confirmación */}
      {orderToCancel && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{ backgroundColor: "rgba(0,0,0,0.6)", zIndex: 2000 }}
        >
          <div
            className="rounded-4 p-4"
            style={{ backgroundColor: "#1e1b33", minWidth: "350px" }}
          >
            <h5 className="text-white fw-bold mb-3">Confirmar cancelación</h5>
            <p className="text-white-50 mb-4">
              ¿Estás seguro de que deseas cancelar la orden{" "}
              <strong className="text-white">
                #{orderToCancel._id.slice(-6)}
              </strong>
              ? Esta acción restaurará el stock de los productos.
            </p>
            <div className="d-flex gap-3 justify-content-end">
              <button
                className="btn btn-outline-light rounded-pill px-4"
                onClick={() => setOrderToCancel(null)}
              >
                No cancelar
              </button>
              <button
                className="btn btn-danger rounded-pill px-4"
                onClick={handleCancel}
              >
                Sí, cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
