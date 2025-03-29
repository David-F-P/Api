const express = require('express');
const ProductoController = require('../controllers/productosControllers');
const authMiddleware = require('../middleware/authMiddleware');
const verifyRole = require('../middleware/verifyRole');

const router = express.Router();

// Ver todos los productos - admin y usuario
router.get('/',
  authMiddleware,
  verifyRole(['admin', 'usuario']),
  ProductoController.getAllProductos
);

// Crear producto - admin y usuario
router.post('/',
  authMiddleware,
  verifyRole(['admin', 'usuario']),
  ProductoController.createProducto
);

// Ver producto por ID - admin y usuario
router.get('/:id',
  authMiddleware,
  verifyRole(['admin', 'usuario']),
  ProductoController.getProductoById
);

// Actualizar producto - solo admin
router.put('/:id',
  authMiddleware,
  verifyRole(['admin']),
  ProductoController.updateProducto
);

// Eliminar producto - solo admin
router.delete('/:id',
  authMiddleware,
  verifyRole(['admin']),
  ProductoController.deleteProducto
);

module.exports = router;
