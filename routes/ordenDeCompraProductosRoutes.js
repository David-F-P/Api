const express = require('express');
const OrdenDeCompraProductoController = require('../controllers/ordenDeCompraProductosControllers');
const authMiddleware = require('../middleware/authMiddleware');
const verifyRole = require('../middleware/verifyRole');

const router = express.Router();

// Ver todos los registros - admin y usuario
router.get(
  '/',
  authMiddleware,
  verifyRole(['admin', 'usuario']),
  OrdenDeCompraProductoController.getAll
);

// Crear registro - admin y usuario
router.post(
  '/',
  authMiddleware,
  verifyRole(['admin', 'usuario']),
  OrdenDeCompraProductoController.create
);

// Obtener registro por ID - admin y usuario
router.get(
  '/:ordenId/:productoId',
  authMiddleware,
  verifyRole(['admin', 'usuario']),
  OrdenDeCompraProductoController.getById
);

// Actualizar registro - solo admin
router.put(
  '/:ordenId/:productoId',
  authMiddleware,
  verifyRole(['admin']),
  OrdenDeCompraProductoController.update
);

// Eliminar registro - solo admin
router.delete(
  '/:ordenId/:productoId',
  authMiddleware,
  verifyRole(['admin']),
  OrdenDeCompraProductoController.delete
);

module.exports = router;
