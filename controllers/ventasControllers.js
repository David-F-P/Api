const Venta = require('../models/ventasModels');

class VentaController {

    static async getAllVentas(req, res) {
        try {
            const ventas = await Venta.findAll();
            res.json(ventas);
        } catch (error) {
            res.status(500).json({ mensaje: error.message });
        }
    }

    static async createVenta(req, res) {
        try {
            const { fecha, subtotal, total, usuario_id_cliente, clientes_id_cliente } = req.body;

            // Validamos que todos los campos necesarios estén presentes
            if (!fecha || !subtotal || !total || !usuario_id_cliente || !clientes_id_cliente) {
                return res.status(400).json({ mensaje: "Todos los campos son obligatorios" });
            }

            const venta = await Venta.create(req.body);
            res.status(201).json(venta);
        } catch (error) {
            res.status(500).json({ mensaje: error.message });
        }
    }

    static async getVentaById(req, res) {
        try {
            const venta = await Venta.findById(req.params.id);
            if (!venta) {
                return res.status(404).json({ mensaje: "Venta no encontrada" });
            }
            res.json(venta);
        } catch (error) {
            res.status(500).json({ mensaje: error.message });
        }
    }

    static async updateVenta(req, res) {
        try {
            const { fecha, subtotal, total, usuario_id_cliente, clientes_id_cliente } = req.body;

            // Validamos que todos los campos necesarios estén presentes
            if (!fecha || !subtotal || !total || !usuario_id_cliente || !clientes_id_cliente) {
                return res.status(400).json({ mensaje: "Todos los campos son obligatorios" });
            }

            const venta = await Venta.update(req.params.id, req.body);
            if (!venta) {
                return res.status(404).json({ mensaje: "Venta no encontrada" });
            }
            res.json(venta);
        } catch (error) {
            res.status(500).json({ mensaje: error.message });
        }
    }

    static async deleteVenta(req, res) {
        const ventaId = req.params.id;
        try {
            const result = await Venta.delete(ventaId);
            if (result === 0) {
                return res.status(404).json({ mensaje: 'Venta no encontrada' });
            }
            res.status(200).json({ mensaje: 'Venta eliminada correctamente' });
        } catch (err) {
            res.status(500).json({ mensaje: err.message });
        }
    }
}

module.exports = VentaController;
