const Cliente = require('../models/clienteModel');

class ClienteService {
  // Função para obter todos os clientes
  static async getAllClientes() {
    try {
      const clientes = await Cliente.findAll();
      if (!clientes) {
        throw new Error('Nenhum cliente foi encontrado.');
      }
      return clientes
    } catch (error) {
      throw new Error('Não foi possível listar os clientes.');
    }
  }

  // Função para obter um cliente pelo ID
  static async getClienteById(id) {
    try {
      const cliente = await Cliente.findByPk(id);
      if (!cliente) {
        throw new Error(`Cliente não foi encontrado.`);
      }
      return cliente;
    } catch (error) {
      throw new Error(`Não foi possível buscar o cliente ${id}.`);
    }
  }

  // Função para criar um novo cliente
  static async createCliente(ID, NOME_CLIENTE, TELEFONE, EMAIL, CNPJ, DATA_REGISTRO) {
    return await Cliente.create({ ID, NOME_CLIENTE, TELEFONE, EMAIL, CNPJ, DATA_REGISTRO });
  }

  // Função para criar um novo cliente
  static async createCliente(clienteData) {
    try {
      const cliente = await Cliente.create(clienteData);
      if (!cliente) {
        throw new Error('Erro ao criar o cliente.');
      }
      return cliente;
    } catch (error) {
      throw new Error('Não foi possível criar o cliente.');
    }
  }

  // Função para atualizar um cliente
  static async updateCliente(id, clienteData) {
    try {
      const cliente = await Cliente.findByPk(id);
      if (!cliente) {
        throw new Error('Cliente não encontrado.');
      } else {
        await cliente.update(clienteData);
        return cliente;
      }
    } catch (error) {
      throw new Error('Erro ao atualizar o cliente', error);
    }
  }

  // Função para excluir um cliente
  static async deleteCliente(id) {
    try {
      const cliente = await Cliente.findByPk(id);
      if (!cliente) {
        throw new Error('Cliente não encontrado.');
      } else {
        await cliente.destroy();
        return cliente;
      }
    } catch (error) {
      throw new Error('Não foi possível excluir o cliente.', error);
    }
  }
}
module.exports = ClienteService;