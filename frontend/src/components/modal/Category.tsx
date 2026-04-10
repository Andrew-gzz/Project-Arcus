import { useEffect, useState } from "react";
import {
  addCategory,
  getCategories,
  updateCategory, // Importamos la nueva función
} from "../../services/categoryService";

interface ToastProps {
  show: boolean;
  onClose: () => void;
  onConfirm: (productData: any) => void;
}

export default function AddCategory({ show, onClose, onConfirm }: ToastProps) {
  // 1. ESTADOS
  const [form, setForm] = useState({
    name: "",
    image: "",
  });
  const [selectedCategoryId, setSelectedCategoryId] = useState(""); // Rastrear ID para editar
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [categories, setCategories] = useState<any[]>([]);

  // 2. EFECTOS (Regla de Hooks: siempre arriba)
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        const sortedCategories = data.sort((a: any, b: any) =>
          a.name.localeCompare(b.name),
        );
        setCategories(sortedCategories);
      } catch (error) {
        console.error("Error al cargar las categorías:", error);
      }
    };
    if (show) fetchCategories();
  }, [show]);

  // Si se cierra el modal, reseteamos el estado de edición
  useEffect(() => {
    if (!show) {
      setForm({ name: "", image: "" });
      setSelectedCategoryId("");
      setError("");
      setSuccess("");
    }
  }, [show]);

  if (!show) return null;

  // 3. MANEJADORES

  // Maneja la selección del ComboBox
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    setSelectedCategoryId(id);

    if (id) {
      // Buscamos la categoría en nuestra lista local
      const categoryToEdit = categories.find((cat) => cat._id === id);
      if (categoryToEdit) {
        setForm({
          name: categoryToEdit.name,
          image: categoryToEdit.image || "",
        });
      }
    } else {
      // Si selecciona la opción vacía, limpiamos para crear una nueva
      setForm({ name: "", image: "" });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.image) {
      setError("Por favor rellena todos los campos.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      let result;
      if (selectedCategoryId) {
        // MODO EDICIÓN: Llamamos a updateCategory
        result = await updateCategory(selectedCategoryId, form);
        setSuccess("¡Categoría actualizada correctamente!");
      } else {
        // MODO CREACIÓN: Llamamos a addCategory
        result = await addCategory(form);
        setSuccess("¡Categoría creada correctamente!");
      }

      // Esperar un momento para que el usuario vea el mensaje de éxito
      setTimeout(() => {
        onConfirm(result);
        onClose();
      }, 1500);
    } catch (err: any) {
      setError(err.message || "Error al procesar la categoría");
    } finally {
      setLoading(false);
    }
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
        <h4 className="text-center mb-4 fw-bold">
          {selectedCategoryId ? "Editar Categoría" : "Nueva Categoría"}
        </h4>

        <form onSubmit={handleSubmit}>
          {/* COMBOBOX: Para seleccionar y editar */}
          <div className="mb-3">
            <label className="form-label text-info">
              ¿Quieres editar una existente?
            </label>
            <select
              className="form-select bg-secondary text-white border-0"
              value={selectedCategoryId}
              onChange={handleSelectChange}
            >
              <option value="">-- Crear Nueva --</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <hr className="border-secondary" />

          {/* Campo Nombre */}
          <div className="mb-3">
            <label className="form-label">Nombre *</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="form-control bg-secondary text-white border-0"
              placeholder="Ej: RPG, Aventura..."
              required
            />
          </div>

          {/* Campo URL Imagen */}
          <div className="mb-3">
            <label className="form-label">URL de Imagen *</label>
            <input
              name="image"
              value={form.image}
              onChange={handleChange}
              className="form-control bg-secondary text-white border-0"
              placeholder="https://..."
              required
            />
          </div>

          {error && <div className="alert alert-danger py-2">{error}</div>}
          {success && <div className="alert alert-success py-2">{success}</div>}

          <div className="d-flex justify-content-center gap-3 mt-4">
            <button
              type="submit"
              disabled={loading}
              className={`btn ${selectedCategoryId ? "btn-warning" : "btn-info"} px-4 rounded-pill fw-bold`}
            >
              {loading
                ? "Procesando..."
                : selectedCategoryId
                  ? "Guardar Cambios"
                  : "Crear Categoría"}
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
