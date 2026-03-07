const { check } = require('express-validator');
const { validateFields } = require('./validateFields');

const validateCreateLectura = [
    check('estanqueId', 'El ID del estanque es obligatorio y debe ser válido').isMongoId(),
    check('temperatura', 'La temperatura es obligatoria y numérica').isNumeric(),
    check('ph', 'El pH debe estar entre 0 y 14').isFloat({ min: 0, max: 14 }),
    check('nivelOxigeno', 'El nivel de oxígeno es obligatorio').isNumeric(),
    check('nivelAgua', 'El nivel de agua es obligatorio').not().isEmpty(),
    validateFields
];

module.exports = { validateCreateLectura };