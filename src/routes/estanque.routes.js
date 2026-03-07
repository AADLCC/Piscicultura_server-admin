const { Router } = require('express');
const { createEstanque, getEstanques, getEstanqueById, updateEstanque, deleteEstanque } = require('../controllers/estanque.controller');
const { validateCreateEstanque, validateUpdateEstanque } = require('../middlewares/estanqueValidations');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validateFields');
const { validateJWT } = require('../middlewares/validateJWT');
const { validateAdminRole } = require('../middlewares/validateRoles');

const router = Router();
const validateMongoId = [ check('id', 'No es un ID válido').isMongoId(), validateFields ];

router.use(validateJWT);
router.use(validateAdminRole);

router.post('/', validateCreateEstanque, createEstanque);
router.get('/', getEstanques);
router.get('/:id', validateMongoId, getEstanqueById);
router.put('/:id', [...validateMongoId, ...validateUpdateEstanque], updateEstanque);
router.delete('/:id', validateMongoId, deleteEstanque);

module.exports = router;