// frontend/src/components/modal/AddingProduct.tsx
import { useState } from "react";
import { addProduct } from "../../services/productService";
interface ToastProps {
  show: boolean;
  onClose: () => void;
  // Cambiamos onConfirm para que reciba los datos validados
  onConfirm: (productData: any) => void;
}

export default function AddProduct({ show, onClose, onConfirm }: ToastProps) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
    stock: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(""); // Mensaje de éxito

  if (!show) return null;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (error) setError(""); // Limpiar error al escribir
  };

  const handleSumbit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // --- LOGICA DE VALIDACIONES ---

    // 1. Campos obligatorios
    if (
      !form.name ||
      !form.description ||
      !form.price ||
      !form.category ||
      !form.image
    ) {
      setError("Todos los campos marcados con * son obligatorios");
      setLoading(false);
      return;
    }

    // 2. Validación de Precio (Número positivo)
    if (parseInt(form.price) <= 0) {
      setError("El precio debe ser un número mayor a 0");
      setLoading(false);
      return;
    }

    // 3. Validación de Stock (Entero no negativo)
    if (parseInt(form.stock) < 0) {
      setError("El stock no puede ser negativo");
      setLoading(false);
      return;
    }

    try {
      // Si pasa todas las validaciones, enviamos los datos al padre (Admin.tsx)
      setSuccess("");

      const productData = await addProduct({
        name: form.name,
        description: form.description,
        price: Number(form.price),
        category: form.category,
        image: form.image,
        stock: Number(form.stock),
      });

      setSuccess(`Producto agregado correctamente`);

      setTimeout(() => {
        onConfirm(productData);
      }, 1200);
      // Limpiar formulario tras éxito
      setForm({
        name: "",
        description: "",
        price: "",
        category: "",
        image: "",
        stock: "",
      });
    } catch (err: any) {
      setError(err.message || "Error al guardar el producto");
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

        <form onSubmit={handleSumbit}>
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
            <input
              name="description"
              value={form.description}
              onChange={handleChange}
              className="form-control bg-secondary text-white border-0"
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
            <label className="form-label">Categoría *</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="form-select bg-secondary text-white border-0"
            >
              <option value="">Selecciona...</option>
              <option value="VideoJuegos">VideoJuegos</option>
              <option value="Consolas">Consolas</option>
              <option value="Accesorios">Accesorios</option>
              <option value="Controles">Controles</option>
            </select>
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
