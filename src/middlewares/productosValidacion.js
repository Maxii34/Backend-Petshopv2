import { body } from "express-validator";
import resultadoValidacion from "./resultadoValidacion.js";

const validarProducto = [
  body("nombre")
    .trim()
    .notEmpty()
    .withMessage("El nombre del producto es obligatorio")
    .isLength({ min: 5, max: 150 })
    .withMessage("El nombre debe tener entre 5 y 150 caracteres"),

  body("descripcion")
    .trim()
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ min: 20, max: 500 })
    .withMessage("La descripción debe tener entre 20 y 500 caracteres"),

    body("caracteristica") 
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ min: 20, max: 1000 })
    .withMessage("La caracteristica debe tener entre 20 y 1000 caracteres"),

    body("ingrediente")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ min: 20, max: 1000 })
    .withMessage("Los ingredientes debe tener entre 20 y 1000 caracteres"),

  body("precio")
    .notEmpty()
    .withMessage("El precio es obligatorio")
    .isFloat({ min: 0, max: 900000 })
    .withMessage("El precio debe ser un número entre 0 y 900000"),

  body("stock")
    .notEmpty()
    .withMessage("El stock es obligatorio")
    .isInt({ min: 0, max: 10000 })
    .withMessage("El stock debe ser un número entero entre 0 y 10000"),

  body("marca")
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("La marca debe tener entre 2 y 50 caracteres"),

  body("tipoAnimal")
    .optional()
    .isIn(["Perro", "Gato", "Ave", "Roedor", "Otro"])
    .withMessage("Tipo de animal inválido"),

  body("categoria")
    .trim()
    .notEmpty()
    .withMessage("La categoría es obligatoria")
    .isIn(["Alimentos", "Juguetes", "Higiene", "Accesorios", "Medicamentos"])
    .withMessage("Categoría inválida"),

  body("detalles")
  .optional()
  .isObject()
  .withMessage("Los detalles deben ser un objeto válido"),

  body("enOferta")
    .optional()
    .isBoolean()
    .withMessage("El campo enOferta debe ser un valor booleano"),

  body("descuento")
    .optional()
    .isFloat({ min: 0, max: 90 })
    .withMessage("El descuento debe ser un número entre 0 y 90"),

  body("esNuevo")
    .optional()
    .isBoolean()
    .withMessage("El campo esNuevo debe ser un valor booleano"),

  body("destacado")
    .optional()
    .isBoolean()
    .withMessage("El campo destacado debe ser un valor booleano"),

  (req, res, next) => resultadoValidacion(req, res, next),
];

export default validarProducto;
