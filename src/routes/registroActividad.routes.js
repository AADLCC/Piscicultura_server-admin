const { Router } = require('express');
const { createActividad, getActividades, getActividadesByEstanque, deleteActividad } = require('../controllers/registroActividad.controller');
const { validateCreateActividad } = require('../middlewares/registroActividadValidations');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validateFields');
const { validateJWT } = require('../middlewares/validateJWT');
const { validateAdminRole } = require('../middlewares/validateRoles');

const router = Router();
const validateMongoId = [ check('id', 'No es un ID válido').isMongoId(), validateFields ];
const validateEstanqueId = [ check('estanqueId', 'No es un ID válido').isMongoId(), validateFields ];

router.use(validateJWT);
router.use(validateAdminRole);

router.post('/', validateCreateActividad, createActividad);
router.get('/', getActividades);
router.get('/estanque/:estanqueId', validateEstanqueId, getActividadesByEstanque);
router.delete('/:id', validateMongoId, deleteActividad);

module.exports = router;