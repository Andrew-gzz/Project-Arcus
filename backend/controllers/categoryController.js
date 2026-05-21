// backend/controllers/categoryController.js
import Category from "../models/Category.js";
import Product from "../models/Product.js";
import logger from "../utils/logger.js";

// @desc    Obtener todas las categorías activas
// @route   GET /api/categories
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true });
    res.json(categories);
  } catch (error) {
    logger.error(`Error en getCategories: ${error.message}`, { stack: error.stack });
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
    logger.info(`Categoría creada: ${name}`);
    res.status(201).json(category);
  } catch (error) {
    logger.error(`Error en createCategory: ${error.message}`, { stack: error.stack });
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

    logger.info(`Categoría desactivada: ${category.name}`);
    res.json({ message: "Categoría desactivada correctamente" });
  } catch (error) {
    logger.error(`Error en deleteCategory: ${error.message}`, { stack: error.stack });
    res.status(500).json({ message: error.message });
  }
};

// @desc    Actualizar una categoría (Solo Admin)
// @route   PUT /api/categories/:id
export const updateCategory = async (req, res) => {
  try {
    const { name, image } = req.body;
    const { id } = req.params;

    // 1. Buscar la categoría actual
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }

    const oldName = category.name;
    const newName = typeof name === "string" ? name.trim() : oldName;

    // 2. Si cambió el nombre, validar duplicados
    if (newName !== oldName) {
      const categoryExists = await Category.findOne({
        name: newName,
        _id: { $ne: id },
      });

      if (categoryExists) {
        return res
          .status(400)
          .json({ message: "Ya existe otra categoría con ese nombre" });
      }
    }

    // 3. Actualizar la categoría
    category.name = newName;

    if (typeof image === "string") {
      category.image = image;
    }

    const updatedCategory = await category.save();

    // 4. Si cambió el nombre, actualizar productos que la usen
    let updatedProductsCount = 0;

    if (newName !== oldName) {
      const result = await Product.updateMany({ category: oldName }, [
        {
          $set: {
            category: {
              $map: {
                input: "$category",
                as: "cat",
                in: {
                  $cond: [{ $eq: ["$$cat", oldName] }, newName, "$$cat"],
                },
              },
            },
          },
        },
      ]);

      updatedProductsCount = result.modifiedCount || 0;
    }

    res.json({
      message:
        newName !== oldName
          ? "Categoría actualizada y propagada a los productos correctamente"
          : "Categoría actualizada correctamente",
      category: updatedCategory,
      updatedProductsCount,
      oldName,
      newName,
    });
  } catch (error) {
    logger.error(`Error en updateCategory: ${error.message}`, { stack: error.stack });
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
    if (error.kind === "ObjectId") {
      return res.status(404).json({ message: "ID de categoría no válido" });
    }
    logger.error(`Error en getCategoryById: ${error.message}`, { stack: error.stack });
    res.status(500).json({ message: error.message });
  }
};
