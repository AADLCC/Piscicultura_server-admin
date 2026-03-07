require('dotenv').config();
const app = require('./src/app');
const { dbConnection } = require('./src/config/db');
const { createInitialAdmin } = require('./src/config/initial-setup');

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    await dbConnection();

    await createInitialAdmin();

    app.listen(PORT, () => {
        console.log(`Servidor ejecutándose en el puerto ${PORT}`);
    });
};

startServer();