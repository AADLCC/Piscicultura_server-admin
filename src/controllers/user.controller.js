const bcrypt = require('bcryptjs');
const User = require('../models/User');

const createUser = async (req, res) => {
    const { contrasena } = req.body;

    try {
        const newUser = new User(req.body);

        const salt = bcrypt.genSaltSync(10);
        newUser.contrasena = bcrypt.hashSync(contrasena, salt);

        await newUser.save();

        res.status(201).json({
            ok: true,
            msg: 'Usuario creado exitosamente',
            usuario: newUser
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado al crear el usuario. Hable con el administrador.'
        });
    }
};

const getUsers = async (req, res) => {
    try {
        const usuarios = await User.find();

        res.status(200).json({
            ok: true,
            usuarios
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener los usuarios'
        });
    }
};

module.exports = {
    createUser,
    getUsers
};