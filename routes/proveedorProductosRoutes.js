const express = require('express');
const ProveedorProductoController = require('../controllers/ProveedorProductoController');

const router = express.Router();

router.get('/proveedor-productos', ProveedorProductoController.getAllProveedorProductos);
router.post('/proveedor-productos', ProveedorProductoController.createProveedorProducto);
router.get('/proveedor-productos/:proveedorId/:productoId', ProveedorProductoController.getProveedorProductoById);
router.delete('/proveedor-productos/:proveedorId/:productoId', ProveedorProductoController.deleteProveedorProducto);

module.exports = router;
