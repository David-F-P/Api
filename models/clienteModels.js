const pool = require('../config/db');

class Cliente {
    static async findAll() {
        const result = await pool.query('SELECT * FROM clientes');
        return result.rows;
    }

    static async create(data) {
        const { razon_social, domicilio, telefono, email } = data;
        const result = await pool.query(
            `INSERT INTO clientes (razon_social, domicilio, telefono, email) 
             VALUES ($1, $2, $3, $4) RETURNING *`,
            [razon_social, domicilio, telefono, email]
        );
        return result.rows[0];
    }

    static async findById(id) {
        const result = await pool.query('SELECT * FROM clientes WHERE id_cliente = $1', [id]);
        return result.rows[0];
    }

    static async update(id, data) {
        const { razon_social, domicilio, telefono, email } = data;
        const result = await pool.query(
            `UPDATE clientes 
            SET razon_social = $1, domicilio = $2, telefono = $3, email = $4 
            WHERE id_cliente = $5 RETURNING *`,
            [razon_social, domicilio, telefono, email, id]
        );
        return result.rows[0];
    }

    static async delete(id) {
        const result = await pool.query('DELETE FROM clientes WHERE id_cliente = $1', [id]);
        return result.rowCount;
    }
}

module.exports = Cliente;
