const router = require('express').Router();

const {
  getAllVeiculosValidation,
  getVeiculoByPlacaValidation,
  createVeiculoValidation,
  updateVeiculoValidation,
  deleteVeiculoValidation
} = require('../validators/VeiculoValidations')

const createveiculoRoutes = (controller) => {
  /**
   * @route   GET api/veiculos
   * @desc    Rota para buscar todos veículos
   */
  router.get('/veiculos', getAllVeiculosValidation, controller.getAllVeiculos);

  /**
   * @route   GET api/veiculos/:placa
   * @desc    Rota para buscar um veículo pela placa
   */
  router.get('/veiculos/:placa', getVeiculoByPlacaValidation, controller.getVeiculoByPlaca);

  /**
   * @route   POST api/veiculos
   * @desc    Rota para criar um veículo
   */
  router.post('/veiculos', createVeiculoValidation, controller.createVeiculo);

  /**
   * @route   PUT api/veiculos/:placa
   * @desc    Rota para atualizar um veículo
   */
  router.put('/veiculos/:placa', updateVeiculoValidation, controller.updateVeiculo);

  /**
   * @route   DELETE api/veiculos/:placa
   * @desc    Rota para excluir um veículo
   */
  router.delete('/veiculos/:placa', deleteVeiculoValidation, controller.deleteVeiculo);

  return router;
}
module.exports = createveiculoRoutes;
