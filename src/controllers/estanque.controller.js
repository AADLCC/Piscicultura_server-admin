const Estanque = require('../models/Estanque');

const createEstanque = async (req, res) => {
    try {
        const estanque = new Estanque(req.body);
        await estanque.save();
        res.status(201).json({ ok: true, estanque });
    } catch (error) {
        res.status(500).json({ ok: false, msg: 'Error al crear estanque' });
    }
};

const getEstanques = async (req, res) => {
    try {
        const estanques = await Estanque.find().populate('usuarioId', 'nombre correo');
        res.json({ ok: true, estanques });
    } catch (error) {
        res.status(500).json({ ok: false, msg: 'Error al obtener estanques' });
    }
};

const getEstanqueById = async (req, res) => {
    try {
        const estanque = await Estanque.findById(req.params.id).populate('usuarioId', 'nombre correo');
        if (!estanque) return res.status(404).json({ ok: false, msg: 'Estanque no encontrado' });
        res.json({ ok: true, estanque });
    } catch (error) {
        res.status(500).json({ ok: false, msg: 'Error al obtener estanque' });
    }
};

const updateEstanque = async (req, res) => {
    try {
        const estanqueActualizado = await Estanque.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!estanqueActualizado) return res.status(404).json({ ok: false, msg: 'Estanque no encontrado' });
        res.json({ ok: true, estanque: estanqueActualizado });
    } catch (error) {
        res.status(500).json({ ok: false, msg: 'Error al actualizar estanque' });
    }
};

const deleteEstanque = async (req, res) => {
    try {
        const estanqueEliminado = await Estanque.findByIdAndDelete(req.params.id);
        if (!estanqueEliminado) return res.status(404).json({ ok: false, msg: 'Estanque no encontrado' });
        res.json({ ok: true, msg: 'Estanque eliminado' });
    } catch (error) {
        res.status(500).json({ ok: false, msg: 'Error al eliminar estanque' });
    }
};

module.exports = { createEstanque, getEstanques, getEstanqueById, updateEstanque, deleteEstanque };