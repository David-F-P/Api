const ProveedorProducto = require('../models/proveedor_productosModels');

class ProveedorProductoController {

    static async getAllProveedorProductos(req, res) {
        try {
            const proveedorProductos = await ProveedorProducto.findAll();
            res.json(proveedorProductos);
        } catch (error) {
            res.status(500).json({ mensaje: error.message });
        }
    }

    static async createProveedorProducto(req, res) {
        try {
            const { proveedor_id_proveedor, productos_id_producto } = req.body;

            // Validamos que los campos obligatorios estén presentes
            if (!proveedor_id_proveedor || !productos_id_producto) {
                return res.status(400).json({ mensaje: "Ambos campos proveedor_id_proveedor y productos_id_producto son obligatorios" });
            }

            const proveedorProducto = await ProveedorProducto.create(req.body);
            res.status(201).json(proveedorProducto);
        } catch (error) {
            res.status(500).json({ mensaje: error.message });
        }
    }

    static async getProveedorProductoById(req, res) {
        try {
            const { proveedorId, productoId } = req.params;
            const proveedorProducto = await ProveedorProducto.findById(proveedorId, productoId);

            if (!proveedorProducto) {
                return res.status(404).json({ mensaje: "Proveedor-Producto no encontrado" });
            }

            res.json(proveedorProducto);
        } catch (error) {
            res.status(500).json({ mensaje: error.message });
        }
    }

    static async deleteProveedorProducto(req, res) {
        try {
            const { proveedorId, productoId } = req.params;
            const result = await ProveedorProducto.delete(proveedorId, productoId);

            if (result === 0) {
                return res.status(404).json({ mensaje: 'Proveedor-Producto no encontrado' });
            }

            res.status(200).json({ mensaje: 'Proveedor-Producto eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ mensaje: error.message });
        }
    }
}

module.exports = ProveedorProductoController;
