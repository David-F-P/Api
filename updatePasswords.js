const pool = require('./config/db'); // Asegúrate de que la ruta es correcta
const bcrypt = require('bcrypt');

async function updatePasswords() {
    try {
        const usuarios = await pool.query('SELECT id_usuario, contrasena FROM usuario');

        for (let usuario of usuarios.rows) {
            console.log(`🔍 Usuario ID: ${usuario.id_usuario}, Contraseña actual: ${usuario.contrasena}`);

            // Si ya está encriptada, la saltamos
            if (usuario.contrasena.startsWith('$2b$')) {
                console.log(`⏭️ Saltando usuario ID ${usuario.id_usuario}, ya tiene contraseña encriptada.`);
                continue;
            }

            const hashedPassword = await bcrypt.hash(usuario.contrasena, 60);

            await pool.query('UPDATE usuario SET contrasena = $1 WHERE id_usuario = $2', [hashedPassword, usuario.id_usuario]);

            console.log(`✅ Contraseña actualizada para usuario ID: ${usuario.id_usuario}`);
        }

        console.log('✅ Todas las contraseñas han sido hasheadas correctamente.');
    } catch (error) {
        console.error('❌ Error al actualizar contraseñas:', error);
    } finally {
        pool.end();
    }
}

updatePasswords();
