const { check } = require('express-validator');
const { validateFields } = require('./validateFields');

const validateCreateEstanque = [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('ubicacion', 'La ubicación es obligatoria').not().isEmpty(),
    check('capacidad', 'La capacidad debe ser un número positivo').isFloat({ min: 0 }),
    check('especiePez', 'La especie de pez es obligatoria').not().isEmpty(),
    check('usuarioId', 'El ID del usuario es obligatorio y debe ser un UUID válido').isUUID(),
    validateFields
];

const validateUpdateEstanque = [
    check('capacidad', 'La capacidad debe ser un número positivo').optional().isFloat({ min: 0 }),
    check('estado', 'El estado no es válido').optional().isIn(['activo', 'inactivo']),
    validateFields
];

module.exports = { validateCreateEstanque, validateUpdateEstanque };