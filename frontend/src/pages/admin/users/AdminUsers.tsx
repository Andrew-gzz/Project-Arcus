import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb, { BreadcrumbItem } from "../../../components/utils/Breadcrumb";
import { listUsers, deleteUser } from "../../../services/userService";

interface UserData {
  _id: string;
  username: string;
  email: string;
  type: string;
  createdAt: string;
}

export default function AdminUsers() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [userToDelete, setUserToDelete] = useState<UserData | null>(null);

  const breadcrumbPaths: BreadcrumbItem[] = [
    { name: "Inicio", url: "/" },
    { name: "Administración", url: "/admin" },
    { name: "Usuarios" },
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
    loadUsers();
  }, [navigate]);

  const loadUsers = async () => {
    try {
      const data = await listUsers();
      setUsers(data);
    } catch {
      setError("Error al cargar los usuarios.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!userToDelete) return;

    try {
      await deleteUser(userToDelete._id);
      setMessage(`Usuario "${userToDelete.username}" eliminado correctamente.`);
      setUserToDelete(null);
      loadUsers();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error al eliminar el usuario";
      setError(msg);
      setUserToDelete(null);
    }
  };

  if (loading) {
    return (
      <div className="container text-white text-center py-5">
        <p>Cargando usuarios...</p>
      </div>
    );
  }

  return (
    <>
      <Breadcrumb items={breadcrumbPaths} />

      <div className="container text-white py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="fw-bold">Gestión de usuarios</h1>
          <button
            className="btn btn-outline-light rounded-pill"
            onClick={() => navigate("/admin")}
          >
            Volver al panel
          </button>
        </div>

        {message && (
          <div className="alert alert-success">{message}</div>
        )}
        {error && (
          <div className="alert alert-danger">{error}</div>
        )}

        <div
          className="rounded-4 overflow-hidden"
          style={{ backgroundColor: "#1e1b33" }}
        >
          <div className="table-responsive">
            <table className="table table-dark table-hover mb-0">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Tipo</th>
                  <th>Fecha de registro</th>
                  <th className="text-end">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-4">
                      No hay usuarios registrados.
                    </td>
                  </tr>
                ) : (
                  users.map((u) => (
                    <tr key={u._id}>
                      <td>{u.username}</td>
                      <td>{u.email}</td>
                      <td>
                        <span
                          className={`badge ${u.type === "admin" ? "bg-danger" : "bg-info text-dark"}`}
                        >
                          {u.type === "admin" ? "Admin" : "Cliente"}
                        </span>
                      </td>
                      <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                      <td className="text-end">
                        <button
                          className="btn btn-sm btn-outline-danger rounded-pill"
                          onClick={() => setUserToDelete(u)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {userToDelete && (
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
              ¿Estás seguro de que deseas eliminar al usuario{" "}
              <strong className="text-white">"{userToDelete.username}"</strong>?
              Esta acción no se puede deshacer.
            </p>
            <div className="d-flex gap-3 justify-content-end">
              <button
                className="btn btn-outline-light rounded-pill px-4"
                onClick={() => setUserToDelete(null)}
              >
                Cancelar
              </button>
              <button
                className="btn btn-danger rounded-pill px-4"
                onClick={handleDelete}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
