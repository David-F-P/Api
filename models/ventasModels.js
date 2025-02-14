const pool = require('../config/db');

class Venta {
    static async findAll() {
        const result = await pool.query('SELECT * FROM ventas');
        return result.rows;
    }

    static async create(data) {
        const { fecha, subtotal, total, usuarioid_usuario, clienteid_cliente } = data;
        const result = await pool.query(
            `INSERT INTO ventas (fecha, subtotal, total, usuarioid_usuario, clienteid_cliente) 
             VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [fecha, subtotal, total, usuarioid_usuario, clienteid_cliente]
        );
        return result.rows[0];
    }

    static async findById(id) {
        const result = await pool.query('SELECT * FROM ventas WHERE id_venta = $1', [id]);
        return result.rows[0];
    }

    static async update(id, data) {
        const { fecha, subtotal, total, usuarioid_usuario, clienteid_cliente } = data;
        const result = await pool.query(
            `UPDATE ventas 
            SET fecha = $1, subtotal = $2, total = $3, usuarioid_usuario = $4, clienteid_cliente = $5 
             WHERE id_venta = $6 RETURNING *`,
            [fecha, subtotal, total, usuarioid_usuario, clienteid_cliente, id]
        );
        return result.rows[0];
    }

    static async delete(id) {
        const result = await pool.query('DELETE FROM ventas WHERE id_venta = $1', [id]);
        return result.rowCount;
    }
}

module.exports = Venta;
