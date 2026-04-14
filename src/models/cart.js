import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: [true, "El usuario es obligatorio"],
      unique: true,
    },

    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: [true, "El producto es obligatorio"],
        },
        quantity: {
          type: Number,
          required: [true, "La cantidad es obligatoria"],
          min: [1, "La cantidad mínima es 1"],
          max: [100, "Cantidad demasiado alta"],
        },
        precioConDescuento: {
          type: Number,
          optional: true,
        }
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Cart", cartSchema);
