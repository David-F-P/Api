const express = require('express');
const ProveedorProductoController = require('../controllers/ProveedorProductoController');
const authMiddleware = require('../middleware/authMiddleware');
const verifyRole = require('../middleware/verifyRole');

const router = express.Router();

// Ver todos los productos por proveedor - admin y usuario
router.get('/',
  authMiddleware,
  verifyRole(['admin', 'usuario']),
  ProveedorProductoController.getAllProveedorProductos
);

// Crear proveedor-producto - solo admin
router.post('/',
  authMiddleware,
  verifyRole(['admin']),
  ProveedorProductoController.createProveedorProducto
);

// Ver proveedor-producto por ID - admin y usuario
router.get('/:proveedorId/:productoId',
  authMiddleware,
  verifyRole(['admin', 'usuario']),
  ProveedorProductoController.getProveedorProductoById
);

// Eliminar proveedor-producto - solo admin
router.delete('/:proveedorId/:productoId',
  authMiddleware,
  verifyRole(['admin']),
  ProveedorProductoController.deleteProveedorProducto
);

module.exports = router;
