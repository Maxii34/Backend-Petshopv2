import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
      required: [true, "El usuario es obligatorio"],
    },

    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
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
          min: [0, "El precio no puede ser negativo"],
        },
      },
    ],

    paymentId: {
      type: String,
      unique: true,
      sparse: true,
    },

    totalAmount: {
      type: Number,
      required: [true, "El total es obligatorio"],
      min: [0, "El total no puede ser negativo"],
    },

    status: {
      type: String,
      required: true,
      enum: [
        "pendiente",
        "pagado",
        "rechazado",
        "fallido",
        "cancelado",
        "enviado",
        "entregado",
      ],
      default: "pendiente",
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;