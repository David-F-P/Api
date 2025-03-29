const express = require('express');
const UsuarioController = require('../controllers/usuarioControllers');
const authMiddleware = require('../middleware/authMiddleware');
const verifyRole = require('../middleware/verifyRole');

const router = express.Router();

// Ver todos los usuarios - solo admin
router.get('/',
  authMiddleware,
  verifyRole(['admin']),
  UsuarioController.getAllUsuarios
);

// Crear usuario - solo admin
router.post('/',
  authMiddleware,
  verifyRole(['admin']),
  UsuarioController.createUsuario
);

// Ver usuario por ID - solo admin
router.get('/:id',
  authMiddleware,
  verifyRole(['admin']),
  UsuarioController.getUsuarioById
);

// Actualizar usuario - solo admin
router.put('/:id',
  authMiddleware,
  verifyRole(['admin']),
  UsuarioController.updateUsuario
);

// Eliminar usuario - solo admin
router.delete('/:id',
  authMiddleware,
  verifyRole(['admin']),
  UsuarioController.deleteUsuario
);

// Login - ruta pública
router.post('/login', UsuarioController.loginUsuario);

module.exports = router;
