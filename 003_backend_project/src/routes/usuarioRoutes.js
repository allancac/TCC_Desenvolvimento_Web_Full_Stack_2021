const router = require('express').Router();

// const {
//   getAllUsuariosValidation,
//   getUsuarioByPlacaValidation,
//   createUsuarioValidation,
//   updateUsuarioValidation,
//   deleteUsuarioValidation
// } = require('../validators/UsuarioValidations')

const createUsuarioRoutes = (controller) => {
  /**
   * @route   GET api/usuarios
   * @desc    Rota para buscar todos usuarios
   */
  router.get('/usuarios', controller.getAllUsuarios);

  /**
   * @route   GET api/usuarios/:id
   * @desc    Rota para buscar um veículo pela id
   */
  router.get('/usuarios/:id', controller.getUsuarioById);

  /**
   * @route   POST api/usuarios
   * @desc    Rota para criar um veículo
   */
  router.post('/usuarios', controller.createUsuario);

  /**
   * @route   PUT api/usuarios/:id
   * @desc    Rota para atualizar um veículo
   */
  router.put('/usuarios/:id', controller.updateUsuario);

  /**
   * @route   DELETE api/usuarios/:id
   * @desc    Rota para excluir um veículo
   */
  router.delete('/usuarios/:id', controller.deleteUsuario);

  return router;
}
module.exports = createUsuarioRoutes;
