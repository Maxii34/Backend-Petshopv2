import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },

    descripcion: {
      type: String,
      required: true,
    },

    precio: {
      type: Number,
      required: true,
      min: 0,
    },

    stock: {
      type: Number,
      required: true,
      default: 0,
    },

    imagenPrincipal: {
      type: String,
      required: true,
    },

    imagenes: [String],

    marca: String,

    tipoAnimal: {
      type: String,
      enum: ["Perro", "Gato", "Ave", "Roedor", "Otro"],
    },

    categoria: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    // 🔥 Datos específicos según tipo
    detalles: {
      type: Object,
      default: {},
    },
  },
  { timestamps: true },
);

export default mongoose.model("Product", productSchema);
