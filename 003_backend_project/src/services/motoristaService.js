const Motorista = require('../models/motoristaModel');

class MotoristaService {
  // Função para obter todos os motoristas
  static async getAllMotoristas() {
    try {
      const motoristas = await Motorista.findAll();
      if (!motoristas) {
        throw new Error('Nenhum Motorista foi encontrado.');
      }
      return motoristas;
    } catch (error) {
      throw new Error('Não foi possível listar os motoristas.', error);
    }
  }
  // Função para obter um motorista pelo ID
  static async getMotoristaById(id) {
    try {
      const motorista = await Motorista.findByPk(id, { include: 'veiculo' });
      if (!motorista) {
        throw new Error(`Motorista não encontrado.`);
      }
      return motorista;
    } catch (error) {
      throw new Error('Não foi possível buscar o motorista', error);
    }
  }
  // Função para criar um novo motorista
  static async createMotorista(motoristaData) {
    try {
      const motorista = await Motorista.create(motoristaData);
      if (!motorista) {
        throw new Error('Erro ao criar o motorista.');
      }
      return motorista;
    } catch (error) {
      throw new Error('Não foi possível criar o motorista.', error);
    }
  }
  // Função para atualizar um motorista
  static async updateMotorista(id, motoristaData) {
    try {
      const motorista = await Motorista.findByPk(id);
      if (!motorista) {
        throw new Error('Motorista não encontrado.');
      } else {
        await motorista.update(motoristaData);
        return motorista;
      }
    } catch (error) {
      throw new Error('Não foi possível atualizar o motorista.', error);
    }
  }
  // Função para excluir um motorista
  static async deleteMotorista(id) {
    try {
      const motorista = await Motorista.findByPk(id);
      if (!motorista) {
        throw new Error('Motorista não encontrado.');
      } else {
        await motorista.destroy();
        return motorista;
      }
    } catch (error) {
      throw new Error('Não foi possível excluir o motorista.', error);
    }
  }
}

module.exports = MotoristaService;
