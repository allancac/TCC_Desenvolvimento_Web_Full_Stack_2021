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
  //  TODO: Implementar o validador para a rota GET /usuarios
  router.get('/usuarios', controller.getAllUsuarios);

  /**
   * @route   GET api/usuarios/:id
   * @desc    Rota para buscar um veículo pela id
  */
  //  TODO: Implementar o validador para a rota GET /usuarios:id
  router.get('/usuarios/:id', controller.getUsuarioById);

  /**
   * @route   POST api/usuarios
   * @desc    Rota para criar um veículo
  */
  //  TODO: Implementar o validador para a rota POST /usuarios
  router.post('/usuarios', controller.createUsuario);

  /**
   * @route   PUT api/usuarios/:id
   * @desc    Rota para atualizar um veículo
  */
  //  TODO: Implementar o validador para a rota PUT /usuarios/:id
  router.put('/usuarios/:id', controller.updateUsuario);

  /**
   * @route   DELETE api/usuarios/:id
   * @desc    Rota para excluir um veículo
  */
  //  TODO: Implementar o validador para a rota DELETE /usuarios/:id
  router.delete('/usuarios/:id', controller.deleteUsuario);

  return router;
}
module.exports = createUsuarioRoutes;
