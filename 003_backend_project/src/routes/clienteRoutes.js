const router = require('express').Router();
const {
  getAllClientesValidation,
  getClienteByIdValidation,
  getClienteByNameValidation,
  createClienteValidation,
  updateClienteValidation,
  deleteClienteValidation
} = require('../validators/ClienteValidations')

//  FIXME: Usar rotas aninhadas para exibir veículos e endereços dos clientes
module.exports = (controller) => {
  // Rota para obter todos os clientes
  router.get('/', getAllClientesValidation, controller.getAllClientes);

  // Rota para obter um cliente pelo Nome
  router.get('/search', getClienteByNameValidation, controller.getClienteByName);
  
  // Rota para obter um cliente pelo ID
  router.get('/:id', getClienteByIdValidation, controller.getClienteById);

  // Rota para criar um novo cliente
  router.post('/', createClienteValidation, controller.createCliente);

  // Rota para atualizar um cliente
  router.put('/:id', updateClienteValidation, controller.updateCliente);

  // Rota para excluir um cliente
  router.delete('/:id', deleteClienteValidation, controller.deleteCliente);

  return router;
}
