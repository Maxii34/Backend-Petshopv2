import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const usuarioSchema = new Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre es requerido"],
      trim: true,
      minlength: [2, "El nombre debe tener al menos 2 caracteres"],
      maxlength: [50, "El nombre no puede exceder 50 caracteres"],
    },
    apellido: {
      type: String,
      required: [true, "El apellido es requerido"],
      trim: true,
      minlength: [2, "El apellido debe tener al menos 2 caracteres"],
      maxlength: [50, "El apellido no puede exceder 50 caracteres"],
    },
    email: {
      type: String,
      required: [true, "El email es requerido"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Email inválido"],
    },
    password: {
      type: String,
      required: [true, "La contraseña es requerida"],
      minlength: [8, "La contraseña debe tener al menos 8 caracteres"],
      match: [
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial",
      ],
    },
    rol: {
      type: String,
      enum: ["usuario", "admin", "moderador"],
      default: "usuario",
    },
    ultimoAcceso: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

//encripta la contraseña antes de guardar
usuarioSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

//metodo para comprar contraseñas (login)
usuarioSchema.method.compararPassword = async function (passwordIngresado) {
  return await bcrypt.compare(passwordIngresado, this.password);
};

usuarioSchema.methods.toJSON = function () {
  const usuario = this.toObject();
  delete usuario.password;
  return usuario;
};

const Usuario = mongoose.model("Usuario", usuarioSchema);

export default Usuario;
