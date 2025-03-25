const OrdenDeCompraProducto = require('../models/ordenDeCompraProductosModels');

class OrdenDeCompraProductoController {

    static async getAll(req, res) {
        try {
            const ordenes = await OrdenDeCompraProducto.findAll();
            res.json(ordenes);
        } catch (error) {
            res.status(500).json({ mensaje: error.message });
        }
    }

    static async create(req, res) {
        try {
            const { orden_id_orden, producto_id_producto, cantidad, precio_unitario, subtotal_producto } = req.body; // Actualización de las columnas
            const nuevaOrden = await OrdenDeCompraProducto.create({ orden_id_orden, producto_id_producto, cantidad, precio_unitario, subtotal_producto }); // Ajuste a las nuevas columnas
            res.status(201).json(nuevaOrden);
        } catch (error) {
            res.status(500).json({ mensaje: error.message });
        }
    }

    static async getById(req, res) {
        try {
            const { ordenId, productoId } = req.params;
            const orden = await OrdenDeCompraProducto.findById(ordenId, productoId);
            if (!orden) {
                return res.status(404).json({ mensaje: "Orden de compra producto no encontrada" });
            }
            res.json(orden);
        } catch (error) {
            res.status(500).json({ mensaje: error.message });
        }
    }

    static async update(req, res) {
        try {
            const { ordenId, productoId } = req.params;
            const { cantidad, precio_unitario, subtotal_producto } = req.body; // Asegurar que los datos sean correctos
            const ordenActualizada = await OrdenDeCompraProducto.update(ordenId, productoId, { cantidad, precio_unitario, subtotal_producto });
            if (!ordenActualizada) {
                return res.status(404).json({ mensaje: "Orden de compra producto no encontrada" });
            }
            res.json(ordenActualizada);
        } catch (error) {
            res.status(500).json({ mensaje: error.message });
        }
    }

    static async delete(req, res) {
        try {
            const { ordenId, productoId } = req.params;
            const result = await OrdenDeCompraProducto.delete(ordenId, productoId);
            if (result === 0) {
                return res.status(404).json({ mensaje: "Orden de compra producto no encontrada" });
            }
            res.status(200).json({ mensaje: "Orden de compra producto eliminada correctamente" });
        } catch (error) {
            res.status(500).json({ mensaje: error.message });
        }
    }
}

module.exports = OrdenDeCompraProductoController;
