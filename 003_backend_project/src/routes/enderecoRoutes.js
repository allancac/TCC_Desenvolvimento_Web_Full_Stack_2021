const router = require('express').Router();
const {
  getAllEnderecosValidation,
  getEnderecoByIdValidation,
  createEnderecoValidation,
  updateEnderecoValidation,
  deleteEnderecoValidation
} = require('../validators/EnderecosValidations');

module.exports = (controller) => {
  // Rota para obter todos os clientes
  router.get('/enderecos', getAllEnderecosValidation, controller.getAllEnderecos);

  // Rota para obter um cliente pelo ID
  router.get('/enderecos/:id', getEnderecoByIdValidation, controller.getEnderecoById);

  // Rota para criar um novo cliente
  router.post('/enderecos', createEnderecoValidation, controller.createEndereco);

  // Rota para atualizar um cliente
  router.put('/enderecos/:id', updateEnderecoValidation, controller.updateEndereco);

  // Rota para excluir um cliente
  router.delete('/enderecos/:id', deleteEnderecoValidation, controller.deleteEndereco);

  return router;
}
