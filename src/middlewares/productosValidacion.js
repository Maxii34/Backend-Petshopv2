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
    .notEmpty()
    .withMessage("La descripción es obligatoria")
    .isLength({ min: 20, max: 500 })
    .withMessage("La descripción debe tener entre 20 y 500 caracteres"),

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

  body("imagenPrincipal")
    .trim()
    .notEmpty()
    .withMessage("La imagen principal es obligatoria")
    .matches(/^https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp)$/i)
    .withMessage("URL de imagen inválida"),

  body("imagenes")
    .optional()
    .isArray()
    .withMessage("Las imágenes deben ser un array")
    .custom((arr) => {
      const regex = /^https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp)$/i;
      return arr.every((url) => regex.test(url));
    })
    .withMessage("Una de las URLs de imagen es inválida"),

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
    .notEmpty()
    .withMessage("La categoría es obligatoria")
    .isIn(["Alimentos", "Juguetes", "Higiene", "Accesorios", "Medicamentos"])
    .withMessage("Categoría inválida"),

  body("detalles")
    .optional()
    .isObject()
    .withMessage("Los detalles deben ser un objeto"),

  (req, res, next) => resultadoValidacion(req, res, next),
];

export default validarProducto;
