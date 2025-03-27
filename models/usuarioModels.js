const pool = require('../config/db');
const bcrypt = require('bcrypt'); // Para encriptar contraseñas
const jwt = require('jsonwebtoken'); // Para generar JWT
const SECRET_KEY = "tu_clave_secreta"; // ⚠️ Usa una clave segura desde variables de entorno

class Usuario {
    static async findAll() {
        const result = await pool.query('SELECT * FROM usuario');
        return result.rows;
    }

    static async create(data) {
        const { usuario, contrasena, nombre, apellido_paterno, apellido_materno, email, domicilio, rol } = data;

        // Hashear la contraseña antes de guardarla
        const hashedPassword = await bcrypt.hash(contrasena, 10);

        const result = await pool.query(
            `INSERT INTO usuario (usuario, contrasena, nombre, apellido_paterno, apellido_materno, email, domicilio, rol) 
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
            [usuario, hashedPassword, nombre, apellido_paterno, apellido_materno, email, domicilio, rol]
        );
        return result.rows[0];
    }

    static async findById(id) {
        const result = await pool.query('SELECT * FROM usuario WHERE id_usuario = $1', [id]);
        return result.rows[0];
    }

    static async update(id, data) {
        const { usuario, contrasena, nombre, apellido_paterno, apellido_materno, email, domicilio, rol } = data;
        const hashedPassword = await bcrypt.hash(contrasena, 10);
        const result = await pool.query(
            `UPDATE usuario 
            SET usuario = $1, contrasena = $2, nombre = $3, apellido_paterno = $4, apellido_materno = $5, 
                email = $6, domicilio = $7, rol = $8
             WHERE id_usuario = $9 RETURNING *`,
            [usuario, hashedPassword, nombre, apellido_paterno, apellido_materno, email, domicilio, rol, id]
        );
        return result.rows[0];
    }

    static async delete(id) {
        const result = await pool.query('DELETE FROM usuario WHERE id_usuario = $1', [id]);
        return result.rowCount;
    }

    // ✅ Método para autenticar usuario y generar JWT
    static async authenticate(email, contrasena) {
        const result = await pool.query('SELECT * FROM usuario WHERE email = $1', [email]);
        const user = result.rows[0];

        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        // Verificar la contraseña con bcrypt
        const isMatch = await bcrypt.compare(contrasena, user.contrasena);
        if (!isMatch) {
            throw new Error('Contraseña incorrecta');
        }

        // Generar token JWT
        const token = jwt.sign(
            { id_usuario: user.id_usuario, email: user.email, nombre: user.nombre },
            SECRET_KEY,
            { expiresIn: '2h' }
        );

        return { token, user };
    }
}

module.exports = Usuario;
