import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb, { BreadcrumbItem } from "../../../components/utils/Breadcrumb";
import {
  getSalesByCategory,
  getTopProducts,
  getTopUsers,
  getSubscriptionStats,
} from "../../../services/reportService";

interface SalesByCategory {
  _id: string[];
  totalSales: number;
  totalQuantity: number;
}

interface TopProduct {
  productId: string;
  name: string;
  category: string[];
  totalQuantity: number;
  totalRevenue: number;
}

interface TopUser {
  userId: string;
  username: string;
  email: string;
  totalSpent: number;
  orderCount: number;
}

interface SubscriptionStats {
  byType: { _id: string; count: number }[];
  summary: { active: number; cancelled: number };
}

export default function AdminReports() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [salesByCategory, setSalesByCategory] = useState<SalesByCategory[]>([]);
  const [topProducts, setTopProducts] = useState<TopProduct[]>([]);
  const [topUsers, setTopUsers] = useState<TopUser[]>([]);
  const [subStats, setSubStats] = useState<SubscriptionStats | null>(null);

  const breadcrumbPaths: BreadcrumbItem[] = [
    { name: "Inicio", url: "/" },
    { name: "Administración", url: "/admin" },
    { name: "Reportes" },
  ];

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/signin");
      return;
    }
    const parsed = JSON.parse(storedUser);
    if (parsed.type !== "admin") {
      navigate("/");
      return;
    }
    loadReports();
  }, [navigate]);

  const loadReports = async () => {
    try {
      const [catRes, prodRes, userRes, subRes] = await Promise.all([
        getSalesByCategory(),
        getTopProducts(),
        getTopUsers(),
        getSubscriptionStats(),
      ]);
      setSalesByCategory(catRes);
      setTopProducts(prodRes);
      setTopUsers(userRes);
      setSubStats(subRes);
    } catch {
      setError("Error al cargar los reportes.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container text-white text-center py-5">
        <p>Cargando reportes...</p>
      </div>
    );
  }

  const cardStyle = { backgroundColor: "#1e1b33" };
  const headerStyle = { backgroundColor: "#2D2653" };

  return (
    <>
      <Breadcrumb items={breadcrumbPaths} />

      <div className="container text-white py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="fw-bold">Reportes y estadísticas</h1>
          <button
            className="btn btn-outline-light rounded-pill"
            onClick={() => navigate("/admin")}
          >
            Volver al panel
          </button>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="row g-4">
          {/* Ventas por categoría */}
          <div className="col-lg-6">
            <div className="rounded-4 overflow-hidden h-100" style={cardStyle}>
              <div className="p-3 fw-bold" style={headerStyle}>
                Ventas por categoría
              </div>
              <div className="p-3">
                {salesByCategory.length === 0 ? (
                  <p className="text-white-50">No hay ventas registradas.</p>
                ) : (
                  <table className="table table-dark table-sm mb-0">
                    <thead>
                      <tr>
                        <th>Categoría</th>
                        <th className="text-center">Unidades</th>
                        <th className="text-end">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {salesByCategory.map((row, idx) => (
                        <tr key={idx}>
                          <td>{row._id.join(", ") || "Sin categoría"}</td>
                          <td className="text-center">{row.totalQuantity}</td>
                          <td className="text-end text-warning fw-bold">
                            ${row.totalSales.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>

          {/* Top 5 productos vendidos */}
          <div className="col-lg-6">
            <div className="rounded-4 overflow-hidden h-100" style={cardStyle}>
              <div className="p-3 fw-bold" style={headerStyle}>
                Top 5 productos más vendidos
              </div>
              <div className="p-3">
                {topProducts.length === 0 ? (
                  <p className="text-white-50">No hay productos vendidos.</p>
                ) : (
                  <table className="table table-dark table-sm mb-0">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Producto</th>
                        <th className="text-center">Ventas</th>
                        <th className="text-end">Ingreso</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topProducts.map((row, idx) => (
                        <tr key={row.productId}>
                          <td>{idx + 1}</td>
                          <td>{row.name}</td>
                          <td className="text-center">{row.totalQuantity}</td>
                          <td className="text-end text-warning fw-bold">
                            ${row.totalRevenue.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>

          {/* Usuarios con más compras */}
          <div className="col-lg-6">
            <div className="rounded-4 overflow-hidden h-100" style={cardStyle}>
              <div className="p-3 fw-bold" style={headerStyle}>
                Usuarios con más compras
              </div>
              <div className="p-3">
                {topUsers.length === 0 ? (
                  <p className="text-white-50">No hay compras registradas.</p>
                ) : (
                  <table className="table table-dark table-sm mb-0">
                    <thead>
                      <tr>
                        <th>Usuario</th>
                        <th className="text-center">Órdenes</th>
                        <th className="text-end">Total gastado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topUsers.map((row) => (
                        <tr key={row.userId}>
                          <td>
                            <div>{row.username}</div>
                            <small className="text-white-50">{row.email}</small>
                          </td>
                          <td className="text-center">{row.orderCount}</td>
                          <td className="text-end text-warning fw-bold">
                            ${row.totalSpent.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>

          {/* Membresías más contratadas */}
          <div className="col-lg-6">
            <div className="rounded-4 overflow-hidden h-100" style={cardStyle}>
              <div className="p-3 fw-bold" style={headerStyle}>
                Membresías más contratadas
              </div>
              <div className="p-3">
                {!subStats || subStats.byType.length === 0 ? (
                  <p className="text-white-50">No hay suscripciones activas.</p>
                ) : (
                  <>
                    <table className="table table-dark table-sm mb-3">
                      <thead>
                        <tr>
                          <th>Plan</th>
                          <th className="text-end">Activas</th>
                        </tr>
                      </thead>
                      <tbody>
                        {subStats.byType.map((row) => (
                          <tr key={row._id}>
                            <td className="text-uppercase fw-bold">{row._id}</td>
                            <td className="text-end">{row.count}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="d-flex justify-content-between text-white-50 small border-top border-secondary pt-2">
                      <span>Total activas: {subStats.summary.active}</span>
                      <span>Total canceladas: {subStats.summary.cancelled}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
