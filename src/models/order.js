import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: [true, "El usuario es obligatorio"],
  },
  // Array para almacenar múltiples productos en un solo pedido
  products: [{
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "El producto es obligatorio"],
    },
    quantity: {
      type: Number,
      required: [true, "La cantidad es obligatoria"],
      min: [1, "La cantidad mínima es 1"]
    },
  }],
  paymentId: {
    type: String,
    unique: true,
    sparse: true, 
  },
  total: {
    type: Number,
    required: [true, "El total es obligatorio"],
  },
  status: {
    type: String,
    required: true,
    enum: ["pendiente", "pagado", "rechazado", "fallido"],
    default: "pendiente",
  },
}, { timestamps: true }); 

const Order = mongoose.model("Order", orderSchema);

export default Order;