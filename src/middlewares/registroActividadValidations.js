const { check } = require('express-validator');
const { validateFields } = require('./validateFields');

const validateCreateActividad = [
    check('estanqueId', 'El ID del estanque es obligatorio y válido').isMongoId(),
    check('dispositivo', 'El dispositivo es obligatorio').not().isEmpty(),
    check('accion', 'La acción debe ser encendido o apagado').isIn(['encendido', 'apagado']),
    check('modo', 'El modo debe ser automatico o manual').isIn(['automatico', 'manual']),
    validateFields
];

module.exports = { validateCreateActividad };