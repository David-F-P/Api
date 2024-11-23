const OrdenDeCompra = require('../models/ordenDeCompraModels');

class OrdenDeCompraController {

    static async getAllOrdenes(req, res) {
        try {
            const ordenes = await OrdenDeCompra.findAll();
            res.json(ordenes);
        } catch (error) {
            res.status(500).json({ mensaje: error.message });
        }
    }

    static async createOrden(req, res) {
        try {
            const orden = await OrdenDeCompra.create(req.body);
            res.status(201).json(orden);
        } catch (error) {
            res.status(500).json({ mensaje: error.message });
        }
    }

    static async getOrdenById(req, res) {
        try {
            const orden = await OrdenDeCompra.findById(req.params.id);
            if (!orden) {
                return res.status(404).json({ mensaje: "Orden no encontrada" });
            }
            res.json(orden);
        } catch (error) {
            res.status(500).json({ mensaje: error.message });
        }
    }

    static async updateOrden(req, res) {
        try {
            const orden = await OrdenDeCompra.update(req.params.id, req.body);
            if (!orden) {
                return res.status(404).json({ mensaje: "Orden no encontrada" });
            }
            res.json(orden);
        } catch (error) {
            res.status(500).json({ mensaje: error.message });
        }
    }

    static async deleteOrden(req, res) {
        const ordenId = req.params.id;
        try {
            const result = await OrdenDeCompra.delete(ordenId);
            if (result === 0) {
                return res.status(404).json({ mensaje: 'Orden no encontrada' });
            }
            res.status(200).json({ mensaje: 'Orden eliminada correctamente' });
        } catch (err) {
            res.status(500).json({ mensaje: err.message });
        }
    }
}

module.exports = OrdenDeCompraController;
