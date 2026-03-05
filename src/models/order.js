import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: [true, "El usuario es obligatorio"],
    },

    products: [
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
        },
        priceAtPurchase: {
          type: Number,
          required: [true, "El precio al momento de compra es obligatorio"],
          min: [0, "Precio inválido"],
        },
      },
    ],

    totalAmount: {
      type: Number,
      required: [true, "El total es obligatorio"],
      min: [0, "Total inválido"],
    },

    status: {
      type: String,
      enum: {
        values: ["pending", "paid", "shipped", "delivered", "cancelled"],
        message: "Estado inválido",
      },
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
