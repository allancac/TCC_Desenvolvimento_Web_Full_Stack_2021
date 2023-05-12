const Cliente = require('../models/clienteModel');

// Função para obter todos os clientes
async function getAllClientes() {
  return await Cliente.findAll();
}

// Função para obter um cliente pelo ID
async function getClienteById(id) {
  return await Cliente.findByPk(id);
}

// Função para criar um novo cliente
async function createCliente(ID, NOME_CLIENTE, TELEFONE, EMAIL, CNPJ, DATA_REGISTRO) {
  return await Cliente.create({ ID, NOME_CLIENTE, TELEFONE, EMAIL, CNPJ, DATA_REGISTRO });
}

// Função para atualizar um cliente
async function updateCliente(ID, NOME_CLIENTE, TELEFONE, EMAIL, CNPJ, DATA_REGISTRO) {
  const cliente = await Cliente.findByPk(ID);
  if (cliente) {
    cliente.NOME_CLIENTE = NOME_CLIENTE;
    cliente.TELEFONE = TELEFONE;
    cliente.EMAIL = EMAIL;
    cliente.CNPJ = CNPJ;
    cliente.DATA_REGISTRO = DATA_REGISTRO;
    await cliente.save();
    return cliente;
  }
  return null;
}

// Função para excluir um cliente
async function deleteCliente(id) {
  const cliente = await Cliente.findByPk(id);
  if (cliente) {
    await cliente.destroy();
    return cliente;
  }
  return null;
}

module.exports = {
  getAllClientes,
  getClienteById,
  createCliente,
  updateCliente,
  deleteCliente,
};