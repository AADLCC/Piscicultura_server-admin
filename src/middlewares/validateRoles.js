const validateAdminRole = (req, res, next) => {
    if (!req.user) {
        return res.status(500).json({ 
            ok: false, 
            msg: 'Se intentó verificar el rol sin validar el token primero' 
        });
    }

    const { rol, nombre } = req.user;

    if (rol !== 'Admin') {
        return res.status(403).json({ 
            ok: false, 
            msg: `${nombre} no tiene privilegios de administrador para realizar esta acción` 
        });
    }

    next();
};

module.exports = { validateAdminRole };