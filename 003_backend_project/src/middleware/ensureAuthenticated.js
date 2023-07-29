const jwt = require('jsonwebtoken');

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  // Verifica se há um token válido no header 'Authorization' quando a autenticação é local
  const token = req.header('Authorization');
  // FIXME Verificar o Token corretamente
  if (token) {
    try {
      // Aqui você deve verificar se o token é válido usando a biblioteca jwt.verify()
      // Substitua 'SEU_SECRET_KEY' pela chave secreta que você usa para assinar os tokens
      // const decoded = jwt.verify(token, 'pucminas');

      // // Verifica se o token decodificado possui as informações necessárias para considerar o usuário autenticado
      // if (decoded && decoded.id) {
      //   // Se o token for válido, você pode considerar o usuário como autenticado e avançar para a próxima função de middleware
      //   return next();
      // } else {
      //   // Se o token não for válido ou não possuir as informações necessárias, retorne um erro de não autorizado
      //   return res.status(401).json({ error: "Usuário não autenticado." });
      // }
      return next();
    } catch (err) {
      // Se ocorrer um erro ao verificar o token, retorne um erro de não autorizado
      return res.status(401).json({ error: "Usuário não autenticado." });
    }
  }


  return res.status(401).json({ error: "Usuário não autenticado." });

};

module.exports = { isAuthenticated }
