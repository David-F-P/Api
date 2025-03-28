const express = require('express');
const ProveedorController = require('../controllers/proveedorControllers');
const authMiddleware = require('../middleware/authMiddleware');
const verifyRole = require('../middleware/verifyRole');

const router = express.Router();

// Ver todos los proveedores - admin y usuario
router.get('/proveedores',
  authMiddleware,
  verifyRole(['admin', 'usuario']),
  ProveedorController.getAllProveedores
);

// Crear proveedor - solo admin
router.post('/proveedores',
  authMiddleware,
  verifyRole(['admin']),
  ProveedorController.createProveedor
);

// Ver proveedor por ID - admin y usuario
router.get('/proveedores/:id',
  authMiddleware,
  verifyRole(['admin', 'usuario']),
  ProveedorController.getProveedorById
);

// Actualizar proveedor - solo admin
router.put('/proveedores/:id',
  authMiddleware,
  verifyRole(['admin']),
  ProveedorController.updateProveedor
);

// Eliminar proveedor - solo admin
router.delete('/proveedores/:id',
  authMiddleware,
  verifyRole(['admin']),
  ProveedorController.deleteProveedor
);

module.exports = router;
