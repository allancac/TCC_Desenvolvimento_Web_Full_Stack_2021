const router = require('express').Router();

// const {
//   getAllProdutosValidation,
//   getProdutoByPlacaValidation,
//   createProdutoValidation,
//   updateProdutoValidation,
//   deleteProdutoValidation
// } = require('../validators/ProdutoValidations')

const createprodutoRoutes = (controller) => {
  /**
   * @route   GET api/produtos
   * @desc    Rota para buscar todos produtos
   */
  //  TODO: Implementar o validador para a rota GET /produtos
  router.get('/produtos', controller.getAllProdutos);

  /**
   * @route   GET api/produtos/:id
   * @desc    Rota para buscar um veículo pela id
  */
  //  TODO: Implementar o validador para a rota GET /produtos/:id
  router.get('/produtos/:id', controller.getProdutoById);

  /**
   * @route   POST api/produtos
   * @desc    Rota para criar um veículo
  */
  //  TODO: Implementar o validador para a rota POST /produtos/
  router.post('/produtos', controller.createProduto);

  /**
   * @route   PUT api/produtos/:id
   * @desc    Rota para atualizar um veículo
  */
  //  TODO: Implementar o validador para a rota PUT /produtos/>id
  router.put('/produtos/:id', controller.updateProduto);

  /**
   * @route   DELETE api/produtos/:id
   * @desc    Rota para excluir um veículo
  */
  //  TODO: Implementar o validador para a rota DELETE /produtos/:id
  router.delete('/produtos/:id', controller.deleteProduto);

  return router;
}
module.exports = createprodutoRoutes;
