import { useEffect, useState } from "react";
import { Dropdown } from "bootstrap";
import { Link } from "react-router-dom";

export default function Navbar() {
  //Estado para controlar la visibilidad del Toast
  const [showLogoutToast, setShowLogoutToast] = useState(false);

  useEffect(() => {
    const dropdownElementList = document.querySelectorAll(".dropdown-toggle");
    const dropdownList = [...dropdownElementList].map((el) => new Dropdown(el));
    return () => {
      dropdownList.forEach((dropdown) => dropdown.dispose());
    };
  }, []);

  // Función para manejar el cierre de sesión real
  const handleConfirmLogout = () => {
    console.log("Sesión cerrada");
    setShowLogoutToast(false);
    // Aquí rediriges o limpias el estado de auth
  };

  return (
    <header className="sticky-top">
      <nav
        className="navbar navbar-expand-md navbar-dark"
        style={{ backgroundColor: "#0C062E" }}
      >
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img
              src="src/assets/logo.png"
              alt="Proyect Arcus"
              width="auto"
              height="48"
            />
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navContent"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navContent">
            <div className="navbar-nav me-auto"></div>

            <form
              className="d-flex mx-auto my-2 my-lg-0"
              style={{ flex: "0 1 500px" }}
            >
              <div
                className="input-group bg-white rounded-pill p-1 shadow-sm"
                style={{ overflow: "hidden" }}
              >
                <input
                  className="form-control border-0 shadow-none ps-3"
                  type="search"
                  placeholder="Busca productos"
                  aria-label="Buscar"
                />
                <button
                  className="btn rounded-pill px-4 fw-bold text-white"
                  style={{ backgroundColor: "#67B3B5" }}
                  type="submit"
                >
                  Buscar
                </button>
              </div>
            </form>

            <ul className="navbar-nav ms-auto align-items-center gap-1">
              <li className="nav-item dropdown">
                <button
                  className="nav-link dropdown-toggle btn btn-link"
                  id="profileDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img src="/src/assets/user.svg" alt="user" />
                </button>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="profileDropdown"
                >
                  <li>
                    <Link className="dropdown-item" to="/signin">
                      Iniciar sesión
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/signup">
                      Registrarse
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="/profile">
                      Perfil
                    </a>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => setShowLogoutToast(true)}
                    >
                      Cerrar sesión
                    </button>
                  </li>
                </ul>
              </li>
              {/*CARRITO DE COMPRAS */}
              <li className="nav-item">
                <Link className="nav-link position-relative" to="/cart">
                  <img src="/src/assets/cart.svg"></img>
                  <span
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill text-white fw-bold"
                    style={{ backgroundColor: "#67B3B5" }}
                  >
                    2
                  </span>
                </Link>
              </li>

              {/*FAVORITOS */}
              <li className="nav-item">
                <Link className="nav-link position-relative" to="/">
                  <img src="/src/assets/heart.svg"></img>
                  <span
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill text-white fw-bold"
                    style={{ backgroundColor: "#67B3B5" }}
                  >
                    2
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* SUBNAV */}
      <nav
        className="navbar navbar-dark"
        style={{ backgroundColor: "#200C40" }}
        aria-label="Secondary"
      >
        <div className="container-fluid py-1">
          <div className="dropdown">
            <button
              className="btn btn-info rounded-3 dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Categorías
            </button>
            <ul className="dropdown-menu">
              <li>
                <a className="dropdown-item" href="#">
                  Categoría 1
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Categoría 2
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Categoría 3
                </a>
              </li>
            </ul>
          </div>

          <ul className="navbar-nav flex-row gap-4 ms-4">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Inicio
              </Link>
            </li>
            {/* Catalogo */}
            <li className="nav-item dropdown position-relative">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Catálogo
              </a>

              <ul className="dropdown-menu mt-2 position-absolute">
                <li>
                  <Link className="dropdown-item" to="/catalog">
                    Nintendo
                  </Link>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Catálogo 2
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Catálogo 3
                  </a>
                </li>
              </ul>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/membership">
                Membresías
              </Link>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#">
                Sobre Nosotros
              </a>
            </li>
          </ul>

          <div className="ms-auto fw-semibold text-warning">
            30 días de devolución gratuita
          </div>
        </div>
      </nav>

      {/*Renderizar el ToastMessage*/}
      <ToastMessage
        show={showLogoutToast}
        onClose={() => setShowLogoutToast(false)}
        onConfirm={handleConfirmLogout}
      />
    </header>
  );
}

/*TOAST SECTION */
interface ToastProps {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

function ToastMessage({ show, onClose, onConfirm }: ToastProps) {
  if (!show) return null;

  return (
    <div
      className="toast-container position-fixed top-50 start-50 translate-middle"
      style={{ zIndex: 2000 }}
    >
      <div
        className="toast show shadow-lg border rounded-4 overflow-hidden"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        style={{ minWidth: "300px" }}
      >
        <div className="toast-header bg-dark text-white border-bottom border-secondary p-3">
          <strong className="me-auto fs-5">Confirmación</strong>
          <button
            type="button"
            className="btn-close btn-close-white"
            onClick={onClose}
          ></button>
        </div>
        <div className="toast-body bg-dark text-white p-4 text-center">
          <p className="mb-4 fs-6">
            ¿Estás seguro de que deseas cerrar sesión?
          </p>
          <div className="d-flex justify-content-center gap-3">
            <button
              type="button"
              className="btn btn-danger px-4 rounded-pill fw-bold"
              onClick={onConfirm}
            >
              Sí, salir
            </button>
            <button
              type="button"
              className="btn btn-outline-light px-4 rounded-pill"
              onClick={onClose}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
