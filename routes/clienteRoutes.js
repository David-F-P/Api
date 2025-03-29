const express = require('express');
const ClienteController = require('../controllers/clienteControllers');
const authMiddleware = require('../middleware/authMiddleware');
const verifyRole = require('../middleware/verifyRole');

const router = express.Router();

// Ver todos los clientes - permitido para admin y usuario
router.get('/', authMiddleware, verifyRole(['admin', 'usuario']), ClienteController.getAllClientes);

// Crear cliente - permitido para admin y usuario
router.post('/', authMiddleware, verifyRole(['admin', 'usuario']), ClienteController.createCliente);

// Obtener cliente por ID - permitido para admin y usuario
router.get('/:id', authMiddleware, verifyRole(['admin', 'usuario']), ClienteController.getClienteById);

// Editar cliente - solo admin
router.put('/:id', authMiddleware, verifyRole(['admin']), ClienteController.updateCliente);

// Eliminar cliente - solo admin
router.delete('/:id', authMiddleware, verifyRole(['admin']), ClienteController.deleteCliente);

module.exports = router;
