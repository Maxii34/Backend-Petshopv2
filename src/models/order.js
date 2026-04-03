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
        values: ["pendiente", "pagado", "enviado", "entregado", "cancelado"],
        message: "Estado inválido",
      },
      default: "pendiente",
    },
    payment: {
      paymentId: String, // ID de Mercado Pago
      method: {
        type: String,
        enum: ["mercadopago", "transferencia", "efectivo"],
        default: "mercadopago",
      },
      paidAt: Date, // Cuándo se pagó
      reference: String, // Referencia adicional si es necesario
    },
  },
  { timestamps: true }
);