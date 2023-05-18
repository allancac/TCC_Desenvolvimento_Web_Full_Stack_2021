const express = require('express');
const MotoristaController = require('../controllers/motoristaController');

const router = express.Router();


/**
 * @route   GET api/motoristas
 * @desc    Rota para buscar todos motoristas
 * @access  Private
 */
router.get('/motoristas', MotoristaController.getAllMotoristas);

/**
 * @route   GET api/motoristas/:cpf
 * @desc    Rota para buscar um motorista por ID
 * @access  Private
 */
router.get('/motoristas/:cpf', MotoristaController.getMotoristaByCPF);

/**
 * @route   POST api/motoristas
 * @desc    Rota para criar um motorista
 * @access  Private
 */
router.post('/motoristas', MotoristaController.createMotorista);

/**
 * @route   PUT api/motoristas/:cpf
 * @desc    Rota para atualizar um motorista
 * @access  Private
 */
router.put('/motoristas/:cpf', MotoristaController.updateMotorista);

/**
 * @route   DELETE api/motoristas/:cpf
 * @desc    Rota para excluir um motorista
 * @access  Private
 */
router.delete('/motoristas/:cpf', MotoristaController.deleteMotorista);

module.exports = router;
