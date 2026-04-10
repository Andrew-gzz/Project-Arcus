import { Link } from "react-router-dom";
import Breadcrumb, { BreadcrumbItem } from "../../components/utils/Breadcrumb";
import Imagen1 from "../../assets/Imagen1.png";
import Imagen3 from "../../assets/Imagen3.png";
export default function AboutUsPage() {
  const breadcrumbPaths: BreadcrumbItem[] = [
    { name: "Inicio", url: "/" },
    { name: "Sobre Nosotros" },
  ];
  return (
    <>
      <div className="container mt-1 mb-5">
        <Breadcrumb items={breadcrumbPaths} />
        <div
          className="container-fluid rounded-4 p-4 p-lg-5"
          style={{ background: "#2D284A" }}
        >
          <div className="row g-4 align-items-stretch">
            {/* PARTE IZQUIERDA */}
            <div className="col-12 col-lg-6">
              <div className="row g-3 h-100">
                {/* IMAGEN GRANDE IZQUIERDA */}
                <div className="col-6">
                  <div className="h-100 rounded-4 overflow-hidden">
                    <img
                      src={Imagen1}
                      alt="Arcades"
                      className="w-100 h-100"
                      style={{
                        objectFit: "cover",
                        minHeight: "440px",
                        display: "block",
                      }}
                    />
                  </div>
                </div>

                {/* COLUMNA DERECHA */}
                <div className="col-6">
                  <div className="d-flex flex-column h-100 gap-3">
                    {/* BLOQUE SUPERIOR */}
                    <div
                      className="rounded-4 d-flex align-items-center justify-content-center text-center"
                      style={{
                        background: "#67B3B5",
                        minHeight: "100px",
                        flex: "0 0 auto",
                      }}
                    >
                      <div>
                        <h2 className="mb-0 fw-bold text-dark">Gaming</h2>
                        <p className="mb-0 fs-4 text-dark">sin límites</p>
                      </div>
                    </div>

                    {/* IMAGEN INFERIOR */}
                    <div className="flex-grow-1 rounded-4 overflow-hidden">
                      <img
                        src={Imagen3}
                        alt="Control gaming"
                        className="w-100 h-100"
                        style={{
                          objectFit: "cover",
                          minHeight: "320px",
                          display: "block",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* PARTE DERECHA */}
            <div className="col-12 col-lg-6 text-start d-flex flex-column justify-content-center">
              <h1 className="text-light fw-bold text-uppercase mb-3">
                Sobre nosotros
              </h1>

              <h2 className="text-warning fw-bold mb-4">
                ¿Qué quieres construir hoy: tu colección o tu propio arcade?
              </h2>

              <p className="text-light lh-lg mb-4">
                Project Arcus es una plataforma e-commerce especializada en el
                mundo del gaming y el entretenimiento arcade. Ofrecemos compra y
                venta de videojuegos, consolas, accesorios y gabinetes arcade,
                así como planes de servicio diseñados para centros arcade que
                buscan mejorar el rendimiento y mantenimiento de sus equipos.
                Nuestro objetivo es brindar productos confiables y accesibles
                tanto para jugadores como para emprendedores, apoyando el
                crecimiento de espacios de entretenimiento modernos. En Project
                Arcus, combinamos la nostalgia del arcade con la innovación
                digital para ofrecer una experiencia completa en un solo lugar.
              </p>

              <div>
                <Link
                  className="btn btn-danger rounded-pill px-4 py-2 fw-bold"
                  to="/"
                >
                  Contactanos 81-8329-4000
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
