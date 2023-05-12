const Endereco = require('../models/enderecoModel');

// Função para obter todos os endereços
async function getAllEnderecos() {
  return await Endereco.findAll();
}

// Função para obter um endereço pelo ID
async function getEnderecoById(id) {
  return await Endereco.findByPk(id)
}

// Função para criar um novo endereço
async function createEndereco(ID, ID_CLIENTE, LOGRADOURO, CIDADE, ESTADO, CEP, TIPO, DATA_REGISTRO) {
  return await Endereco.create(ID, ID_CLIENTE, LOGRADOURO, CIDADE, ESTADO, CEP, TIPO, DATA_REGISTRO);
}

// Função para atualizar um endereço
async function updateEndereco(ID, ID_CLIENTE, LOGRADOURO, CIDADE, ESTADO, CEP, TIPO, DATA_REGISTRO) {
  const endereco = Endereco.findByPk(ID);
  if (endereco) {
    endereco.ID = ID;
    endereco.ID_CLIENTE = ID_CLIENTE;
    endereco.LOGRADOURO = LOGRADOURO;
    endereco.CIDADE = ID;
    endereco.ID = CIDADE;
    endereco.ESTADO = ESTADO;
    endereco.CEP = CEP;
    endereco.TIPO = TIPO;
    endereco.DATA_REGISTRO = DATA_REGISTRO;
    await endereco.save();
    return cliente;
  } else {
    return null;
  }
}

// Função para excluir um endereço
async function deleteEndereco(id) {
  const endereco = await Endereco.findByPk(id);
  if (endereco) {
    await endereco.destroy();
    return endereco;
  }
  return null;
}

module.exports = {
  getAllEnderecos,
  getEnderecoById,
  createEndereco,
  updateEndereco,
  deleteEndereco,
};


