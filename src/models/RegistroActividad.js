const mongoose = require('mongoose');

const registroActividadSchema = new mongoose.Schema(
    {
        estanqueId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Estanque',
            required: [true, 'El ID del estanque es obligatorio']
        },
        dispositivo: {
            type: String,
            required: [true, 'El dispositivo es obligatorio (ej. bomba de aire, alimentador)']
        },
        accion: {
            type: String,
            enum: ['encendido', 'apagado'],
            required: [true, 'La acción es obligatoria']
        },
        modo: {
            type: String,
            enum: ['automatico', 'manual'],
            required: [true, 'El modo de operación es obligatorio']
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

module.exports = mongoose.model('RegistroActividad', registroActividadSchema);