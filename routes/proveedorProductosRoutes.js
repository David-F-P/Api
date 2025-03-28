const express = require('express');
const ProveedorProductoController = require('../controllers/ProveedorProductoController');
const authMiddleware = require('../middleware/authMiddleware');
const verifyRole = require('../middleware/verifyRole');

const router = express.Router();

// Ver todos los productos por proveedor - admin y usuario
router.get('/proveedor-productos',
  authMiddleware,
  verifyRole(['admin', 'usuario']),
  ProveedorProductoController.getAllProveedorProductos
);

// Crear proveedor-producto - solo admin
router.post('/proveedor-productos',
  authMiddleware,
  verifyRole(['admin']),
  ProveedorProductoController.createProveedorProducto
);

// Ver proveedor-producto por ID - admin y usuario
router.get('/proveedor-productos/:proveedorId/:productoId',
  authMiddleware,
  verifyRole(['admin', 'usuario']),
  ProveedorProductoController.getProveedorProductoById
);

// Eliminar proveedor-producto - solo admin
router.delete('/proveedor-productos/:proveedorId/:productoId',
  authMiddleware,
  verifyRole(['admin']),
  ProveedorProductoController.deleteProveedorProducto
);

module.exports = router;
