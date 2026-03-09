const whitelist = [
    'http://localhost:3000',
    'http://localhost:5173', // futuro frontend de admin
    'http://localhost:4200'  // Puerto típico de Angular (por si acaso)
];

const corsOptions = {
    origin: function (origin, callback) {
        // Permitir peticiones sin origen (Postman)
        if (!origin || whitelist.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Acceso denegado por políticas de CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'x-token'], // Permite el header de auth
    optionsSuccessStatus: 200
};

module.exports = { corsOptions };