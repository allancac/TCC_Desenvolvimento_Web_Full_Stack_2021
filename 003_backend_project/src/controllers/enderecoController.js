const enderecoService = require('../services/enderecoServices')

// Handler para obter todos os endereços
const getAllEnderecos = async (req, res) => {
  try {
    const enderecos = await enderecoService.getAllEnderecos();
    res.json(enderecos)
  } catch (error) {
    console.error('Erro ao obter os endereços:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

// Handler para obter um endereco pelo ID
const getEnderecoById = async (req, res) => {
  const { id } = req.params;
  try {
    const endereco = await enderecoService.getEnderecoById(id);
    if (!endereco) {
      return res.status(404).json({ error: 'Endereço não encontrado' });
    }
    res.json(endereco);
  } catch (error) {
    console.error('Erro ao obter o endereço:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

// Handler para criar um novo endereco
const createEndereco = async (req, res) => {
  const { ID, ID_CLIENTE, LOGRADOURO, CIDADE, ESTADO, CEP, TIPO, DATA_REGISTRO } = req.body;
  try {
    const endereco = await clienteService.createEndereco(ID, ID_CLIENTE, LOGRADOURO, CIDADE, ESTADO, CEP, TIPO, DATA_REGISTRO);
    res.status(201).json(endereco);
  } catch (error) {
    console.error('Erro ao criar o endereço:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

// Handler para atualizar um endereco
const updateEndereco = async (req, res) => {
  const { ID } = req.params;
  const { ID_CLIENTE, LOGRADOURO, CIDADE, ESTADO, CEP, TIPO, DATA_REGISTRO } = req.body;
  try {
    const endereco = await clienteService.updateEndereco(ID, ID_CLIENTE, LOGRADOURO, CIDADE, ESTADO, CEP, TIPO, DATA_REGISTRO);
    if (!endereco) {
      return res.status(404).json({ error: 'Endereco não encontrado' });
    }
    res.json(endereco);
  } catch (error) {
    console.error('Erro ao atualizar o endereço:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

// Handler para excluir um endereco
const deleteEndereco = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedEndereco = await clienteService.deleteEndereco(id);
    if (!deletedEndereco) {
      return res.status(404).json({ error: 'Endereço não encontrado' });
    }
    res.json({ message: 'Endereço excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir o Endereço:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

module.exports = {
  getAllEnderecos,
  getEnderecoById,
  createEndereco,
  updateEndereco,
  deleteEndereco,
};