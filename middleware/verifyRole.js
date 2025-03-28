const verifyRole = (allowedRoles) => {
    return (req, res, next) => {
      const user = req.user;
  
      if (!user) {
        return res.status(401).json({ message: 'No autorizado' });
      }
  
      if (!allowedRoles.includes(user.rol)) {
        return res.status(403).json({ message: 'No tienes permisos suficientes' });
      }
  
      next();
    };
  };
  
  module.exports = verifyRole;
  