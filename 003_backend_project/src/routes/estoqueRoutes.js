const router = require('express').Router();

// const {
//   getAllEstoquesValidation,
//   getEstoqueByPlacaValidation,
//   createEstoqueValidation,
//   updateEstoqueValidation,
//   deleteEstoqueValidation
// } = require('../validators/EstoqueValidations')

const createEstoqueRoutes = (controller) => {
  /**
   * @route   GET api/estoques
   * @desc    Rota para buscar todos estoques
   */

  //  TODO: Implementar o validador para a rota GET /estoques
  router.get('/', controller.getAllEstoques);

  /**
   * @route   GET api/estoques/:id
   * @desc    Rota para buscar um veículo pela id
   */
  //  TODO: Implementar o validador para a rota GET /estoques/:id
  router.get('/:id', controller.getEstoqueById);

  /**
   * @route   POST api/estoques
   * @desc    Rota para criar um veículo
  */
  //  TODO: Implementar o validador para a rota POST /estoques
  router.post('/', controller.createEstoque);

  /**
   * @route   PUT api/estoques/:id
   * @desc    Rota para atualizar um veículo
  */
  //  TODO: Implementar o validador para a rota PUT /estoques/:id
  router.put('/:id', controller.updateEstoque);

  /**
   * @route   DELETE api/estoques/:id
   * @desc    Rota para excluir um veículo
  */
  //  TODO: Implementar o validador para a rota DELETE /estoques/:id
  router.delete('/:id', controller.deleteEstoque);

  return router;
}
module.exports = createEstoqueRoutes;
