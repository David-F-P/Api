const express = require('express');
const VentaController = require('../controllers/ventasControllers');
const authMiddleware = require('../middleware/authMiddleware');
const verifyRole = require('../middleware/verifyRole');

const router = express.Router();

// Ver todas las ventas - admin y usuario
router.get('/',
  authMiddleware,
  verifyRole(['admin', 'usuario']),
  VentaController.getAllVentas
);

// Crear venta - admin y usuario
router.post('/',
  authMiddleware,
  verifyRole(['admin', 'usuario']),
  VentaController.createVenta
);

// Ver venta por ID - admin y usuario
router.get('/:id',
  authMiddleware,
  verifyRole(['admin', 'usuario']),
  VentaController.getVentaById
);

// Actualizar venta - solo admin
router.put('/:id',
  authMiddleware,
  verifyRole(['admin']),
  VentaController.updateVenta
);

// Eliminar venta - solo admin
router.delete('/:id',
  authMiddleware,
  verifyRole(['admin']),
  VentaController.deleteVenta
);

module.exports = router;
