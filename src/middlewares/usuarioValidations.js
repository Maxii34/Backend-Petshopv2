import { body } from "express-validator";
import resultadoValidacion from "./resultadoValidacion.js";

export const validarUsuario = [
  body("nombre")
    .trim()
    .notEmpty()
    .withMessage("El nombre es dato obligatorio")
    .isLength({ min: 2, max: 50 })
    .withMessage("El nombre debe tener entre 2 y 50 caracteres"),

  body("apellido")
    .trim()
    .notEmpty()
    .withMessage("El apellido es dato obligatorio")
    .isLength({ min: 2, max: 50 })
    .withMessage("El apellido debe tener entre 2 y 50 caracteres"),

  body("email")
    .trim()
    .toLowerCase()
    .notEmpty()
    .withMessage("El email es dato obligatorio")
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
    .withMessage("Email inválido"),

  body("password")
    .notEmpty()
    .withMessage("La contraseña es dato obligatorio")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    )
    .withMessage(
      "La contraseña debe tener al menos una mayúscula, una minúscula, un número y un carácter especial (@$!%*?&)",
    ),

  body("rol")
    .optional()
    .isIn(["usuario", "admin", "moderador"])
    .withMessage("El rol debe ser: usuario, admin o moderador"),

  (req, res, next) => resultadoValidacion(req, res, next),
];

export const validarEdicionUsuario = [
  body("nombre")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El nombre no puede estar vacío si se envía")
    .isLength({ min: 2, max: 50 })
    .withMessage("El nombre debe tener entre 2 y 50 caracteres"),

  body("apellido")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El apellido no puede estar vacío si se envía")
    .isLength({ min: 2, max: 50 })
    .withMessage("El apellido debe tener entre 2 y 50 caracteres"),

  body("rol")
    .optional()
    .isIn(["usuario", "admin", "moderador"])
    .withMessage("El rol debe ser: usuario, admin o moderador"),

  (req, res, next) => resultadoValidacion(req, res, next),
];
