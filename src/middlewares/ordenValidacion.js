import { body } from "express-validator";
import resultadoValidacion from "./resultadoValidacion.js";

const validarOrder = [
  body("user")
    .notEmpty()
    .withMessage("El usuario es obligatorio")
    .isMongoId()
    .withMessage("El usuario debe ser un ID válido"),

  body("products")
    .notEmpty()
    .withMessage("Los productos son obligatorios")
    .isArray({ min: 1 })
    .withMessage("Debe haber al menos un producto"),

  body("products.*.product")
    .notEmpty()
    .withMessage("El producto es obligatorio")
    .isMongoId()
    .withMessage("El producto debe ser un ID válido"),

  body("products.*.quantity")
    .notEmpty()
    .withMessage("La cantidad es obligatoria")
    .isInt({ min: 1 })
    .withMessage("La cantidad mínima es 1"),

  body("products.*.priceAtPurchase")
    .notEmpty()
    .withMessage("El precio al momento de compra es obligatorio")
    .isFloat({ min: 0 })
    .withMessage("Precio inválido"),

  body("status")
    .optional()
    .isIn(["pendiente", "pagado", "enviado", "entregado", "cancelado"])
    .withMessage("Estado inválido"),

  (req, res, next) => resultadoValidacion(req, res, next),
];

export default validarOrder;