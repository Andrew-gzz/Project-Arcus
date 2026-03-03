import { useEffect } from "react";
import { Dropdown } from "bootstrap";
import { Link } from "react-router-dom";

function Navbar() {
  useEffect(() => {
    // This looks for all elements with the dropdown-toggle attribute
    // and initializes them specifically for this component.
    const dropdownElementList = document.querySelectorAll(".dropdown-toggle");
    const dropdownList = [...dropdownElementList].map((el) => new Dropdown(el));

    // Cleanup when component unmounts to prevent memory leaks
    return () => {
      dropdownList.forEach((dropdown) => dropdown.dispose());
    };
  }, []);

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

            {/* SEARCH BAR - Visual Fix applied here */}
            <form
              className="d-flex mx-auto my-2 my-lg-0"
              style={{ flex: "0 1 500px" }} // Slightly wider for the text button
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

            {/* TOOLBAR */}
            <ul className="navbar-nav ms-auto align-items-center    ">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#e3e3e3"
                  >
                    <path d="M300-80q-58 0-99-41t-41-99v-520q0-58 41-99t99-41h500v600q-25 0-42.5 17.5T740-220q0 25 17.5 42.5T800-160v80H300Zm-60-267q14-7 29-10t31-3h20v-440h-20q-25 0-42.5 17.5T240-740v393Zm160-13h320v-440H400v440Zm-160 13v-453 453Zm60 187h373q-6-14-9.5-28.5T660-220q0-16 3-31t10-29H300q-26 0-43 17.5T240-220q0 26 17 43t43 17Z" />
                  </svg>
                </Link>
              </li>

              <li className="nav-item dropdown">
                <button
                  className="nav-link dropdown-toggle btn btn-link"
                  id="profileDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#e3e3e3"
                  >
                    <path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z" />
                  </svg>
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
                      Profile
                    </a>
                  </li>
                </ul>
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
    </header>
  );
}

export default Navbar;
