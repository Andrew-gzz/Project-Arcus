//frontend/src/services/categoryService.ts
import { useState } from "react";
import { addCategory } from "../../services/categoryService";

interface ToastProps {
  show: boolean;
  onClose: () => void;
  onConfirm: (productData: any) => void;
}

export default function AddCategory({ show, onClose, onConfirm }: ToastProps) {
  const [form, setForm] = useState({
    name: "",
    image: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  if (!show) return null;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;

    // Caso especial: select multiple para categorías
    if (name === "category" && e.target instanceof HTMLSelectElement) {
      const selectedCategories = Array.from(
        e.target.selectedOptions,
        (option) => option.value,
      );

      setForm((prev) => ({
        ...prev,
        category: selectedCategories,
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    // Validaciones
    if (!form.name.trim() || !form.image.trim()) {
      setError("Todos los campos marcados con * son obligatorios");
      setLoading(false);
      return;
    }

    try {
      const categoryData = await addCategory({
        name: form.name.trim(),
        image: form.image.trim(),
      });

      setSuccess("Categoría agregada correctamente");

      setTimeout(() => {
        onConfirm(categoryData);
      }, 1200);

      setForm({
        name: "",
        image: "",
      });
    } catch (err: any) {
      setError(err?.message || "Error al guardar la categoría");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      className="position-fixed top-0 start-0 w-100 vh-100 d-flex align-items-center justify-content-center"
      style={{ zIndex: 2500 }}
    >
      <div
        className="bg-dark text-white p-4 rounded-4 shadow-lg border border-secondary"
        style={{ width: "500px", zIndex: 2501 }}
      >
        <h2 className="mb-4 text-center">Agregar o Modificar categoría</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre de la categoría *</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="form-control bg-secondary text-white border-0"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">URL de Imagen *</label>
            <input
              name="image"
              value={form.image}
              onChange={handleChange}
              className="form-control bg-secondary text-white border-0"
            />
          </div>

          {error && <div className="alert alert-danger py-2">{error}</div>}
          {success && (
            <div className="alert alert-success py-2" role="alert">
              {success}
            </div>
          )}

          <div className="d-flex justify-content-center gap-3 mt-4">
            <button
              type="submit"
              disabled={loading}
              className="btn btn-info px-4 rounded-pill fw-bold"
            >
              {loading ? "Guardando..." : "Sí, continuar"}
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

      <div
        className="position-fixed top-0 start-0 w-100 vh-100 bg-black opacity-75"
        onClick={onClose}
      />
    </div>
  );
}
