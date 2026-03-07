const Lectura = require('../models/Lectura');

const createLectura = async (req, res) => {
    try {
        const lectura = new Lectura(req.body);
        await lectura.save();
        res.status(201).json({ ok: true, lectura });
    } catch (error) {
        res.status(500).json({ ok: false, msg: 'Error al registrar lectura' });
    }
};

const getLecturas = async (req, res) => {
    try {
        const lecturas = await Lectura.find().populate('estanqueId', 'nombre ubicacion');
        res.json({ ok: true, lecturas });
    } catch (error) {
        res.status(500).json({ ok: false, msg: 'Error al obtener lecturas' });
    }
};

const getLecturasByEstanque = async (req, res) => {
    try {
        const lecturas = await Lectura.find({ estanqueId: req.params.estanqueId });
        res.json({ ok: true, lecturas });
    } catch (error) {
        res.status(500).json({ ok: false, msg: 'Error al obtener lecturas del estanque' });
    }
};

// Se omiten Update y Delete completos por brevedad, y porque el historial de sensores rara vez se edita, pero aquí están las bases
const deleteLectura = async (req, res) => {
    try {
        await Lectura.findByIdAndDelete(req.params.id);
        res.json({ ok: true, msg: 'Lectura eliminada' });
    } catch (error) {
        res.status(500).json({ ok: false, msg: 'Error al eliminar lectura' });
    }
};

module.exports = { createLectura, getLecturas, getLecturasByEstanque, deleteLectura };