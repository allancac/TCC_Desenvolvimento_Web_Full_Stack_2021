const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next(); // Se o usuário estiver autenticado, permita o acesso à próxima rota
  }

  res.status(401).json({ message: 'Acesso não autorizado' }); // Se o usuário não estiver autenticado, retorne um status de não autorizado
};

module.exports = ensureAuthenticated;