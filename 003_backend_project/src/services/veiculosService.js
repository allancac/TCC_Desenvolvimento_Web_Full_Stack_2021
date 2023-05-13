const Veiculo = require('../models/veiculoModel');

class VeiculoService {
  // Função para obter todos os veículos
  static async getAllVeiculos() {
    try {
      const veiculos = await Veiculo.findAll();
      if (!veiculos) {
        throw new Error('Nenhum veículo foi encontrado.');
      }
      return veiculos
    } catch (error) {
      throw new Error('Não foi possível listar os veículos.', error);
    }
  }
  // Função para obter um veículo pela placa
  static async getVeiculoByPlaca(placa) {
    try {
      const veiculo = await Veiculo.findByPk(placa);
      if (!veiculo) {
        throw new Error('Veículo não foi encontrado.');
      }
      return veiculo;
    } catch (error) {
      throw new Error('Não foi possível buscar o veículo', error);
    }
  }
  // Função para criar um novo veiculo
  static async createVeiculo(veiculoData) {
    try {
      const veiculo = await Veiculo.create(veiculoData);
      if (!veiculo) {
        throw new Error('Erro ao criar o veiculo.');
      }
      return veiculo;
    } catch (error) {
      throw new Error('Não foi possível criar o veiculo.', error);
    }
  }
  // Função para atualizar um veículo
  static async updateVeiculo(placa, veiculoData) {
    try {
      const veiculo = await Veiculo.findByPk(placa);
      if (!veiculo) {
        throw new Error('Veículo não encontrado.');
      } else {
        await veiculo.update(veiculoData);
        return veiculo;
      }
    } catch (error) {
      throw new Error('Erro ao atualizar veículo', error);
    }
  }
  // Função para excluir um veículo
  static async deleteVeiculo(placa) {
    try {
      const veiculo = await Veiculo.findByPk(placa);
      if (!veiculo) {
        throw new Error('Veículo não encontrado.');
      } else {
        await veiculo.destroy();
        return veiculo;
      }
    } catch (error) {
      throw new Error('Não foi possível excluir o veículo.', error);
    }
  }
}

module.exports = VeiculoService;
