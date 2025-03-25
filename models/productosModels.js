const pool = require('../config/db');

class Producto {
    static async findAll() {
        const result = await pool.query('SELECT * FROM productos');
        return result.rows;
    }

    static async create(data) {
        const { existencia, nombre_producto, precio_venta, ingrediente_activo } = data;
        const result = await pool.query(
            `INSERT INTO productos (existencia, nombre_producto, precio_venta, ingrediente_activo) 
             VALUES ($1, $2, $3, $4) RETURNING *`,
            [existencia, nombre_producto, precio_venta, ingrediente_activo]
        );
        return result.rows[0];
    }

    static async findById(id) {
        const result = await pool.query('SELECT * FROM productos WHERE id_producto = $1', [id]);
        return result.rows[0];
    }

    static async update(id, data) {
        const { existencia, nombre_producto, precio_venta, ingrediente_activo } = data;
        const result = await pool.query(
            `UPDATE productos 
            SET existencia = $1, nombre_producto = $2, precio_venta = $3, ingrediente_activo = $4 
            WHERE id_producto = $5 RETURNING *`,
            [existencia, nombre_producto, precio_venta, ingrediente_activo, id]
        );
        return result.rows[0];
    }

    static async delete(id) {
        const result = await pool.query('DELETE FROM productos WHERE id_producto = $1', [id]);
        return result.rowCount;
    }
}

module.exports = Producto;

