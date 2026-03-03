export default function ProductGrid() {
  const products = [
    {
      name: "Nintendo Switch 2",
      price: "$11,70",
      img: "/src/assets/react.svg",
    },
    { name: "Control de Xbox", price: "$11,70", img: "/src/assets/react.svg" },
    {
      name: "Estudio de videojuegos",
      price: "$11,70",
      img: "/src/assets/react.svg",
    },
    {
      name: "Marvel Spider-Man 2",
      price: "$11,70",
      img: "/src/assets/react.svg",
    },
    // Puedes repetir o agregar más objetos aquí
  ];

  return (
    <div className="container-fluid py-5" style={{ minHeight: "100vh" }}>
      {/* HEADER: Título y Filtros */}
      <div className="d-flex justify-content-between align-items-center mb-5 ">
        <h2 className="text-warning fw-bold">Productos populares</h2>
        <div className="d-none d-md-flex gap-2">
          {["Videojuegos", "Controles", "Consolas", "Accesorios"].map(
            (cat, i) => (
              <button
                key={i}
                className={`btn rounded-pill px-4 border-secondary text-white ${i === 0 ? "border-danger" : ""}`}
                style={{ backgroundColor: "#1e1b33", fontSize: "0.8rem" }}
              >
                {cat}
              </button>
            ),
          )}
        </div>
      </div>

      {/* GRID DE PRODUCTOS */}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
        {[...products, ...products].map((product, index) => (
          <div className="col" key={index}>
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
                  {"★★★★★".split("").map((s, i) => (
                    <span key={i} className="me-1">
                      ★
                    </span>
                  ))}
                </div>

                {/* Botones de acción (Simulando el hover de tu imagen) */}
                {index === 0 && (
                  <div className="d-flex gap-2 mt-2">
                    <button
                      className="btn btn-warning flex-grow-1 fw-bold rounded-pill d-flex align-items-center justify-content-center gap-2"
                      style={{ backgroundColor: "#e2f54d", fontSize: "0.8rem" }}
                    >
                      Añadir al carrito 🛒
                    </button>
                    <button
                      className="btn btn-warning rounded-3"
                      style={{ backgroundColor: "#e2f54d" }}
                    >
                      👁️
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Indicadores de página abajo */}
      <div className="d-flex justify-content-center gap-2 mt-5">
        <div
          className="rounded-circle"
          style={{ width: "10px", height: "10px", backgroundColor: "#4fd1c5" }}
        ></div>
        <div
          className="rounded-circle border border-secondary"
          style={{ width: "10px", height: "10px" }}
        ></div>
        <div
          className="rounded-circle border border-secondary"
          style={{ width: "10px", height: "10px" }}
        ></div>
      </div>
    </div>
  );
}
export function ProductGrid2() {
  return (
    <>
      <div className="row align-items-stretch mb-5">
        {/*Seccion 1 */}
        <div className="col-sm-6 mb-3 mb-sm-0">
          <div className="row g-0 rounded-4 overflow-hidden h-100">
            {/* Imagen */}
            <div className="col-md-4">
              <img
                src="src/assets/MembresiaFondo.png"
                className="img-fluid h-100 w-100 object-fit-cover"
                alt="Producto 1"
              />
            </div>

            {/* Texto */}
            <div className="col-md-8">
              <div
                className="card rounded-0 h-100 border-0 text-white"
                style={{ backgroundColor: "#25223d" }}
              >
                <div className="card-body">
                  <h5 className="card-title">Card title</h5>
                  <p className="card-text">
                    This is a wider card with supporting text below as a natural
                    lead-in to additional content.
                  </p>
                  <p className="card-text">
                    <small className="text-white">
                      Last updated 3 mins ago
                    </small>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Seccion 2 */}
        <div className="col-sm-6 d-flex gap-4 flex-sm-column">
          {/*PRODUCTO 2 */}
          <div className="row g-0 rounded-4 overflow-hidden">
            {/* Imagen */}
            <div className="col-md-4">
              <img
                src="src/assets/MembresiaFondo.png"
                className="img-fluid h-100 w-100 object-fit-cover"
                alt="Producto 2"
              />
            </div>

            {/* Texto */}
            <div className="col-md-8">
              <div
                className="card rounded-0 h-100 border-0 text-white"
                style={{ backgroundColor: "#25223d" }}
              >
                <div className="card-body">
                  <h5 className="card-title">Card title</h5>
                  <p className="card-text">
                    This is a wider card with supporting text below as a natural
                    lead-in to additional content.
                  </p>
                  <p className="card-text">
                    <small className="text-white">
                      Last updated 3 mins ago
                    </small>
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/*PRODUCTO 3 */}
          <div className="row g-0 rounded-4 overflow-hidden">
            {/* Imagen */}
            <div className="col-md-4">
              <img
                src="src/assets/MembresiaFondo.png"
                className="img-fluid h-100 w-100 object-fit-cover"
                alt="Producto 2"
              />
            </div>

            {/* Texto */}
            <div className="col-md-8">
              <div
                className="card rounded-0 h-100 border-0 text-white"
                style={{ backgroundColor: "#25223d" }}
              >
                <div className="card-body">
                  <h5 className="card-title">Card title</h5>
                  <p className="card-text">
                    This is a wider card with supporting text below as a natural
                    lead-in to additional content.
                  </p>
                  <p className="card-text">
                    <small className="text-white">
                      Last updated 3 mins ago
                    </small>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export function ProductGrid3() {
  const products = [
    {
      name: "Nintendo Switch 2",
      price: "$11,70",
      img: "/src/assets/react.svg",
    },
    { name: "Control de Xbox", price: "$11,70", img: "/src/assets/react.svg" },
    {
      name: "Estudio de videojuegos",
      price: "$11,70",
      img: "/src/assets/react.svg",
    },
    {
      name: "Marvel Spider-Man 2",
      price: "$11,70",
      img: "/src/assets/react.svg",
    },
    {
      name: "Marvel Spider-Man 2",
      price: "$11,70",
      img: "/src/assets/react.svg",
    },
    {
      name: "Marvel Spider-Man 2",
      price: "$11,70",
      img: "/src/assets/react.svg",
    },
    // Puedes repetir o agregar más objetos aquí
  ];

  return (
    <div className="container-fluid" style={{ minHeight: "100vh" }}>
      {/* GRID DE PRODUCTOS */}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
        {[...products, ...products].map((product, index) => (
          <div className="col" key={index}>
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
                  {"★★★★★".split("").map((s, i) => (
                    <span key={i} className="me-1">
                      ★
                    </span>
                  ))}
                </div>

                {/* Botones de acción (Simulando el hover de tu imagen) */}
                {index === 0 && (
                  <div className="d-flex gap-2 mt-2">
                    <button
                      className="btn btn-warning flex-grow-1 fw-bold rounded-pill d-flex align-items-center justify-content-center gap-2"
                      style={{ backgroundColor: "#e2f54d", fontSize: "0.8rem" }}
                    >
                      Añadir al carrito 🛒
                    </button>
                    <button
                      className="btn btn-warning rounded-3"
                      style={{ backgroundColor: "#e2f54d" }}
                    >
                      👁️
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Indicadores de página abajo */}
      <div className="d-flex justify-content-center gap-2 mt-5">
        <div
          className="rounded-circle"
          style={{ width: "10px", height: "10px", backgroundColor: "#4fd1c5" }}
        ></div>
        <div
          className="rounded-circle border border-secondary"
          style={{ width: "10px", height: "10px" }}
        ></div>
        <div
          className="rounded-circle border border-secondary"
          style={{ width: "10px", height: "10px" }}
        ></div>
      </div>
    </div>
  );
}
