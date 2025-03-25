const Cliente = require('../models/clienteModels');

class ClienteController {

    static async getAllClientes(req, res) {
        try {
            const clientes = await Cliente.findAll();
            res.json(clientes);
        } catch (error) {
            res.status(500).json({ mensaje: error.message });
        }
    }

    static async createCliente(req, res) {
        try {
            const { razon_social, domicilio, telefono, email } = req.body; // Columnas actualizadas
            const cliente = await Cliente.create({ razon_social, domicilio, telefono, email }); // Ajustado a nuevas columnas
            res.status(201).json(cliente);
        } catch (error) {
            res.status(500).json({ mensaje: error.message });
        }
    }

    static async getClienteById(req, res) {
        try {
            const cliente = await Cliente.findById(req.params.id);
            if (!cliente) {
                return res.status(404).json({ mensaje: "Cliente no encontrado" });
            }
            res.json(cliente);
        } catch (error) {
            res.status(500).json({ mensaje: error.message });
        }
    }

    static async updateCliente(req, res) {
        try {
            const { razon_social, domicilio, telefono, email } = req.body; // Columnas actualizadas
            const cliente = await Cliente.update(req.params.id, { razon_social, domicilio, telefono, email }); // Ajustado a nuevas columnas
            if (!cliente) {
                return res.status(404).json({ mensaje: "Cliente no encontrado" });
            }
            res.json(cliente);
        } catch (error) {
            res.status(500).json({ mensaje: error.message });
        }
    }

    static async deleteCliente(req, res) {
        const clienteId = req.params.id;
        try {
            const result = await Cliente.delete(clienteId);
            if (result === 0) {
                return res.status(404).json({ mensaje: 'Cliente no encontrado' });
            }
            res.status(200).json({ mensaje: 'Cliente eliminado correctamente' });
        } catch (err) {
            res.status(500).json({ mensaje: err.message });
        }
    }
}

module.exports = ClienteController;
