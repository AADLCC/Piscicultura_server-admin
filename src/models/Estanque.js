const mongoose = require('mongoose');

const estanqueSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: [true, 'El nombre del estanque es obligatorio'],
            trim: true,
        },
        ubicacion: {
            type: String,
            required: [true, 'La ubicación es obligatoria'],
            trim: true,
        },
        capacidad: {
            type: Number,
            required: [true, 'La capacidad (en litros/m3) es obligatoria'],
            min: [0, 'La capacidad no puede ser negativa'],
        },
        especiePez: {
            type: String,
            required: [true, 'La especie de pez es obligatoria'],
            trim: true,
        },
        estado: {
            type: String,
            enum: ['activo', 'inactivo'],
            default: 'activo',
        },
        usuarioId: {
            type: String,
            ref: 'User',
            required: [true, 'El estanque debe pertenecer a un usuario'],
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

module.exports = mongoose.model('Estanque', estanqueSchema);