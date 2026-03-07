const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            default: () => crypto.randomUUID(),
        },
        nombre: {
            type: String,
            required: [true, 'El nombre es obligatorio'],
            trim: true,
        },
        apellido: {
            type: String,
            required: [true, 'El apellido es obligatorio'],
            trim: true,
        },
        correo: {
            type: String,
            required: [true, 'El correo electrónico es obligatorio'],
            unique: true,
            trim: true,
            lowercase: true,
        },
        telefono: {
            type: String,
            required: [true, 'El teléfono es obligatorio'],
            trim: true,
        },
        contrasena: {
            type: String,
            required: [true, 'La contraseña es obligatoria'],
        },
        rol: {
            type: String,
            enum: ['Admin', 'User'],
            default: 'User',
        },
    },
    {
        timestamps: true, 
        versionKey: false,
    }
);

userSchema.methods.toJSON = function () {
    const { contrasena, ...user } = this.toObject();
    return user;
};

module.exports = mongoose.model('User', userSchema);