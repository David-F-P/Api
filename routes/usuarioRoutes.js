const express = require('express');
const UsuarioController = require('../controllers/usuarioControllers');

const router = express.Router();

router.get('/usuarios', UsuarioController.getAllUsuarios);
router.post('/usuarios', UsuarioController.createUsuario);
router.get('/usuarios/:id', UsuarioController.getUsuarioById);
router.put('/usuarios/:id', UsuarioController.updateUsuario);
router.delete('/usuarios/:id', UsuarioController.deleteUsuario);
router.post('/login', UsuarioController.loginUsuario); //ruta de login

module.exports = router;
