//backend/controllers/productController.js
import Product from "../models/Product.js";

// @desc    Obtener todos los productos (con filtros y paginación)
// @route   GET /api/products
export const getProducts = async (req, res) => {
  try {
    const {
      category,
      search,
      inStock,
      minRating,
      maxRating,
      page = 1,
      limit = 20,
    } = req.query;

    const query = { isActive: true };

    // FILTRO POR CATEGORÍA
    // Soporta una o varias categorías
    if (category) {
      const categoryFilter = Array.isArray(category) ? category : [category];
      query.category = { $in: categoryFilter };
    }

    // FILTRO POR BÚSQUEDA
    // Busca coincidencias en nombre o descripción
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // FILTRO POR STOCK
    // inStock=true  => stock mayor a 0
    // inStock=false => stock igual a 0
    if (inStock === "true") {
      query.stock = { $gt: 0 };
    } else if (inStock === "false") {
      query.stock = 0;
    }

    // FILTRO POR RATING PROMEDIO
    // Permite usar mínimo, máximo o ambos
    if (minRating !== undefined || maxRating !== undefined) {
      query.ratingAverage = {};

      if (minRating !== undefined && !isNaN(Number(minRating))) {
        query.ratingAverage.$gte = Number(minRating);
      }

      if (maxRating !== undefined && !isNaN(Number(maxRating))) {
        query.ratingAverage.$lte = Number(maxRating);
      }

      // Si por alguna razón no se agregó ninguna condición válida, eliminamos el objeto vacío
      if (Object.keys(query.ratingAverage).length === 0) {
        delete query.ratingAverage;
      }
    }

    const products = await Product.find(query)
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    const total = await Product.countDocuments(query);

    res.json({
      products,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Obtener un solo producto por ID
// @route   GET /api/products/:id
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Crear un nuevo producto (Solo Admin)
// @route   POST /api/products
export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Actualizar producto (Solo Admin)
// @route   PUT /api/products/:id
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Eliminar producto (Solo Admin)
// @route   DELETE /api/products/:id
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Calificar un producto
// @route   POST /api/products/:id/reviews
// @access  Privado (Solo usuarios logeados)
export const rateProduct = async (req, res) => {
  try {
    const { rating } = req.body;
    const productId = req.params.id;

    // 1. Validar que el rating sea correcto (entre 1 y 5)
    const numericRating = Number(rating);
    if (!numericRating || numericRating < 1 || numericRating > 5) {
      return res
        .status(400)
        .json({ message: "Por favor ingresa una calificación válida (1-5)" });
    }

    // 2. Buscar el producto
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    // 3. VALIDACIÓN: Revisar si el usuario ya calificó este producto
    // req.user._id viene del middleware 'protect'
    const existingRatingIndex = product.ratings.findIndex(
      (r) => r.user.toString() === req.user._id.toString(),
    );

    if (existingRatingIndex !== -1) {
      // OPCIÓN A (Recomendada): Si ya votó, actualizamos su voto
      product.ratings[existingRatingIndex].value = numericRating;

      // OPCIÓN B: Si quieres prohibir que cambien su voto, borra la línea de arriba y descomenta esta:
      // return res.status(400).json({ message: "Ya has calificado este producto anteriormente" });
    } else {
      // Si no ha votado, agregamos la calificación al array
      const newRating = {
        user: req.user._id,
        value: numericRating,
      };
      product.ratings.push(newRating);
    }

    // 4. Recalcular el promedio y la cantidad total de votos
    product.ratingCount = product.ratings.length;

    // Sumamos todos los valores y los dividimos entre la cantidad de votos
    const totalRating = product.ratings.reduce(
      (acc, item) => acc + item.value,
      0,
    );
    product.ratingAverage = totalRating / product.ratings.length;

    // 5. Guardar los cambios en la base de datos
    await product.save();

    res.status(201).json({
      message: "Calificación procesada con éxito",
      ratingAverage: product.ratingAverage,
      ratingCount: product.ratingCount,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
