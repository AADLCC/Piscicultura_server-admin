const { check } = require('express-validator');
const { validateFields } = require('./validateFields');

const validateLogin = [
    check('correo', 'El correo es obligatorio y debe tener un formato válido').isEmail(),
    check('contrasena', 'La contraseña es obligatoria').not().isEmpty(),
    validateFields
];

module.exports = { validateLogin };