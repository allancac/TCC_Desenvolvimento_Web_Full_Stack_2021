const express = require('express');
const enderecoController = require('../controllers/enderecoController');
const router = express.Router();

// Rota para obter todos os clientes
router.get('/enderecos', enderecoController.getAllEnderecos);

// Rota para obter um cliente pelo ID
router.get('/enderecos/:id', enderecoController.getEnderecoById);

// Rota para criar um novo cliente
router.post('/enderecos', enderecoController.createEndereco);

// Rota para atualizar um cliente
router.put('/enderecos/:id', enderecoController.updateEndereco);

// Rota para excluir um cliente
router.delete('/enderecos/:id', enderecoController.deleteEndereco);

module.exports = router;
