const pool = require('../config/db');
const bcrypt = require('bcryptjs'); // ✔ Usamos bcryptjs por compatibilidad con Node 20+
const jwt = require('jsonwebtoken'); // Para generar JWT

require('dotenv').config(); // Cargar las variables de entorno
const SECRET_KEY = process.env.JWT_SECRET; // Clave secreta desde .env

class Usuario {
    // Obtener todos los usuarios
    static async findAll() {
        const result = await pool.query('SELECT * FROM usuario');
        return result.rows;
    }

    // Crear un nuevo usuario
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

    // Buscar usuario por ID
    static async findById(id) {
        const result = await pool.query('SELECT * FROM usuario WHERE id_usuario = $1', [id]);
        return result.rows[0];
    }

    // Actualizar usuario
    static async update(id, data) {
        const { usuario, contrasena, nombre, apellido_paterno, apellido_materno, email, domicilio, rol } = data;

        // Hashear la nueva contraseña
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

    // Eliminar usuario
    static async delete(id) {
        const result = await pool.query('DELETE FROM usuario WHERE id_usuario = $1', [id]);
        return result.rowCount;
    }

    // Autenticación: verifica email y contraseña, y genera token
    static async authenticate(email, contrasena) {
        const result = await pool.query('SELECT * FROM usuario WHERE email = $1', [email]);
        const user = result.rows[0];

        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        // Comparar la contraseña enviada con la guardada
        const isMatch = await bcrypt.compare(contrasena, user.contrasena);
        if (!isMatch) {
            throw new Error('Contraseña incorrecta');
        }

        // Generar token JWT con datos del usuario (incluye rol)
        const token = jwt.sign(
            {
                id_usuario: user.id_usuario,
                email: user.email,
                nombre: user.nombre,
                rol: user.rol
            },
            SECRET_KEY,
            { expiresIn: '1d' }
        );

        return { token, user };
    }
}

module.exports = Usuario;
