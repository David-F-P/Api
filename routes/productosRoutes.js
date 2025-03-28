const express = require('express');
const ProductoController = require('../controllers/productosControllers');
const authMiddleware = require('../middleware/authMiddleware');
const verifyRole = require('../middleware/verifyRole');

const router = express.Router();

// Ver todos los productos - admin y usuario
router.get('/productos',
  authMiddleware,
  verifyRole(['admin', 'usuario']),
  ProductoController.getAllProductos
);

// Crear producto - admin y usuario
router.post('/productos',
  authMiddleware,
  verifyRole(['admin', 'usuario']),
  ProductoController.createProducto
);

// Ver producto por ID - admin y usuario
router.get('/productos/:id',
  authMiddleware,
  verifyRole(['admin', 'usuario']),
  ProductoController.getProductoById
);

// Actualizar producto - solo admin
router.put('/productos/:id',
  authMiddleware,
  verifyRole(['admin']),
  ProductoController.updateProducto
);

// Eliminar producto - solo admin
router.delete('/productos/:id',
  authMiddleware,
  verifyRole(['admin']),
  ProductoController.deleteProducto
);

module.exports = router;
