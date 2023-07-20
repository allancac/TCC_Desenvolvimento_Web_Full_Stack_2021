const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next(); // Se o usuário estiver autenticado, permita o acesso à próxima rota
  }

  return res.status(401).json({
    status: {
      code: 401,
      errors: ['Acesso não autorizado']
    }
  });
};

module.exports = ensureAuthenticated;