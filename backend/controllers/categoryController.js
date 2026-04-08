// backend/controllers/categoryController.js
import Category from "../models/Category.js";

// @desc    Obtener todas las categorías activas
// @route   GET /api/categories
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Crear una categoría (Solo Admin)
// @route   POST /api/categories
export const createCategory = async (req, res) => {
  try {
    const { name, image } = req.body;
    const categoryExists = await Category.findOne({ name });

    if (categoryExists) {
      return res.status(400).json({ message: "La categoría ya existe" });
    }

    const category = await Category.create({ name, image });
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Eliminar/Desactivar categoría (Solo Admin)
// @route   DELETE /api/categories/:id
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }

    // En lugar de borrarla físicamente, la desactivamos
    category.isActive = false;
    await category.save();

    res.json({ message: "Categoría desactivada correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Actualizar una categoría (Solo Admin)
// @route   PUT /api/categories/:id
export const updateCategory = async (req, res) => {
  try {
    const { name, image } = req.body;
    const { id } = req.params;

    // 1. Buscar la categoría
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }

    // 2. Si se intenta cambiar el nombre, verificar que no exista ya
    if (name && name !== category.name) {
      const categoryExists = await Category.findOne({ name });
      if (categoryExists) {
        return res
          .status(400)
          .json({ message: "Ya existe otra categoría con ese nombre" });
      }
      category.name = name;
    }

    // 3. Actualizar imagen si viene en el body
    if (image) category.image = image;

    const updatedCategory = await category.save();
    res.json(updatedCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Obtener una sola categoría por ID
// @route   GET /api/categories/:id
export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }

    // Opcional: Verificar si está activa (si así lo deseas)
    if (!category.isActive) {
      return res.status(400).json({ message: "La categoría está desactivada" });
    }

    res.json(category);
  } catch (error) {
    // Manejo de error por ID con formato inválido
    if (error.kind === "ObjectId") {
      return res.status(404).json({ message: "ID de categoría no válido" });
    }
    res.status(500).json({ message: error.message });
  }
};
