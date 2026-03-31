export default function CategoryCarousel() {
  return (
    <div className="container-fluid py-5">
      <div id="categoryCarousel" className="carousel slide">
        <div className="carousel-inner">
          {/* GRUPO 1: Primeras 3 Secciones */}
          <div className="carousel-item active">
            <div className="row g-3">
              <div className="col-4">
                <button
                  className="btn w-100 d-flex align-items-center justify-content-center p-4 rounded-4 shadow-sm"
                  style={{
                    backgroundColor: "#1e1b33",
                  }}
                >
                  <img
                    src="/src/assets/react.svg"
                    alt="Controles"
                    className="me-3"
                    style={{ height: "60px", objectFit: "contain" }}
                  />
                  <span className="text-white fw-bold fs-5">Controles</span>
                </button>
              </div>
              <div className="col-4">
                <button
                  className="btn w-100 d-flex align-items-center justify-content-center p-4 rounded-4 shadow-sm"
                  style={{
                    backgroundColor: "#1e1b33",
                  }}
                >
                  <img
                    src="/src/assets/react.svg"
                    alt="Videojuegos"
                    className="me-3"
                    style={{ height: "60px", objectFit: "contain" }}
                  />
                  <span className="text-white fw-bold fs-5">Videojuegos</span>
                </button>
              </div>
              <div className="col-4">
                <button
                  className="btn w-100 d-flex align-items-center justify-content-center p-4 rounded-4 shadow-sm"
                  style={{
                    backgroundColor: "#1e1b33",
                  }}
                >
                  <img
                    src="/src/assets/react.svg"
                    alt="Consolas"
                    className="me-3"
                    style={{ height: "60px", objectFit: "contain" }}
                  />
                  <span className="text-white fw-bold fs-5">Consolas</span>
                </button>
              </div>
            </div>
          </div>

          {/* GRUPO 2: Siguientes 3 Secciones (Ejemplo) */}
          <div className="carousel-item">
            <div className="row g-3 px-5 mx-2">
              <div className="col-4">
                <button
                  className="btn w-100 d-flex align-items-center justify-content-center p-4 rounded-4 shadow-sm"
                  style={{ backgroundColor: "#1e1b33" }}
                >
                  <span className="text-white fw-bold fs-5">Más Items...</span>
                </button>
              </div>
              {/* Repetir estructura de columnas según necesites */}
            </div>
          </div>
        </div>

        {/* Controles de Navegación Personalizados con Clases de Bootstrap */}
        <button
          className="carousel-control-prev opacity-100"
          type="button"
          data-bs-target="#categoryCarousel"
          data-bs-slide="prev"
          style={{ width: "5%" }}
        >
          <div
            className="bg-warning rounded-circle d-flex align-items-center justify-content-center shadow"
            style={{ width: "40px", height: "40px" }}
          >
            <span className="text-dark fw-bold">←</span>
          </div>
        </button>

        <button
          className="carousel-control-next opacity-100"
          type="button"
          data-bs-target="#categoryCarousel"
          data-bs-slide="next"
          style={{ width: "5%" }}
        >
          <div
            className="bg-warning rounded-circle d-flex align-items-center justify-content-center shadow"
            style={{ width: "40px", height: "40px" }}
          >
            <span className="text-dark fw-bold">→</span>
          </div>
        </button>
      </div>
    </div>
  );
}
