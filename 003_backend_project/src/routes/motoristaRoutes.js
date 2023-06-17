const router = require('express').Router();
const {
  getAllMotoristasValidation,
  getMotoristaByCPFValidation,
  createMotoristaValidation,
  updateMotoristaValidation,
  deleteMotoristaValidation
} = require('../validators/MotoristasValidations');

module.exports = (controller) => {

  /**
   * @route   GET api/motoristas
   * @desc    Rota para buscar todos motoristas
   */
  router.get('/motoristas', getAllMotoristasValidation, controller.getAllMotoristas);

  /**
   * @route   GET api/motoristas/:cpf
   * @desc    Rota para buscar um motorista peplo CPF
   */
  router.get('/motoristas/:cpf', getMotoristaByCPFValidation, controller.getMotoristaByCPF);

  /**
   * @route   POST api/motoristas
   * @desc    Rota para criar um motorista
   */
  router.post('/motoristas', createMotoristaValidation, controller.createMotorista);

  /**
   * @route   PUT api/motoristas/:cpf
   * @desc    Rota para atualizar um motorista
   */
  router.put('/motoristas/:cpf', updateMotoristaValidation, controller.updateMotorista);

  /**
   * @route   DELETE api/motoristas/:cpf
   * @desc    Rota para excluir um motorista
   */
  router.delete('/motoristas/:cpf', deleteMotoristaValidation, controller.deleteMotorista);

  return router;
}
