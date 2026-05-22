import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container text-white text-center py-5 min-vh-100 d-flex flex-column align-items-center justify-content-center">
      <h1 className="display-1 fw-bold text-warning mb-3">404</h1>
      <h2 className="fw-bold mb-3">Página no encontrada</h2>
      <p className="text-white-50 fs-5 mb-4">
        La página que buscas no existe o ha sido movida.
      </p>
      <Link to="/" className="btn btn-warning rounded-pill px-5 py-3 fw-bold">
        Volver al inicio
      </Link>
    </div>
  );
}
