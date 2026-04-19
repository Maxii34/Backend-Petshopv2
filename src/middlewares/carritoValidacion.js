import { body } from "express-validator";
import resultadoValidacion from "./resultadoValidacion.js";

const validarCart = [
  body("user")
    .notEmpty()
    .withMessage("El usuario es obligatorio")
    .isMongoId()
    .withMessage("El usuario debe ser un ID válido"),

  body("items")
    .notEmpty()
    .withMessage("Los items son obligatorios")
    .isArray({ min: 1 })
    .withMessage("Debe haber al menos un item"),

  body("items.*.product")
    .notEmpty()
    .withMessage("El producto es obligatorio")
    .isMongoId()
    .withMessage("El producto debe ser un ID válido"),

  body("items.*.quantity")
    .notEmpty()
    .withMessage("La cantidad es obligatoria")
    .isInt({ min: 1, max: 100 })
    .withMessage("La cantidad debe ser un número entero entre 1 y 100"),

  (req, res, next) => resultadoValidacion(req, res, next),
];

export default validarCart;
