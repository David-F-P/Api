const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const ClienteRoutes = require('./routes/clienteRoutes');
const ProveedorRoutes = require('./routes/proveedorRoutes');
const UsuarioRoutes = require('./routes/usuarioRoutes');
const OrdenDeCompraRoutes = require('./routes/ordenDeCompraRoutes');
const OrdenDeCompraProductosRoutes = require('./routes/ordenDeCompraProductosRoutes');
const ProductosRoutes = require('./routes/productosRoutes');
const VentasRoutes = require('./routes/ventasRoutes');
const VentasProductosRoutes = require('./routes/ventasProductosRoutes');
const ProveedorProductoRoutes = require('./routes/proveedorProductosRoutes');
const authRoutes = require('./routes/authRoutes');

const authMiddleware = require('./middleware/authMiddleware');
const verifyRole = require('./middleware/verifyRole');

dotenv.config();

const app = express();

// Configuración de CORS
app.use(cors({
  origin: 'http://localhost:4200', // Permite solicitudes desde Angular
  credentials: true,
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
}));

app.use(express.json());

// Rutas protegidas por autenticación y control de roles
app.use('/api/clientes', authMiddleware, ClienteRoutes);
app.use('/api/proveedores', authMiddleware, ProveedorRoutes);
app.use('/api/usuarios', authMiddleware, verifyRole(['admin']), UsuarioRoutes);
app.use('/api/ordenes-compra', authMiddleware, OrdenDeCompraRoutes);
app.use('/api/ordenes-compra-productos', authMiddleware, OrdenDeCompraProductosRoutes);
app.use('/api/productos', authMiddleware, ProductosRoutes);
app.use('/api/ventas', authMiddleware, VentasRoutes);
app.use('/api/ventas-productos', authMiddleware, VentasProductosRoutes);
app.use('/api/proveedor-productos', authMiddleware, ProveedorProductoRoutes);
app.use('/api/auth', authRoutes); // No necesita middleware en login/register

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({ message: err.message || 'Error interno del servidor' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 SERVER IS RUNNING ON PORT ${PORT}`);
});

