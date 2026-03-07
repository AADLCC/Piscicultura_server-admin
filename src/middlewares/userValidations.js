const { check } = require('express-validator');
const { validateFields } = require('./validateFields');
const User = require('../models/User');

const checkEmailExists = async (correo) => {
    const emailExists = await User.findOne({ correo });
    if (emailExists) {
        throw new Error(`El correo ${correo} ya está registrado en el sistema`);
    }
};

const validateCreateUser = [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('apellido', 'El apellido es obligatorio').not().isEmpty(),
    check('correo', 'Agrega un correo válido').isEmail(),
    check('correo').custom(checkEmailExists),
    check('telefono', 'El teléfono es obligatorio').not().isEmpty(),
    check('contrasena', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 }),
    check('rol', 'El rol no es válido').optional().isIn(['Admin', 'User']),
    validateFields
];

module.exports = {
    validateCreateUser
};