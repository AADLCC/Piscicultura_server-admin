const { Router } = require('express');
const { validateCreateUser } = require('../middlewares/userValidations');
const { login, register } = require('../controllers/auth.controller');
const { validateLogin } = require('../middlewares/authValidations');
const { validateJWT } = require('../middlewares/validateJWT');
const { validateAdminRole } = require('../middlewares/validateRoles');

const router = Router();

router.post('/login', validateLogin, login);

router.post('/register', [
    validateJWT,
    validateAdminRole,
    ...validateCreateUser 
], register);

module.exports = router;