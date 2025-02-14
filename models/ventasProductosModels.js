const pool = require('../config/db');

class VentaProducto {
    static async findAll() {
        const result = await pool.query('SELECT * FROM ventas_productos');
        return result.rows;
    }

    static async create(data) {
        const { ventasid_venta, productosid_producto, cantidad, precio_unitario, subtotal_producto } = data;
        const result = await pool.query(
            `INSERT INTO ventas_productos (ventasid_venta, productosid_producto, cantidad, precio_unitario, subtotal_producto) 
             VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [ventasid_venta, productosid_producto, cantidad, precio_unitario, subtotal_producto]
        );
        return result.rows[0];
    }

    static async findById(ventaId, productoId) {
        const result = await pool.query(
            'SELECT * FROM ventas_productos WHERE ventasid_venta = $1 AND productosid_producto = $2',
            [ventaId, productoId]
        );
        return result.rows[0];
    }

    static async update(ventaId, productoId, data) {
        const { cantidad, precio_unitario, subtotal_producto } = data;
        const result = await pool.query(
            `UPDATE ventas_productos 
            SET cantidad = $1, precio_unitario = $2, subtotal_producto = $3
             WHERE ventasid_venta = $4 AND productosid_producto = $5 RETURNING *`,
            [cantidad, precio_unitario, subtotal_producto, ventaId, productoId]
        );
        return result.rows[0];
    }

    static async delete(ventaId, productoId) {
        const result = await pool.query(
            'DELETE FROM ventas_productos WHERE ventasid_venta = $1 AND productosid_producto = $2',
            [ventaId, productoId]
        );
        return result.rowCount;
    }
}

module.exports = VentaProducto;
