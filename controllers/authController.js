const Usuario = require('../models/usuarioModels');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    try {
        const { email, contrasena } = req.body;

        if (!email || !contrasena) {
            return res.status(400).json({ message: 'Email y contraseña requeridos' });
        }

        // Verificar credenciales en la base de datos
        const usuario = await Usuario.authenticate(email, contrasena);

        if (!usuario) {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }

        // Generar token JWT con tiempo de expiración de 1 hora
        const token = jwt.sign(
            {
                id_usuario: usuario.id_usuario,
                email: usuario.email,
                nombre: usuario.nombre,
                rol: usuario.rol
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' } // Asegurar que el token dure 1 hora
        );

        res.json({ token, user: usuario });
    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

module.exports = { login };

