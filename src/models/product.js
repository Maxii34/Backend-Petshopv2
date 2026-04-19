import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre del producto es obligatorio"],
      trim: true,
      minlength: [5, "El nombre debe tener al menos 5 caracteres"],
      maxlength: [150, "El nombre no puede superar los 150 caracteres"],
    },

    descripcion: {
      type: String,
      trim: true,
      maxlength: [500, "La descripción no puede superar los 500 caracteres"],
    },

    caracteristica: {
      type: String,
      trim: true,
      maxlength: [
        1000,
        "La caracteristica no puede superar los 1000 caracteres",
      ],
    },

    ingrediente: {
      type: String,
      trim: true,
      maxlength: [
        1000,
        "Los ingredientes no puede superar los 1000 caracteres",
      ],
    },

    precio: {
      type: Number,
      required: [true, "El precio es obligatorio"],
      min: [0, "El precio no puede ser negativo"],
      max: [900000, "El precio excede el máximo permitido"],
    },

    stock: {
      type: Number,
      required: [true, "El stock es obligatorio"],
      min: [0, "El stock no puede ser negativo"],
      max: [10000, "Stock demasiado alto"],
      default: 0,
    },

    imagenes: [
      {
        type: String,
        required: [true, "Debe haber al menos una imagen del producto"],
        trim: true,
        validate: {
          validator: function (v) {
            return /^https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp)$/i.test(v);
          },
          message: "Una de las URLs de imagen es inválida",
        },
      },
    ],

    marca: {
      type: String,
      trim: true,
      minlength: [2, "La marca debe tener al menos 2 caracteres"],
      maxlength: [50, "La marca no puede superar los 50 caracteres"],
    },

    tipoAnimal: {
      type: String,
      enum: {
        values: ["Perro", "Gato", "Ave", "Roedor", "Otro"],
        message: "Tipo de animal inválido",
      },
    },

    categoria: {
      type: String,
      required: [true, "La categoría es obligatoria"],
      enum: {
        values: [
          "Alimentos",
          "Juguetes",
          "Higiene",
          "Accesorios",
          "Medicamentos",
        ],
        message: "Categoría inválida",
      },
    },

    detalles: {
      type: Object,
      default: {},
    },

    enOferta: {
      type: Boolean,
      default: false,
    },
    descuento: {
      type: Number,
      default: 0,
      min: 0,
      max: 90,
    },

    esNuevo: {
      type: Boolean,
      default: false,
    },

    destacado: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Product", productSchema);
