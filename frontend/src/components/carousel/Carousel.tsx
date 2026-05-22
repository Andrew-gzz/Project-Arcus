import { useNavigate } from "react-router-dom";

export default function Carousel() {
  const navigate = useNavigate();
  /*Si esta hardcodeado, habra que agregar una categoria o hacer un schema nuevo para el banner de productos*/
  const bannerProduct = [
    {
      image: "src/assets/Banner1.png",
      name: "Nintendo Switch 2",
      videogame: "Pokemon Pokopia",
      id: "69cdd5c230480e331100c9b3",
    },
    {
      image: "src/assets/Banner2.png",
      name: "Steam Machine",
      videogame: "Half Life Alyx",
      id: "69ddcc89a558e0ce5efa00d6",
    },
    {
      image: "src/assets/Banner3.png",
      name: "Play Station 5 Pro",
      videogame: "God of War Ragnarok",
      id: "69cdf7f5d146062e3aa5cdbd",
    },
  ];

  return (
    <>
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-bs-ride="carousel"
        data-bs-interval="4000"
      >
        {/* Indicadores generados dinámicamente desde el array */}
        <div className="carousel-indicators justify-content-start ms-5 ps-md-5 mb-4">
          {bannerProduct.map((_, index) => (
            <button
              key={index}
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to={index}
              className={index === 0 ? "active" : ""}
              aria-current={index === 0 ? "true" : undefined}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>

        <div className="carousel-inner">
          {bannerProduct.map((product, index) => (
            <div
              key={index}
              className={`carousel-item position-relative ${index === 0 ? "active" : ""}`}
            >
              <img
                src={product.image}
                className="d-block w-100"
                alt={product.name}
                style={{ objectFit: "cover", minHeight: "400px" }}
              />
              {/* Content Overlay */}
              <div className="position-absolute top-50 start-0 translate-middle-y ms-5 ps-md-5">
                <h1
                  className="text-white fw-bold display-4"
                  style={{ textShadow: "2px 2px 8px rgba(0,0,0,0.5)" }}
                >
                  {product.name}:
                  <br />
                  {product.videogame}
                </h1>
                <div className="d-flex gap-3 mt-4">
                  <button
                    className="btn btn-danger rounded-pill px-4 py-2 fw-bold"
                    style={{
                      backgroundColor: "#f02b2b",
                      borderColor: "#f02b2b",
                    }}
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    Comprar ahora
                  </button>
                  <button
                    className="btn btn-outline-light rounded-pill px-4 py-2 fw-bold"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    Más info
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
