const RegistroActividad = require('../models/RegistroActividad');

const createActividad = async (req, res) => {
    try {
        const actividad = new RegistroActividad(req.body);
        await actividad.save();
        res.status(201).json({ ok: true, actividad });
    } catch (error) {
        res.status(500).json({ ok: false, msg: 'Error al registrar actividad' });
    }
};

const getActividades = async (req, res) => {
    try {
        const actividades = await RegistroActividad.find().populate('estanqueId', 'nombre');
        res.json({ ok: true, actividades });
    } catch (error) {
        res.status(500).json({ ok: false, msg: 'Error al obtener actividades' });
    }
};

const getActividadesByEstanque = async (req, res) => {
    try {
        const actividades = await RegistroActividad.find({ estanqueId: req.params.estanqueId });
        res.json({ ok: true, actividades });
    } catch (error) {
        res.status(500).json({ ok: false, msg: 'Error al obtener actividades del estanque' });
    }
};

const deleteActividad = async (req, res) => {
    try {
        await RegistroActividad.findByIdAndDelete(req.params.id);
        res.json({ ok: true, msg: 'Registro de actividad eliminado' });
    } catch (error) {
        res.status(500).json({ ok: false, msg: 'Error al eliminar actividad' });
    }
};

module.exports = { createActividad, getActividades, getActividadesByEstanque, deleteActividad };