export default function Carousel() {
  return (
    <>
      <div id="carouselExampleIndicators" className="carousel slide">
        {/* Indicators - moved slightly to the left to match the image */}
        <div className="carousel-indicators justify-content-start ms-5 ps-md-5 mb-4">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>

        <div className="carousel-inner">
          {/* Slide 1 */}
          <div className="carousel-item active position-relative">
            <img
              src="src/assets/MembresiaFondo.png"
              className="d-block w-100"
              alt="Hollow Knight Silksong"
              style={{ objectFit: "cover", minHeight: "400px" }} // Ensures the image has enough height
            />
            {/* Content Overlay */}
            <div className="position-absolute top-50 start-0 translate-middle-y ms-5 ps-md-5">
              <h1
                className="text-white fw-bold display-4"
                style={{ textShadow: "2px 2px 8px rgba(0,0,0,0.5)" }}
              >
                Hollow Knight:
                <br />
                Silksong
              </h1>
              <div className="d-flex gap-3 mt-4">
                <button
                  className="btn btn-danger rounded-pill px-4 py-2 fw-bold"
                  style={{ backgroundColor: "#f02b2b", borderColor: "#f02b2b" }}
                >
                  Comprar ahora
                </button>
                <button className="btn btn-outline-light rounded-pill px-4 py-2 fw-bold">
                  Más info
                </button>
              </div>
            </div>
          </div>

          {/* Slide 2 */}
          <div className="carousel-item position-relative">
            <img
              src="src/assets/MembresiaFondo.png"
              className="d-block w-100"
              alt="..."
              style={{ objectFit: "cover", minHeight: "400px" }}
            />
            {/* Content Overlay */}
            <div className="position-absolute top-50 start-0 translate-middle-y ms-5 ps-md-5">
              <h1
                className="text-white fw-bold display-4"
                style={{ textShadow: "2px 2px 8px rgba(0,0,0,0.5)" }}
              >
                Hollow Knight:
                <br />
                Silksong
              </h1>
              <div className="d-flex gap-3 mt-4">
                <button
                  className="btn btn-danger rounded-pill px-4 py-2 fw-bold"
                  style={{ backgroundColor: "#f02b2b", borderColor: "#f02b2b" }}
                >
                  Comprar ahora
                </button>
                <button className="btn btn-outline-light rounded-pill px-4 py-2 fw-bold">
                  Más info
                </button>
              </div>
            </div>
          </div>

          {/* Slide 3 */}
          <div className="carousel-item position-relative">
            <img
              src="src/assets/MembresiaFondo.png"
              className="d-block w-100"
              alt="..."
              style={{ objectFit: "cover", minHeight: "400px" }}
            />
            {/* Content Overlay */}
            <div className="position-absolute top-50 start-0 translate-middle-y ms-5 ps-md-5">
              <h1
                className="text-white fw-bold display-4"
                style={{ textShadow: "2px 2px 8px rgba(0,0,0,0.5)" }}
              >
                Hollow Knight:
                <br />
                Silksong
              </h1>
              <div className="d-flex gap-3 mt-4">
                <button
                  className="btn btn-danger rounded-pill px-4 py-2 fw-bold"
                  style={{ backgroundColor: "#f02b2b", borderColor: "#f02b2b" }}
                >
                  Comprar ahora
                </button>
                <button className="btn btn-outline-light rounded-pill px-4 py-2 fw-bold">
                  Más info
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
