import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre de la categoría es obligatorio"],
      trim: true,
      minlength: [3, "La categoría debe tener al menos 3 caracteres"],
      maxlength: [50, "La categoría no puede superar los 50 caracteres"],
      unique: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Category", categorySchema);
