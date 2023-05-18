const Motorista = require('../models/motoristaModel');
const {
  BadRequest,
  Unauthorized,
  Forbidden,
  NotFound,
  InternalServerError,
  Conflict
} = require('./serviceErrors');

class MotoristaService {
  // Obtém todos os motoristas com paginação
  static async getAllMotoristas(offset = 0, limit = 20) {
    try {
      const motoristas = await Motorista.findAll({
        offset: parseInt(offset),
        limit: parseInt(limit),
      });
      // Verifica se há motoristas encontrados
      if (motoristas.length > 0) {
        return motoristas;
      } else {
        throw new NotFound('Nenhum motorista foi encontrado.');
      }
    } catch (error) {
      throw new InternalServerError('Não foi possível listar os motoristas.', error);
    }
  }

  // Obtém um motorista pelo CPF
  static async getMotoristaByCPF(cpf) {
    try {
      const motorista = await Motorista.findByPk(cpf, {
        include: 'veiculo', // Inclui a entidade Veículo na consulta
      });
      // Verifica se o motorista foi encontrado
      if (motorista) {
        return motorista;
      } else {
        throw new NotFound('Motorista não encontrado.');
      }
    } catch (error) {
      throw new InternalServerError('Não foi possível buscar o motorista.', error);
    }
  }

  // Cria um novo motorista
  static async createMotorista(motoristaData) {
    try {
      const motorista = await Motorista.create(motoristaData);
      // Verifica se o motorista foi criado com sucesso
      if (motorista) {
        return motorista;
      } else {
        throw new InternalServerError('Erro ao criar o motorista.');
      }
    } catch (error) {
      throw new InternalServerError('Não foi possível criar o motorista.', error);
    }
  }

  // Atualiza um motorista existente pelo CPF
  static async updateMotorista(cpf, motoristaData) {
    try {
      const motorista = await Motorista.findByPk(cpf);
      // Verifica se o motorista foi encontrado
      if (motorista) {
        await motorista.update(motoristaData);
        return motorista;
      } else {
        throw new NotFound('Motorista não encontrado.');
      }
    } catch (error) {
      throw new InternalServerError('Não foi possível atualizar o motorista.', error);
    }
  }

  // Deleta um motorista pelo CPF
  static async deleteMotorista(cpf) {
    try {
      const motorista = await Motorista.findByPk(cpf);
      // Verifica se o motorista foi encontrado
      if (motorista) {
        await motorista.destroy();
        return motorista;
      } else {
        throw new NotFound('Motorista não encontrado.');
      }
    } catch (error) {
      throw new InternalServerError('Não foi possível excluir o motorista.', error);
    }
  }
}

module.exports = MotoristaService;
