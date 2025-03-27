const Usuario = require('../models/usuarioModels');

const login = async (req, res) => {
    try {
        const { email, contrasena } = req.body;
        if (!email || !contrasena) {
            return res.status(400).json({ message: 'Email y contraseña requeridos' });
        }

        const { token, user } = await Usuario.authenticate(email, contrasena);
        res.json({ token, user });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

module.exports = { login };
