const User = require('../models/User');
const bcrypt = require('bcryptjs');

const createInitialAdmin = async () => {
    try {
        const adminCount = await User.countDocuments({ rol: 'Admin' });

        if (adminCount > 0) {
            console.log('El sistema ya cuenta con usuarios administradores.');
            return;
        }

        const adminData = {
            nombre: 'Admin',
            apellido: 'Principal',
            correo: 'admin@kinal.com',
            telefono: '00000000',
            rol: 'Admin'
        };

        const defaultPassword = 'AdminPassword123!';

        const salt = bcrypt.genSaltSync(10);
        const passwordHashed = bcrypt.hashSync(defaultPassword, salt);

        const initialAdmin = new User({
            ...adminData,
            contrasena: passwordHashed
        });

        await initialAdmin.save();

        console.log('--------------------------------------------------');
        console.log('¡ADMINISTRADOR INICIAL CREADO!');
        console.log(`Correo: ${adminData.correo}`);
        console.log(`Password: ${defaultPassword}`);
        console.log('Por seguridad, cambie esta contraseña tras el primer login.');
        console.log('--------------------------------------------------');

    } catch (error) {
        console.error('Error al ejecutar el seeder de Administrador:', error);
    }
};

module.exports = { createInitialAdmin };