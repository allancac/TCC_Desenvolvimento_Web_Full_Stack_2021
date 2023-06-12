const router = require('express').Router();
const {
  getAllClientesValidation,
  getClienteByIdValidation,
  createClienteValidation,
  updateClienteValidation,
  deleteClienteValidation
} = require('../validators/ClienteValidations')

module.exports = (controller) => {
  // Rota para obter todos os clientes
  router.get('/clientes', getAllClientesValidation, controller.getAllClientes);

  // Rota para obter um cliente pelo ID
  router.get('/clientes/:id', getClienteByIdValidation, controller.getClienteById);

  // Rota para criar um novo cliente
  router.post('/clientes', createClienteValidation, controller.createCliente);

  // Rota para atualizar um cliente
  router.put('/clientes/:id', updateClienteValidation, controller.updateCliente);

  // Rota para excluir um cliente
  router.delete('/clientes/:id', deleteClienteValidation, controller.deleteCliente);

  return router;
}
