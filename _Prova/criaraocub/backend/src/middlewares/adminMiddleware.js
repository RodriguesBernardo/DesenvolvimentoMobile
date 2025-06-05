const adminMiddleware = (req, res, next) => {
    if (req.user.role !== 'admin') {
      return res.status(403).send({ error: 'Acesso negado. Requer privilégios de administrador.' });
    }
    next();
  };
  
  module.exports = adminMiddleware;