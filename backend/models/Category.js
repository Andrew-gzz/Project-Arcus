//backend/models/Catalog.js

import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre de la categoría es requerido"],
      trim: true,
    },
    image: {
      type: String,
      default: "",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);
const Category = mongoose.model("Category", categorySchema);

export default Category;
