const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const { corsOptions } = require('./config/cors-configuration');
const { helmetOptions } = require('./config/helmet-configuration');

const userRoutes = require('./routes/user.routes');
const authRoutes = require('./routes/auth.routes');
const estanqueRoutes = require('./routes/estanque.routes');
const lecturaRoutes = require('./routes/lectura.routes');
const registroActividadRoutes = require('./routes/registroActividad.routes');

const app = express();

// Middlewares
app.use(helmet(helmetOptions));
app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check
app.get('/api/v1/health', (req, res) => {
    res.status(200).json({
        ok: true,
        message: 'Servidor server-admin funcionando'
    });
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/estanques', estanqueRoutes);
app.use('/api/v1/lecturas', lecturaRoutes);
app.use('/api/v1/actividades', registroActividadRoutes);

module.exports = app;