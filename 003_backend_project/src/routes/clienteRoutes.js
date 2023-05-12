const express = require('express');
const clienteController = require('../controllers/clienteController');
const router = express.Router();

// Rota para obter todos os clientes
router.get('/clientes', clienteController.getAllClientes);

// Rota para obter um cliente pelo ID
router.get('/clientes/:id', clienteController.getClienteById);

// Rota para criar um novo cliente
router.post('/clientes', clienteController.createCliente);

// Rota para atualizar um cliente
router.put('/clientes/:id', clienteController.updateCliente);

// Rota para excluir um cliente
router.delete('/clientes/:id', clienteController.deleteCliente);

module.exports = router;
