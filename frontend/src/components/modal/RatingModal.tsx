import { useState } from "react";

interface RatingModalProps {
  show: boolean;
  onClose: () => void;
  onSubmit: (rating: number, comment: string) => void;
  productName: string;
}

export default function RatingModal({
  show,
  onClose,
  onSubmit,
  productName,
}: RatingModalProps) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  // REGLA DE ORO: Si no se debe mostrar, retornamos null
  if (!show) return null;

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (rating === 0) return; // Validación básica

    setLoading(true);
    // Simulamos la espera de la API (o llamas a tu onSubmit real)
    await onSubmit(rating, comment);
    setLoading(false);

    // Limpiamos el modal para la próxima vez
    setRating(0);
    setComment("");
    onClose();
  };

  return (
    <div
      className="position-fixed top-50 start-50 translate-middle"
      style={{ zIndex: 1050 }}
    >
      <div
        className="bg-dark p-4 rounded-4 shadow-lg text-white border border-secondary"
        style={{ width: "400px" }}
      >
        <h4 className="text-center mb-3 fw-bold">Calificar Producto</h4>
        <p className="text-center text-muted mb-4">{productName}</p>

        <form onSubmit={handleSubmit}>
          {/* SISTEMA DE ESTRELLAS INTERACTIVO */}
          <div className="d-flex justify-content-center gap-2 mb-4">
            {[...Array(5)].map((star, index) => {
              const currentRating = index + 1;
              return (
                <button
                  type="button"
                  key={currentRating}
                  className="btn p-0 border-0 bg-transparent"
                  onClick={() => setRating(currentRating)}
                  onMouseEnter={() => setHover(currentRating)}
                  onMouseLeave={() => setHover(0)}
                  style={{
                    fontSize: "2.5rem",
                    color:
                      currentRating <= (hover || rating)
                        ? "#ffc107"
                        : "#6c757d", // Amarillo o Gris
                    transition: "color 0.2s",
                  }}
                >
                  ★
                </button>
              );
            })}
          </div>

          {/* CAJA DE COMENTARIOS (Preparada para el futuro) */}
          <div className="mb-4">
            <label className="form-label text-info">
              Comentario (Opcional)
            </label>
            <textarea
              className="form-control bg-secondary text-white border-0"
              rows={3}
              placeholder="¿Qué te pareció este producto?"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
          </div>

          <div className="d-flex justify-content-center gap-3">
            <button
              type="submit"
              disabled={loading || rating === 0} // Deshabilitar si no hay estrellas
              className="btn btn-warning px-4 rounded-pill fw-bold"
            >
              {loading ? "Enviando..." : "Enviar Reseña"}
            </button>
            <button
              type="button"
              className="btn btn-outline-light px-4 rounded-pill"
              onClick={onClose}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
