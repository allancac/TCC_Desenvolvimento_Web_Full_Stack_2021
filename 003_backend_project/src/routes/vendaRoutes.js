const router = require('express').Router();

// const {
//   getAllVendasValidation,
//   getVendaByPlacaValidation,
//   createVendaValidation,
//   updateVendaValidation,
//   deleteVendaValidation
// } = require('../validators/VendaValidations')

const createvendaRoutes = (controller) => {
  /**
   * @route   GET api/vendas
   * @desc    Rota para buscar todos veículos
   */
  //  TODO: Implementar o validador para a rota GET /vendas
  router.get('/vendas', controller.getAllVendas);

  /**
   * @route   GET api/vendas/:id
   * @desc    Rota para buscar um veículo pela id
  */
  //  TODO: Implementar o validador para a rota GET /vendas/:id
  router.get('/vendas/:id', controller.getVendaById);

  /**
   * @route   POST api/vendas
   * @desc    Rota para criar um veículo
  */
  //  TODO: Implementar o validador para a rota POST /vendas/
  router.post('/vendas', controller.createVenda);

  /**
   * @route   PUT api/vendas/:id
   * @desc    Rota para atualizar um veículo
  */
  //  TODO: Implementar o validador para a rota PUT /vendas/:id
  router.put('/vendas/:id', controller.updateVenda);

  /**
   * @route   DELETE api/vendas/:id
   * @desc    Rota para excluir um veículo
  */
  //  TODO: Implementar o validador para a rota DELETE /vendas/:id
  router.delete('/vendas/:id', controller.deleteVenda);

  return router;
}
module.exports = createvendaRoutes;
