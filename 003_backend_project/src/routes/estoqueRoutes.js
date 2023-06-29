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
  router.get('/estoques', controller.getAllEstoques);

  /**
   * @route   GET api/estoques/:id
   * @desc    Rota para buscar um veículo pela id
   */
  router.get('/estoques/:id', controller.getEstoqueById);

  /**
   * @route   POST api/estoques
   * @desc    Rota para criar um veículo
   */
  router.post('/estoques', controller.createEstoque);

  /**
   * @route   PUT api/estoques/:id
   * @desc    Rota para atualizar um veículo
   */
  router.put('/estoques/:id', controller.updateEstoque);

  /**
   * @route   DELETE api/estoques/:id
   * @desc    Rota para excluir um veículo
   */
  router.delete('/estoques/:id', controller.deleteEstoque);

  return router;
}
module.exports = createEstoqueRoutes;
