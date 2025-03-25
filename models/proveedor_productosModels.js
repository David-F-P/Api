const pool = require('../config/db');

class ProveedorProducto {
    static async findAll() {
        const result = await pool.query('SELECT * FROM proveedor_productos');
        return result.rows;
    }

    static async create(data) {
        const { proveedor_id_proveedor, productos_id_producto } = data;
        const result = await pool.query(
            `INSERT INTO proveedor_productos (proveedor_id_proveedor, productos_id_producto) 
             VALUES ($1, $2) RETURNING *`,
            [proveedor_id_proveedor, productos_id_producto]
        );
        return result.rows[0];
    }

    static async findById(proveedorId, productoId) {
        const result = await pool.query(
            'SELECT * FROM proveedor_productos WHERE proveedor_id_proveedor = $1 AND productos_id_producto = $2',
            [proveedorId, productoId]
        );
        return result.rows[0];
    }

    static async delete(proveedorId, productoId) {
        const result = await pool.query(
            'DELETE FROM proveedor_productos WHERE proveedor_id_proveedor = $1 AND productos_id_producto = $2',
            [proveedorId, productoId]
        );
        return result.rowCount;
    }
}

module.exports = ProveedorProducto;
