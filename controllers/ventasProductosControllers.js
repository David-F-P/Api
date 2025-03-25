const VentaProducto = require('../models/ventasProductosModels');

class VentaProductoController {

    static async getAllVentasProductos(req, res) {
        try {
            const ventasProductos = await VentaProducto.findAll();
            res.json(ventasProductos);
        } catch (error) {
            res.status(500).json({ mensaje: error.message });
        }
    }

    static async createVentaProducto(req, res) {
        try {
            const { ventas_id_ventas, productos_id_producto, cantidad, precio_unitario, subtotal_producto } = req.body;

            // Validamos que todos los campos necesarios estén presentes
            if (!ventas_id_ventas || !productos_id_producto || !cantidad || !precio_unitario || !subtotal_producto) {
                return res.status(400).json({ mensaje: "Todos los campos son obligatorios" });
            }

            const ventaProducto = await VentaProducto.create(req.body);
            res.status(201).json(ventaProducto);
        } catch (error) {
            res.status(500).json({ mensaje: error.message });
        }
    }

    static async getVentaProductoById(req, res) {
        try {
            const { ventasid_venta, productosid_producto } = req.params;
            const ventaProducto = await VentaProducto.findById(ventasid_venta, productosid_producto);

            if (!ventaProducto) {
                return res.status(404).json({ mensaje: "Venta-Producto no encontrada" });
            }

            res.json(ventaProducto);
        } catch (error) {
            res.status(500).json({ mensaje: error.message });
        }
    }

    static async updateVentaProducto(req, res) {
        try {
            const { ventasid_venta, productosid_producto } = req.params;
            const { cantidad, precio_unitario, subtotal_producto } = req.body;

            // Validamos que todos los campos necesarios estén presentes
            if (!cantidad || !precio_unitario || !subtotal_producto) {
                return res.status(400).json({ mensaje: "Todos los campos son obligatorios" });
            }

            const ventaProducto = await VentaProducto.update(ventasid_venta, productosid_producto, req.body);
            if (!ventaProducto) {
                return res.status(404).json({ mensaje: "Venta-Producto no encontrada" });
            }
            res.json(ventaProducto);
        } catch (error) {
            res.status(500).json({ mensaje: error.message });
        }
    }

    static async deleteVentaProducto(req, res) {
        try {
            const { ventasid_venta, productosid_producto } = req.params;
            const result = await VentaProducto.delete(ventasid_venta, productosid_producto);

            if (result === 0) {
                return res.status(404).json({ mensaje: 'Venta-Producto no encontrada' });
            }
            res.status(200).json({ mensaje: 'Venta-Producto eliminada correctamente' });
        } catch (error) {
            res.status(500).json({ mensaje: error.message });
        }
    }
}

module.exports = VentaProductoController;
