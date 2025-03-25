const express = require('express');
const ClienteRoutes = require('./routes/clienteRoutes');
const ProveedorRoutes = require('./routes/proveedorRoutes');
const UsuarioRoutes = require('./routes/usuarioRoutes');
const OrdenDeCompraRoutes = require('./routes/ordenDeCompraRoutes');
const OrdenDeCompraProductosRoutes = require('./routes/ordenDeCompraProductosRoutes');
const ProductosRoutes = require('./routes/productosRoutes');
const VentasRoutes = require('./routes/ventasRoutes');
const VentasProductosRoutes = require('./routes/ventasProductosRoutes');
const ProveedorProductoRoutes = require('./routes/proveedorProductosRoutes');


require('dotenv').config();

const app = express();
app.use(express.json());

// Configuración de rutas
app.use('/api', ClienteRoutes);
app.use('/api', ProveedorRoutes);
app.use('/api', UsuarioRoutes);
app.use('/api', OrdenDeCompraRoutes);
app.use('/api', OrdenDeCompraProductosRoutes);
app.use('/api', ProductosRoutes);
app.use('/api', VentasRoutes);
app.use('/api', VentasProductosRoutes);
app.use('/api', ProveedorProductoRoutes);


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log('SERVER IS RUNNING ON PORT ' + PORT);
});
