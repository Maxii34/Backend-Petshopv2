import mongoose, { Schema } from "mongoose";

const productosSchema = new Schema({
    nombreProducto: { 
        type: String, 
        required: true,
        trim: true,
        minLength: 5,
        maxLength: 100
    },
    imagen: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: function(v) {
                return /^https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp)$/i.test(v);
            },
        }
    },
    alt: {
        type: String,
        required: true,
        trim: true,
        minLength: 4,
        maxLength: 20
    },
    marca: {
        type: String,
        required: true,
        trim: true,
        minLength: 2,
        maxLength: 50
    },
    animal: {
        type: String,
        required: true,
        enum: ['Perro', 'Gato', 'Otro']
    },
    etapa: {
        type: String,
        required: true,
        enum: ['Cachorro', 'Mediano', 'Adulto']
    },
    precioOriginal: {
        type: Number,
        required: true,
        min: 0,
        max: 300000
    },
    precioEfectivo: {
        type: Number,
        required: true,
        min: 0,
        max: 300000
    },
    cuotas: {
        type: Number,
        default: 0,
        min: 0,
        max: 12
    },
    peso: {
        type: Number,
        required: true,
        min: 1,
        max: 60
    },
    stock: {
        type: Number,
        required: true,
        min: 0
    },
    categoria: {
        type: String,
        required: true,
        enum: ['Alimentos', 'Juguetes', 'Accesorios', 'Higiene', 'Camas y Transporte', 'Suplementos']
    },
    descripcion: {
        type: String,
        required: true,
        trim: true,
        minLength: 10,
        maxLength: 100
    }
}, {
    timestamps: true 
});

const Productos = mongoose.model("productos", productosSchema);

export default Productos;