import { Link } from "react-router-dom";
export default function Product() {
  const products = [
    {
      name: "Nintendo Switch 2",
      price: "$11,70",
      img: "/src/assets/react.svg",
    },
    { name: "Control de Xbox", price: "$11,70", img: "/src/assets/react.svg" },
    // Puedes repetir o agregar más objetos aquí
  ];
  return (
    <div className="min-vh-100 text-light pb-5">
      {/* Breadcrumb */}
      <nav className="container py-4" aria-label="breadcrumb">
        <ol className="breadcrumb mb-0">
          <li className="breadcrumb-item">
            <Link
              to="/"
              className="text-warning text-decoration-none opacity-75"
            >
              Inicio
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link
              to="/catalog"
              className="text-warning text-decoration-none opacity-75"
            >
              Catálogo de Nintendo
            </Link>
          </li>
          <li
            className="breadcrumb-item active text-warning"
            aria-current="page"
          >
            Pokemon Z
          </li>
        </ol>
      </nav>

      <div className="container">
        {/*PRODUCTO*/}
        <div className="row g-5">
          {/* SECCIÓN IZQUIERDA: IMÁGENES */}
          <div className="col-lg-6 d-flex flex-column">
            <div
              className="p-4 d-flex justify-content-center align-items-center mb-3 rounded-4 border flex-grow-1"
              style={{ backgroundColor: "#2D284A" }}
            >
              <img
                src="src/assets/MembresiaFondo.png"
                alt="Pokemon Z"
                className="img-fluid rounded-3"
                style={{
                  maxHeight: "450px",
                  objectFit: "contain",
                }}
              />
            </div>
            <div className="row g-3">
              <div className="col-6">
                <div
                  className="p-2 border rounded-4"
                  style={{ backgroundColor: "#2D284A" }}
                >
                  <img
                    src="src/assets/MembresiaFondo.png"
                    alt="thumb"
                    className="img-fluid rounded-3"
                  />
                </div>
              </div>
              <div className="col-6">
                <div
                  className="p-2 border rounded-4 overflow-hidden"
                  style={{ backgroundColor: "#2D284A" }}
                >
                  <img
                    src="src/assets/MembresiaFondo.png"
                    alt="thumb"
                    className="img-fluid rounded-3"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* SECCIÓN DERECHA: INFORMACIÓN */}
          <div className="col-lg-6">
            <h1 className="fw-bold mb-2 text-light">Pokemon Z</h1>
            <p className="text-warning">$11,70</p>

            <div className="mb-3 text-secondary">
              <span className="me-1 text-primary ">☆ ☆ ☆ ☆ ☆</span>
            </div>

            <div className="mb-3">
              <p className="mb-1">
                Disponibilidad:{" "}
                <span className="text-warning fw-bold">✓ En stock</span>
              </p>
              <small className="opacity-75">
                ¡Apresúrate! solo 34 productos quedan en stock
              </small>
            </div>

            <hr className="opacity-25" />

            {/* Selectores */}
            <div className="d-flex align-items-center gap-3 mb-4 mt-4">
              <span className="fw-bold">Color :</span>
              <button className="rounded-circle border"></button>
              <button className="rounded-circle border"></button>
            </div>

            <div className="d-flex align-items-center gap-3 mb-4">
              <span className="fw-bold">Cantidad:</span>
              <div className="input-group" style={{ width: "120px" }}>
                <button className="btn btn-light btn-sm">-</button>
                <input
                  type="text"
                  className="form-control form-control-sm text-center fw-bold"
                  defaultValue="1"
                />
                <button className="btn btn-light btn-sm">+</button>
              </div>
            </div>

            {/* Botones de Acción */}
            <div className="d-flex gap-3 align-items-center mb-5">
              <button className="btn btn-danger py-3 px-4 flex-grow-1 rounded-pill">
                Añadir al carrito
              </button>
              <button className="btn btn-danger py-3 px-4 flex-grow-1 rounded-pill">
                Comprar ahora
              </button>
              <button
                className="btn btn-light rounded-circle p-3 d-flex align-items-center justify-content-center"
                style={{ width: "55px", height: "55px" }}
              >
                <i className="bi bi-heart"></i> ♡
              </button>
            </div>

            <hr className="opacity-25" />

            {/* Metadatos */}
            <div className="small opacity-75">
              <p className="mb-2">
                <strong>Referencia:</strong> 01133-9-9
              </p>
              <p className="mb-2">
                <strong>Categoría:</strong>{" "}
                <span className="text-secondary">
                  30% de descuento Nintendo Pokemon
                </span>
              </p>
              <div className="d-flex gap-3 mt-3 align-items-center">
                <span>Compartir:</span>
                <i className="bi bi-link-45deg cursor-pointer">🔗</i>
                <i className="bi bi-facebook cursor-pointer">FB</i>
                <i className="bi bi-whatsapp cursor-pointer">WA</i>
              </div>
            </div>
          </div>
        </div>
        {/*PRODUCTO DETALLES*/}
        <button className=" d-block mx-auto text-dark bg-info rounded-4 border-0 my-4 px-5 py-3 fs-5">
          Descripción
        </button>
        <h2 className=" my-4 mx-1 text-warning">Artículos relacionados</h2>
        {/*PRODUCTOS SIMILARES*/}
        <div className="row g-4">
          {[...products, ...products].map((product, index) => (
            <div className="col-6 col-lg-3" key={index}>
              <div
                className="card h-100 border-0 rounded-4 overflow-hidden"
                style={{ backgroundColor: "#1e1b33" }}
              >
                {/* Parte Superior: Imagen y Heart */}
                <div
                  className="position-relative p-4 d-flex justify-content-center align-items-center"
                  style={{ backgroundColor: "#25223d", height: "200px" }}
                >
                  <button
                    className="btn position-absolute top-0 end-0 m-3 rounded-circle d-flex align-items-center justify-content-center"
                    style={{
                      backgroundColor: "#4fd1c5",
                      width: "30px",
                      height: "30px",
                      border: "none",
                    }}
                  >
                    <small>❤️</small>
                  </button>
                  <img
                    src={product.img}
                    alt={product.name}
                    className="img-fluid"
                    style={{ maxHeight: "140px", objectFit: "contain" }}
                  />
                </div>

                {/* Parte Inferior: Info */}
                <div
                  className="card-body text-white p-3"
                  style={{ backgroundColor: "#110f24" }}
                >
                  <h6 className="mb-2 fw-bold">{product.name}</h6>
                  <p className="text-warning fw-bold mb-1">{product.price}</p>
                  <div className="text-secondary small mb-3">
                    <span className="me-1 text-primary ">☆ ☆ ☆ ☆ ☆</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
