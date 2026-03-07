const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const login = async (req, res) => {
    const { correo, contrasena } = req.body;

    try {
        const user = await User.findOne({ correo });
        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'Credenciales incorrectas - correo'
            });
        }

        const validPassword = bcrypt.compareSync(contrasena, user.contrasena);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Credenciales incorrectas - contraseña'
            });
        }

        const payload = { uid: user._id, rol: user.rol };
        const token = jwt.sign(
            payload, 
            process.env.JWT_SECRET, 
            { expiresIn: '4h' }
        );

        res.json({
            ok: true,
            user,
            token
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado al iniciar sesión. Hable con el administrador.'
        });
    }
};

const register = async (req, res) => {
    const { contrasena } = req.body;

    try {
        const newUser = new User(req.body);

        const salt = bcrypt.genSaltSync(10);
        newUser.contrasena = bcrypt.hashSync(contrasena, salt);

        await newUser.save();

        const payload = { uid: newUser._id, rol: newUser.rol };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '4h' });

        res.status(201).json({
            ok: true,
            msg: 'Registro exitoso',
            user: newUser,
            token
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado al registrarse.'
        });
    }
};

module.exports = { login, register };