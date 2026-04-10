//frontend/src/components/navbar/Navbar.tsx
import { useEffect, useState } from "react";
import { Dropdown } from "bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../services/authService";
import { getCategories } from "../../services/categoryService";
import logo from "../../assets/Logo.png";
import { getWishlist } from "../../services/wishlistService";

export default function Navbar() {
  const navigate = useNavigate();
  const [showLogoutToast, setShowLogoutToast] = useState(false);
  const [user, setUser] = useState<{ username: string } | null>(null);

  // Estado para las categorías
  const [categories, setCategories] = useState<any[]>([]);
  const [allProducts, setAllProducts] = useState<any[]>([]); //Para contar cantidad de productos en favoritos

  useEffect(() => {
    // Revisar si hay un usuario al cargar el componente
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    // Función para obtener las categorías al cargar el Navbar
    const fetchCategories = async () => {
      try {
        const data = await getCategories();

        // Ordenamos alfabéticamente por el campo 'name'
        const sortedCategories = data.sort((a: any, b: any) =>
          a.name.localeCompare(b.name),
        );

        setCategories(sortedCategories);
      } catch (error) {
        console.error("Error al cargar las categorías:", error);
      }
    };
    fetchCategories();

    const dropdownElementList = document.querySelectorAll(".dropdown-toggle");
    const dropdownList = [...dropdownElementList].map((el) => new Dropdown(el));
    return () => {
      dropdownList.forEach((dropdown) => dropdown.dispose());
    };
  }, []);

  // frontend/src/components/navbar/Navbar.tsx

  useEffect(() => {
    // 1. Metemos la lógica de carga en una función reusable
    const fetchWishlistData = async () => {
      try {
        const data = await getWishlist();
        setAllProducts(data.products); // Actualiza el estado con los nuevos favoritos
      } catch (error) {
        console.error("Error al cargar favoritos:", error);
      }
    };

    // 2. Ejecutamos la carga inicial
    fetchWishlistData();

    // 3. Escuchamos el evento personalizado
    window.addEventListener("wishlistUpdated", fetchWishlistData);

    // 4. Limpiamos el evento cuando el componente se desmonte
    return () => {
      window.removeEventListener("wishlistUpdated", fetchWishlistData);
    };
  }, []);
  // Función para manejar el cierre de sesión real
  const handleConfirmLogout = async () => {
    try {
      await logout(); // 1. Llama al backend para borrar la cookie
      localStorage.removeItem("user"); // 2. Borra los datos locales
      setUser(null); // 3. Actualiza la UI
      setShowLogoutToast(false);
      navigate("/signin"); // 4. Redirige al login
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <header className="sticky-top">
      <nav
        className="navbar navbar-expand-md navbar-dark"
        style={{ backgroundColor: "#0C062E" }}
      >
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="Proyect Arcus" width="auto" height="48" />
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
                    <a className="dropdown-item" href="/admin">
                      Tus productos
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
                <Link className="nav-link position-relative" to="/wishlist">
                  <img src="/src/assets/heart.svg"></img>
                  <span
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill text-white fw-bold"
                    style={{ backgroundColor: "#67B3B5" }}
                  >
                    {allProducts.length > 0 ? allProducts.length : 0}{" "}
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
              Catálogo
            </button>
            <ul className="dropdown-menu">
              {/* 4. Iteración dinámica de categorías */}
              {categories.length > 0 ? (
                categories.map((cat, index) => (
                  <li key={cat._id || index}>
                    <Link
                      className="dropdown-item"
                      // Convertimos el nombre a minúsculas y quitamos espacios para la URL
                      to={`/catalog/${cat.name.replace(/\s+/g, "-")}`}
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))
              ) : (
                <li>
                  <span className="dropdown-item text-muted">Cargando...</span>
                </li>
              )}
            </ul>
          </div>

          <ul className="navbar-nav flex-row gap-4 ms-4">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Inicio
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/membership">
                Membresías
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/aboutus">
                Sobre Nosotros
              </Link>
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
