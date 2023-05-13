const Endereco = require('../models/enderecoModel');

class EnderecoService {
  // Função para obter todos os endereços
  static async getAllEnderecos() {
    try {
      const enderecos = await Endereco.findAll();
      if (!enderecos) {
        throw new Error('Nenhum enderço foi encontrado.');
      }
      return enderecos
    } catch (error) {
      throw new Error('Não foi possível listar os enderecos.', error);
    }
  }
  // Função para obter um endereço pelo ID
  static async getEnderecoById(id) {
    try {
      const endereco = await Endereco.findByPk(id);
      if (!endereco) {
        throw new Error(`Endereço não foi encontrado.`);
      }
      return endereco;
    } catch (error) {
      throw new Error('Não foi possível buscar o endereço', error);
    }
  }
  // Função para criar um novo endereço
  static async createEndereco(enderecoData) {
    try {
      const endereco = await Endereco.create(enderecoData);
      if (!endereco) {
        throw new Error('Erro ao criar o endereço.');
      }
      return endereco;
    } catch (error) {
      throw new Error('Não foi possível criar o endereço.', error);
    }
  }

  // Função para atualizar um endereço
  static async updateEndereco(id, enderecoData) {
    try {
      const endereco = await Endereco.findByPk(id);
      if (!endereco) {
        throw new Error('Endereço não encontrado.');
      } else {
        await endereco.update(enderecoData);
        return endereco;
      }
    } catch (error) {
      throw new Error('Erro ao atualizar endereço', error);
    }
  }

  // Função para excluir um endereço
  static async deleteEndereco(id) {
    try {
      const endereco = await Endereco.findByPk(id);
      if (!endereco) {
        throw new Error('Endereço não encontrado.');
      } else {
        await endereco.destroy();
        return endereco;
      }
    } catch (error) {
      throw new Error('Não foi possível excluir o endereço.', error);
    }
  }
}
module.exports = EnderecoService;


