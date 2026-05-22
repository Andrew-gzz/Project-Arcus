//frontend/src/components/navbar/Navbar.tsx
import { useEffect, useState } from "react";
import { Dropdown } from "bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../services/authService";
import { getCategories } from "../../services/categoryService";
import logo from "../../assets/Logo.png";
import { getWishlist } from "../../services/wishlistService";
import { getCart } from "../../services/cartService";
import { useMemo } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [showLogoutToast, setShowLogoutToast] = useState(false);
  const [user, setUser] = useState<{ username: string; type: string } | null>(null);

  const [categories, setCategories] = useState<any[]>([]);
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [cartItems, setCartItems] = useState<any[]>([]);

  useEffect(() => {
    const checkUser = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(null);
      }
    };

    checkUser();

    window.addEventListener("storage", checkUser);
    window.addEventListener("userChanged", checkUser);

    const fetchCategories = async () => {
      try {
        const data = await getCategories();
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
      window.removeEventListener("storage", checkUser);
      window.removeEventListener("userChanged", checkUser);
    };
  }, []);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const data = await getCart();
        setCartItems(data?.products ?? []);
      } catch (error) {
        console.error("Error al cargar carrito:", error);
      }
    };

    fetchCartData();
    window.addEventListener("cartUpdated", fetchCartData);

    return () => {
      window.removeEventListener("cartUpdated", fetchCartData);
    };
  }, []);

  useEffect(() => {
    const fetchWishlistData = async () => {
      try {
        const data = await getWishlist();
        setAllProducts(data.products);
      } catch (error) {
        console.error("Error al cargar favoritos:", error);
      }
    };

    fetchWishlistData();
    window.addEventListener("wishlistUpdated", fetchWishlistData);

    return () => {
      window.removeEventListener("wishlistUpdated", fetchWishlistData);
    };
  }, []);

  const totalCartItems = useMemo(() => {
    return cartItems.reduce(
      (acc, item) => acc + (item.quantity || 1),
      0
    );
  }, [cartItems]);

  const handleConfirmLogout = async () => {
    try {
      await logout();
      localStorage.removeItem("user");
      setUser(null);
      window.dispatchEvent(new Event("userChanged"));
      setShowLogoutToast(false);
      navigate("/");
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
                  {user ? (
                    <>
                      <li>
                        <Link className="dropdown-item" to="/profile">
                          Mi perfil
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/my-orders">
                          Mis órdenes
                        </Link>
                      </li>
                      {user.type === "admin" && (
                        <>
                          <li>
                            <hr className="dropdown-divider" />
                          </li>
                          <li>
                            <Link className="dropdown-item" to="/admin">
                              Tus productos
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" to="/admin/users">
                              Gestión de usuarios
                            </Link>
                          </li>
                        </>
                      )}
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => setShowLogoutToast(true)}
                        >
                          Cerrar sesión
                        </button>
                      </li>
                    </>
                  ) : (
                    <>
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
                    </>
                  )}
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
                    {totalCartItems}
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
              {categories.length > 0 ? (
                categories.map((cat, index) => (
                  <li key={cat._id || index}>
                    <Link
                      className="dropdown-item"
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
