import { useState } from "react";
import { addProduct } from "../../services/productService";

interface ToastProps {
  show: boolean;
  onClose: () => void;
  onConfirm: (productData: any) => void;
}

export default function AddProduct({ show, onClose, onConfirm }: ToastProps) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: [] as string[],
    image: "",
    stock: "",
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
    if (
      !form.name.trim() ||
      !form.description.trim() ||
      !form.price ||
      form.category.length === 0 ||
      !form.image.trim()
    ) {
      setError("Todos los campos marcados con * son obligatorios");
      setLoading(false);
      return;
    }

    if (Number(form.price) <= 0) {
      setError("El precio debe ser un número mayor a 0");
      setLoading(false);
      return;
    }

    if (form.stock && Number(form.stock) < 0) {
      setError("El stock no puede ser negativo");
      setLoading(false);
      return;
    }

    try {
      const productData = await addProduct({
        name: form.name.trim(),
        description: form.description.trim(),
        price: Number(form.price),
        category: form.category,
        image: form.image.trim(),
        stock: form.stock ? Number(form.stock) : 0,
      });

      setSuccess("Producto agregado correctamente");

      setTimeout(() => {
        onConfirm(productData);
      }, 1200);

      setForm({
        name: "",
        description: "",
        price: "",
        category: [],
        image: "",
        stock: "",
      });
    } catch (err: any) {
      setError(err?.message || "Error al guardar el producto");
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
        <h2 className="mb-4 text-center">Agregar Producto</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre del Producto *</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="form-control bg-secondary text-white border-0"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Descripción del producto *</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="form-control bg-secondary text-white border-0"
              rows={3}
            />
          </div>

          <div className="row">
            <div className="col-6 mb-3">
              <label className="form-label">Precio *</label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                className="form-control bg-secondary text-white border-0"
              />
            </div>

            <div className="col-6 mb-3">
              <label className="form-label">Stock</label>
              <input
                type="number"
                name="stock"
                value={form.stock}
                onChange={handleChange}
                className="form-control bg-secondary text-white border-0"
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Categorías *</label>
            <select
              name="category"
              multiple
              value={form.category}
              onChange={handleChange}
              className="form-select bg-secondary text-white border-0"
              style={{ minHeight: "130px" }}
            >
              <option value="Videojuegos">Videojuegos</option>
              <option value="Consolas">Consolas</option>
              <option value="Accesorios">Accesorios</option>
              <option value="Controles">Controles</option>
              <option value="Nintendo Switch">Nintendo Switch</option>
              <option value="Xbox">Xbox</option>
              <option value="Steam">Steam</option>
              <option value="PlayStation">PlayStation</option>
              <option value="Nuevo">Nuevo</option>
            </select>
            <small className="text-secondary">
              Usa Ctrl (o Cmd en Mac) para seleccionar varias categorías.
            </small>

            {form.category.length > 0 && (
              <div className="mt-2 text-info">
                Seleccionadas: {form.category.join(", ")}
              </div>
            )}
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
