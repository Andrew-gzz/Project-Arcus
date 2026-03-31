import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ExtLogIn from "../../components/utils/ExtLogIn";
import { authService } from "../../services/authService";
import "../signin/SignIn.css";

function SignUpPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (
      !form.email ||
      !form.username ||
      !form.password ||
      !form.confirmPassword
    ) {
      setError("Todos los campos son obligatorios");
      return;
    }

    if (form.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      setLoading(true);

      const data = await authService.register({
        email: form.email,
        username: form.username,
        password: form.password,
      });

      setSuccess(`Usuario ${data.user.username} registrado correctamente`);

      // Opcional: guardar token si quieres usarlo aparte de la cookie
      localStorage.setItem("token", data.token);

      // Redirigir después del registro
      setTimeout(() => {
        navigate("/signin");
      }, 1200);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error al registrar usuario");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="container-fluid min-vh-100 d-flex align-items-center justify-content-center p-0 my-4"
      style={{ backgroundColor: "#0C062E" }}
    >
      <div className="container">
        <div className="row g-4 align-items-stretch">
          {/* Left Section */}
          <div className="col-12 col-lg-6 d-flex flex-column p-5 text-white justify-content-center">
            <div className="d-flex align-items-center mb-5">
              <img
                src="/src/assets/logo.png"
                alt="Project Arcus"
                height="40"
                className="me-2"
              />
            </div>

            <h1 className="fw-bold mb-1" style={{ fontSize: "3rem" }}>
              Regístrate
            </h1>
            <p className="text-secondary mb-1">
              Si ya tienes una cuenta registrada
            </p>
            <Link to="/signin" className="text-info text-decoration-none mb-5">
              Inicia sesión aquí
            </Link>

            <form onSubmit={handleSubmit}>
              {/* CORREO */}
              <div className="mb-4">
                <label className="form-label text-white-50 mb-1">Correo</label>
                <input
                  type="email"
                  name="email"
                  className="form-control arcus-input"
                  placeholder="Ingresa tu correo"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>

              {/* Usuario */}
              <div className="mb-4">
                <label className="form-label text-white-50 mb-1">
                  Nombre de Usuario
                </label>
                <input
                  type="text"
                  name="username"
                  className="form-control arcus-input"
                  placeholder="Ingresa tu nombre de perfil"
                  value={form.username}
                  onChange={handleChange}
                />
              </div>

              {/* CONTRASEÑA */}
              <div className="mb-4">
                <label className="form-label text-white-50 mb-1">
                  Contraseña
                </label>
                <input
                  type="password"
                  name="password"
                  className="form-control arcus-input"
                  placeholder="Ingresa la contraseña"
                  value={form.password}
                  onChange={handleChange}
                />
              </div>

              {/* CONFIRMACION DE CONTRASEÑA */}
              <div className="mb-4">
                <label className="form-label text-white-50 mb-1">
                  Confirma tu Contraseña
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  className="form-control arcus-input"
                  placeholder="Ingresa la contraseña"
                  value={form.confirmPassword}
                  onChange={handleChange}
                />
              </div>

              <div className="d-flex justify-content-between align-items-center w-100 mb-4">
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
                    Recordar cuenta
                  </label>
                </div>
                <a
                  href="#"
                  className="text-secondary text-decoration-none fs-6"
                >
                  ¿Olvidaste tu contraseña?
                </a>
              </div>

              {error && (
                <div className="alert alert-danger py-2" role="alert">
                  {error}
                </div>
              )}

              {success && (
                <div className="alert alert-success py-2" role="alert">
                  {success}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn fw-bold w-100 py-3 mb-5 fs-4 rounded-pill border-0"
                style={{ backgroundColor: "#62FBD7", color: "#0C032F" }}
              >
                {loading ? "Registrando..." : "Registrarse"}
              </button>
            </form>

            <ExtLogIn />
          </div>

          {/* Right Section */}
          <div className="col-12 col-lg-6">
            <div
              className="h-100 d-flex flex-column align-items-center justify-content-center p-5 rounded-4 shadow-lg"
              style={{ backgroundColor: "#230751" }}
            >
              <img
                src="/src/assets/Saly-10.png"
                alt="Hero Saly-10 Character"
                className="img-fluid mb-5 p-4"
                style={{ maxHeight: "400px" }}
              />
              <h1
                className="fw-bold mb-0 text-white align-self-lg-start"
                style={{ fontSize: "3rem" }}
              >
                Regístrate
              </h1>
              <p className="text-secondary fs-5 align-self-lg-start">
                para poder realizar compras
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
