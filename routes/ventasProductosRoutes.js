const express = require('express');
const VentaProductoController = require('../controllers/ventasProductosControllers');
const authMiddleware = require('../middleware/authMiddleware');
const verifyRole = require('../middleware/verifyRole');

const router = express.Router();

// Ver todas las ventas-productos - admin y usuario
router.get('/ventas-productos',
  authMiddleware,
  verifyRole(['admin', 'usuario']),
  VentaProductoController.getAllVentasProductos
);

// Crear venta-producto - admin y usuario
router.post('/ventas-productos',
  authMiddleware,
  verifyRole(['admin', 'usuario']),
  VentaProductoController.createVentaProducto
);

// Ver por ID - admin y usuario
router.get('/ventas-productos/:ventasid_venta/:productosid_producto',
  authMiddleware,
  verifyRole(['admin', 'usuario']),
  VentaProductoController.getVentaProductoById
);

// Actualizar - solo admin
router.put('/ventas-productos/:ventasid_venta/:productosid_producto',
  authMiddleware,
  verifyRole(['admin']),
  VentaProductoController.updateVentaProducto
);

// Eliminar - solo admin
router.delete('/ventas-productos/:ventasid_venta/:productosid_producto',
  authMiddleware,
  verifyRole(['admin']),
  VentaProductoController.deleteVentaProducto
);

module.exports = router;
