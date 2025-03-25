const Producto = require('../models/productosModels');

class ProductoController {

    static async getAllProductos(req, res) {
        try {
            const productos = await Producto.findAll();
            res.json(productos);
        } catch (error) {
            res.status(500).json({ mensaje: error.message });
        }
    }

    static async createProducto(req, res) {
        try {
            const { existencia, nombre_producto, precio_venta, ingrediente_activo } = req.body;

            // Validamos que todos los campos necesarios estén presentes
            if (!existencia || !nombre_producto || !precio_venta || !ingrediente_activo) {
                return res.status(400).json({ mensaje: "Todos los campos son obligatorios" });
            }

            const producto = await Producto.create({ existencia, nombre_producto, precio_venta, ingrediente_activo });
            res.status(201).json(producto);
        } catch (error) {
            res.status(500).json({ mensaje: error.message });
        }
    }

    static async getProductoById(req, res) {
        try {
            const producto = await Producto.findById(req.params.id);
            if (!producto) {
                return res.status(404).json({ mensaje: "Producto no encontrado" });
            }
            res.json(producto);
        } catch (error) {
            res.status(500).json({ mensaje: error.message });
        }
    }

    static async updateProducto(req, res) {
        try {
            const { existencia, nombre_producto, precio_venta, ingrediente_activo } = req.body;

            // Validamos que todos los campos necesarios estén presentes
            if (!existencia || !nombre_producto || !precio_venta || !ingrediente_activo) {
                return res.status(400).json({ mensaje: "Todos los campos son obligatorios" });
            }

            const producto = await Producto.update(req.params.id, { existencia, nombre_producto, precio_venta, ingrediente_activo });
            if (!producto) {
                return res.status(404).json({ mensaje: "Producto no encontrado" });
            }
            res.json(producto);
        } catch (error) {
            res.status(500).json({ mensaje: error.message });
        }
    }

    static async deleteProducto(req, res) {
        const productoId = req.params.id;
        try {
            const result = await Producto.delete(productoId);
            if (result === 0) {
                return res.status(404).json({ mensaje: 'Producto no encontrado' });
            }
            res.status(200).json({ mensaje: 'Producto eliminado correctamente' });
        } catch (err) {
            res.status(500).json({ mensaje: err.message });
        }
    }
}

module.exports = ProductoController;
