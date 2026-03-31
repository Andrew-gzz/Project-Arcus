import ExtLogIn from "../../components/utils/ExtLogIn";
import "./SignIn.css";
import { Link } from "react-router-dom";

function SignInPage() {
  return (
    <div
      className="container-fluid min-vh-100 d-flex align-items-center justify-content-center p-0"
      style={{ backgroundColor: "#0C032F" }}
    >
      <div className="container">
        <div className="row g-4 align-items-stretch">
          {/* Left Section */}
          <div className="col-12 col-lg-6 d-flex flex-column p-5 text-white justify-content-center">
            <div className="d-flex align-items-center mb-5">
              <img
                src="src/assets/logo.png"
                alt="Project Arcus"
                height="40"
                className="me-2"
              />
            </div>

            <h1 className="fw-bold mb-1" style={{ fontSize: "3rem" }}>
              Inicio de sesión
            </h1>
            <p className="text-secondary mb-1">
              Si no tienes una cuenta para ingresar
            </p>
            <Link to="/signup" className="text-info text-decoration-none mb-5">
              Regístrate aquí
            </Link>

            {/* CORREO */}
            <div className="mb-4">
              <label className="form-label text-white-50 mb-1">Correo</label>
              <input
                type="email"
                className="form-control arcus-input"
                placeholder="Ingresa tu correo"
              />
            </div>

            {/* CONTRASEÑA */}
            <div className="mb-4">
              <label className="form-label text-white-50 mb-1">
                Contraseña
              </label>
              <input
                type="password"
                className="form-control arcus-input"
                placeholder="Ingresa la contraseña"
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
                  Recordar cuenta
                </label>
              </div>
              <a href="#" className="text-secondary text-decoration-none fs-6">
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <button
              type="button"
              className="btn fw-bold w-100 py-3 mb-5 fs-4 rounded-pill border-0"
              style={{ backgroundColor: "#62FBD7", color: "#0C032F" }}
            >
              Iniciar sesión
            </button>
            <ExtLogIn />
          </div>

          {/* Right Section */}
          <div className="col-12 col-lg-6">
            <div
              className="h-100 d-flex flex-column align-items-center justify-content-center p-5 rounded-4 shadow-lg"
              style={{ backgroundColor: "#230751" }}
            >
              <img
                src="src/assets/Saly-10.png"
                alt="Hero Saly-10 Character"
                className="img-fluid mb-5 p-4"
                style={{ maxHeight: "400px" }}
              />
              <h1
                className="fw-bold mb-0 text-white align-self-lg-start"
                style={{ fontSize: "3rem" }}
              >
                Ingresa
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

export default SignInPage;
