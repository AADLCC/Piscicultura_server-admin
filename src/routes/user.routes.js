const { Router } = require('express');
const { createUser, getUsers } = require('../controllers/user.controller');
const { validateCreateUser } = require('../middlewares/userValidations');
const { validateJWT } = require('../middlewares/validateJWT');
const { validateAdminRole } = require('../middlewares/validateRoles');

const router = Router();

router.use(validateJWT);
router.use(validateAdminRole);

router.get('/', getUsers);

router.post('/', validateCreateUser, createUser);

module.exports = router;