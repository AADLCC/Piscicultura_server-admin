const { Router } = require('express');
const { createLectura, getLecturas, getLecturasByEstanque, deleteLectura } = require('../controllers/lectura.controller');
const { validateCreateLectura } = require('../middlewares/lecturaValidations');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validateFields');
const { validateJWT } = require('../middlewares/validateJWT');
const { validateAdminRole } = require('../middlewares/validateRoles');

const router = Router();
const validateMongoId = [ check('id', 'No es un ID válido').isMongoId(), validateFields ];
const validateEstanqueId = [ check('estanqueId', 'No es un ID válido').isMongoId(), validateFields ];

router.use(validateJWT);
router.use(validateAdminRole);

router.post('/', validateCreateLectura, createLectura);
router.get('/', getLecturas);
router.get('/estanque/:estanqueId', validateEstanqueId, getLecturasByEstanque);
router.delete('/:id', validateMongoId, deleteLectura);

module.exports = router;