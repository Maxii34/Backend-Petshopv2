import { params } from "express-validator";
import resultadoValidacion from "./resultadoValidacion";

const validacionID = [
  params("id").isMongoId().withMessage("El ID proporcionado no es válido"),
  (req, res, next) => resultadoValidacion(req, res, next),
];

export default validacionID;
