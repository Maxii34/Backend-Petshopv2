import mongoose, { Schema } from "mongoose";

const productoPetSchema = new Schema(
  {
    nombreProducto: {
      type: String,
      required: true,
      trim: true,
      minLength: 5,
      maxLength: 150,
    },
    imagen: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: function (v) {
          return /^https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp)$/i.test(v);
        },
        message: "URL de imagen inválida",
      },
    },
    imagenes: [
      {
        type: String,
        trim: true,
      },
    ], // Imágenes adicionales
    marca: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
      maxLength: 50,
    },
    tipoAnimal: {
      type: String,
      required: true,
      enum: ["Perro", "Gato", "Ave", "Roedor", "Otro"],
    },
    etapaVida: {
      type: String,
      required: true,
      enum: ["Cachorro", "Mediano", "Adulto"],
    },
    tamaño: {
      // Para razas
      type: String,
      enum: ["Mini", "Pequeño", "Mediano", "Grande", "Gigante", "Todas"],
      default: "Todas",
    },
    tipoAlimento: {
      type: String,
      required: true,
      enum: ["Seco", "Húmedo", "Snack", "Premio", "Suplemento"],
    },
    precio: {
      type: Number,
      required: true,
      min: 0,
      max: 900000,
    },
    peso: {
      type: Number,
      required: true,
      min: 3,
      max: 50,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
      max: 1000,
      default: 5,
    },
    descripcion: {
      type: String,
      required: true,
      trim: true,
      minLength: 20,
      maxLength: 500,
    },
    ingredientes: {
      type: String,
      trim: true,
      minLength: 20,
      maxLength: 2000,
    },
    informacionNutricional: {
      type: String,
      trim: true,
      minLength: 20,
      maxLength: 1000,
    },
  },
  {
    timestamps: true,
  }
);

const Alimento = mongoose.model("Alimento", productoPetSchema);

export default Alimento;
