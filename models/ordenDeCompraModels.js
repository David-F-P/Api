const pool = require('../config/db');

class OrdenDeCompra {
    static async findAll() {
        const result = await pool.query('SELECT * FROM orden_de_compra');
        return result.rows;
    }

    static async create(data) {
        const { fecha_creacion, subtotal, total, estado_orden, proveedor_id_proveedor } = data;
        const result = await pool.query(
            `INSERT INTO orden_de_compra (fecha_creacion, subtotal, total, estado_orden, proveedor_id_proveedor) 
             VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [fecha_creacion, subtotal, total, estado_orden, proveedor_id_proveedor]
        );
        return result.rows[0];
    }

    static async findById(id) {
        const result = await pool.query('SELECT * FROM orden_de_compra WHERE id_orden = $1', [id]);
        return result.rows[0];
    }

    static async update(id, data) {
        const { fecha_creacion, subtotal, total, estado_orden, proveedor_id_proveedor } = data;
        const result = await pool.query(
            `UPDATE orden_de_compra 
            SET fecha_creacion = $1, subtotal = $2, total = $3, estado_orden = $4, proveedor_id_proveedor = $5 
            WHERE id_orden = $6 RETURNING *`,
            [fecha_creacion, subtotal, total, estado_orden, proveedor_id_proveedor, id]
        );
        return result.rows[0];
    }

    static async delete(id) {
        const result = await pool.query('DELETE FROM orden_de_compra WHERE id_orden = $1', [id]);
        return result.rowCount;
    }
}

module.exports = OrdenDeCompra;
