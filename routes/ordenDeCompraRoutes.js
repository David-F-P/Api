const express = require('express');
const OrdenDeCompraController = require('../controllers/ordenDeCompraControllers');
const authMiddleware = require('../middleware/authMiddleware');
const verifyRole = require('../middleware/verifyRole');

const router = express.Router();

// Ver todas las órdenes - admin y usuario
router.get('/',
  authMiddleware,
  verifyRole(['admin', 'usuario']),
  OrdenDeCompraController.getAllOrdenes
);

// Crear orden - admin y usuario
router.post('/',
  authMiddleware,
  verifyRole(['admin', 'usuario']),
  OrdenDeCompraController.createOrden
);

// Ver orden por ID - admin y usuario
router.get('/:id',
  authMiddleware,
  verifyRole(['admin', 'usuario']),
  OrdenDeCompraController.getOrdenById
);

// Actualizar orden - solo admin
router.put('/:id',
  authMiddleware,
  verifyRole(['admin']),
  OrdenDeCompraController.updateOrden
);

// Eliminar orden - solo admin
router.delete('/:id',
  authMiddleware,
  verifyRole(['admin']),
  OrdenDeCompraController.deleteOrden
);

module.exports = router;
