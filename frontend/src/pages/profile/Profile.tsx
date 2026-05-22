import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb, { BreadcrumbItem } from "../../components/utils/Breadcrumb";
import { updateProfile, changePassword } from "../../services/userService";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ username: string; email: string; type: string } | null>(null);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [profileMessage, setProfileMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [profileError, setProfileError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const breadcrumbPaths: BreadcrumbItem[] = [
    { name: "Inicio", url: "/" },
    { name: "Mi perfil" },
  ];

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/signin");
      return;
    }
    const parsed = JSON.parse(storedUser);
    setUser(parsed);
    setUsername(parsed.username);
    setEmail(parsed.email);
  }, [navigate]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileMessage("");
    setProfileError("");

    try {
      const data = await updateProfile({ username, email });
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
      setProfileMessage("Perfil actualizado correctamente.");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error al actualizar el perfil";
      setProfileError(msg);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMessage("");
    setPasswordError("");

    if (newPassword !== confirmPassword) {
      setPasswordError("Las contraseñas nuevas no coinciden.");
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError("La nueva contraseña debe tener al menos 6 caracteres.");
      return;
    }

    try {
      await changePassword(currentPassword, newPassword);
      setPasswordMessage("Contraseña actualizada correctamente.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error al cambiar la contraseña";
      setPasswordError(msg);
    }
  };

  if (!user) {
    return (
      <div className="container text-white text-center py-5">
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <>
      <Breadcrumb items={breadcrumbPaths} />

      <div className="container text-white py-5">
        <h1 className="fw-bold mb-4">Mi perfil</h1>

        <div className="row g-5">
          <div className="col-lg-6">
            <div
              className="p-4 rounded-4"
              style={{ backgroundColor: "#1e1b33" }}
            >
              <h3 className="fw-bold mb-4">Información personal</h3>

              {profileMessage && (
                <div className="alert alert-success">{profileMessage}</div>
              )}
              {profileError && (
                <div className="alert alert-danger">{profileError}</div>
              )}

              <form onSubmit={handleUpdateProfile}>
                <div className="mb-3">
                  <label className="form-label">Username</label>
                  <input
                    type="text"
                    className="form-control arcus-input"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control arcus-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Tipo de cuenta</label>
                  <input
                    type="text"
                    className="form-control arcus-input"
                    value={user.type === "admin" ? "Administrador" : "Cliente"}
                    readOnly
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-warning rounded-pill fw-bold px-4"
                >
                  Guardar cambios
                </button>
              </form>
            </div>
          </div>

          <div className="col-lg-6">
            <div
              className="p-4 rounded-4"
              style={{ backgroundColor: "#1e1b33" }}
            >
              <h3 className="fw-bold mb-4">Cambiar contraseña</h3>

              {passwordMessage && (
                <div className="alert alert-success">{passwordMessage}</div>
              )}
              {passwordError && (
                <div className="alert alert-danger">{passwordError}</div>
              )}

              <form onSubmit={handleChangePassword}>
                <div className="mb-3">
                  <label className="form-label">Contraseña actual</label>
                  <input
                    type="password"
                    className="form-control arcus-input"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Nueva contraseña</label>
                  <input
                    type="password"
                    className="form-control arcus-input"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Confirmar nueva contraseña</label>
                  <input
                    type="password"
                    className="form-control arcus-input"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-warning rounded-pill fw-bold px-4"
                >
                  Cambiar contraseña
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
