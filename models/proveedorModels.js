const pool = require('../config/db');

class Proveedor {
    static async findAll() {
        const result = await pool.query('SELECT * FROM proveedor');
        return result.rows;
    }

    static async create(data) {
        const { razon_social, domicilio, telefono, email } = data;
        const result = await pool.query(
            `INSERT INTO proveedor (razon_social, domicilio, telefono, email) 
             VALUES ($1, $2, $3, $4) RETURNING *`,
            [razon_social, domicilio, telefono, email]
        );
        return result.rows[0];
    }

    static async findById(id) {
        const result = await pool.query('SELECT * FROM proveedor WHERE id_proveedor = $1', [id]);
        return result.rows[0];
    }

    static async update(id, data) {
        const { razon_social, domicilio, telefono, email } = data;
        const result = await pool.query(
            `UPDATE proveedor 
            SET razon_social = $1, domicilio = $2, telefono = $3, email = $4
             WHERE id_proveedor = $5 RETURNING *`,
            [razon_social, domicilio, telefono, email, id]
        );
        return result.rows[0];
    }

    static async delete(id) {
        const result = await pool.query('DELETE FROM proveedor WHERE id_proveedor = $1', [id]);
        return result.rowCount;
    }
}

module.exports = Proveedor;
