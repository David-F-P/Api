// proveedorRoutes.js
const express = require('express');
const ProveedorController = require('../controllers/proveedorControllers');
const authMiddleware = require('../middleware/authMiddleware');
const verifyRole = require('../middleware/verifyRole');

const router = express.Router();

// Rutas de proveedores
router.get('/',
  authMiddleware,
  verifyRole(['admin', 'usuario']),
  ProveedorController.getAllProveedores
);

router.post('/',
  authMiddleware,
  verifyRole(['admin']),
  ProveedorController.createProveedor
);

router.get('/:id',
  authMiddleware,
  verifyRole(['admin', 'usuario']),
  ProveedorController.getProveedorById
);

router.put('/:id',
  authMiddleware,
  verifyRole(['admin']),
  ProveedorController.updateProveedor
);

router.delete('/:id',
  authMiddleware,
  verifyRole(['admin']),
  ProveedorController.deleteProveedor
);

module.exports = router;
