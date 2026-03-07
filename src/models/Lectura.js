const mongoose = require('mongoose');

const lecturaSchema = new mongoose.Schema(
    {
        estanqueId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Estanque',
            required: [true, 'El ID del estanque es obligatorio']
        },
        temperatura: {
            type: Number,
            required: [true, 'La temperatura es obligatoria']
        },
        ph: {
            type: Number,
            required: [true, 'El pH es obligatorio'],
            min: 0,
            max: 14
        },
        nivelOxigeno: {
            type: Number,
            required: [true, 'El nivel de oxígeno (mg/L) es obligatorio']
        },
        nivelAgua: {
            type: String,
            required: [true, 'El nivel de agua es obligatorio']
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

module.exports = mongoose.model('Lectura', lecturaSchema);