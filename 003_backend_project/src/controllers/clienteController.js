const clienteService = require('../services/clienteService');

// Handler para obter todos os clientes
async function getAllClientes(req, res) {
  try {
    const clientes = await clienteService.getAllClientes();
    res.json(clientes);
  } catch (error) {
    console.error('Erro ao obter os clientes:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

// Handler para obter um cliente pelo ID
async function getClienteById(req, res) {
  const { id } = req.params;
  try {
    const cliente = await clienteService.getClienteById(id);
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }
    res.json(cliente);
  } catch (error) {
    console.error('Erro ao obter o cliente:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

// Handler para criar um novo cliente
async function createCliente(req, res) {
  const { nome, idade, email } = req.body;
  try {
    const cliente = await clienteService.createCliente(nome, idade, email);
    res.status(201).json(cliente);
  } catch (error) {
    console.error('Erro ao criar o cliente:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

// Handler para atualizar um cliente
async function updateCliente(req, res) {
  const { id } = req.params;
  const { nome, idade, email } = req.body;
  try {
    const cliente = await clienteService.updateCliente(id, nome, idade, email);
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }
    res.json(cliente);
  } catch (error) {
    console.error('Erro ao atualizar o cliente:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

// Handler para excluir um cliente
async function deleteCliente(req, res) {
  const { id } = req.params;
  try {
    const deletedCliente = await clienteService.deleteCliente(id);
    if (!deletedCliente) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }
    res.json({ message: 'Cliente excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir o cliente:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

module.exports = {
  getAllClientes,
  getClienteById,
  createCliente,
  updateCliente,
  deleteCliente,
};
