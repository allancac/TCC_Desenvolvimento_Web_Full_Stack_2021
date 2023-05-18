const MotoristaService = require('../services/motoristaService');
const {
  BadRequest,
  Unauthorized,
  Forbidden,
  NotFound,
  InternalServerError,
  Conflict
} = require('../services/serviceErrors');

class MotoristaController {
  // Handler para obter todos os motoristas
  static async getAllMotoristas(req, res) {
    const { offset, limit } = req.query;
    try {
      const motoristas = await MotoristaService.getAllMotoristas(offset, limit);
      res.status(200).json(motoristas);
    } catch (error) {
      // Tratamento de erro para motoristas não encontrados
      if (error instanceof NotFound) {
        res.status(404).json({ error: error.message });
      }
      // Tratamento de erro genérico
      else if (error instanceof InternalServerError) {
        res.status(500).json({ error: error.message });
      }
      // Outros erros não tratados
      else {
        res.status(500).json({ error: 'Erro ao obter os motoristas.' });
      }
    }
  }

  // Handler para obter um motorista pelo CPF
  static async getMotoristaByCPF(req, res) {
    try {
      const { cpf } = req.params;
      const motorista = await MotoristaService.getMotoristaByCPF(cpf);
      res.status(200).json(motorista);
    } catch (error) {
      // Tratamento de erro para motorista não encontrado
      if (error instanceof NotFound) {
        res.status(404).json({ error: error.message });
      }
      // Tratamento de erro genérico
      else if (error instanceof InternalServerError) {
        res.status(500).json({ error: error.message });
      }
      // Outros erros não tratados
      else {
        res.status(500).json({ error: 'Não foi possível buscar o motorista.' });
      }
    }
  }

  // Handler para criar um novo Motorista
  static async createMotorista(req, res) {
    try {
      const motoristaData = req.body;
      const motorista = await MotoristaService.createMotorista(motoristaData);
      res.status(201).json(motorista);
    } catch (error) {
      // Tratamento de erro para requisição inválida
      if (error instanceof BadRequest) {
        res.status(400).json({ error: error.message });
      }
      // Tratamento de erro genérico
      else if (error instanceof InternalServerError) {
        res.status(500).json({ error: error.message });
      }
      // Outros erros não tratados
      else {
        res.status(500).json({ error: 'Não foi possível criar o motorista.' });
      }
    }
  }

  // Handler para atualizar um motorista
  static async updateMotorista(req, res) {
    try {
      const { cpf } = req.params;
      const motoristaData = req.body;
      const motorista = await MotoristaService.updateMotorista(cpf, motoristaData);
      res.status(200).json(motorista);
    } catch (error) {
      // Tratamento de erro para motorista não encontrado
      if (error instanceof NotFound) {
        res.status(404).json({ error: error.message });
      }
      // Tratamento de erro genérico
      else if (error instanceof InternalServerError) {
        res.status(500).json({ error: error.message });
      }
      // Outros erros não tratados
      else {
        res.status(500).json({ error: 'Não foi possível atualizar o motorista.' });
      }
    }
  }

  // Handler para deletar um motorista
  static async deleteMotorista(req, res) {
    try {
      const { cpf } = req.params;
      const motorista = await MotoristaService.deleteMotorista(cpf);
      // Resposta de sucesso ao deletar o motorista
      res.status(204).json({ message: 'Motorista excluído com sucesso.' });
    } catch (error) {
      // Tratamento de erro para motorista não encontrado
      if (error instanceof NotFound) {
        res.status(404).json({ error: error.message });
      }
      // Tratamento de erro genérico
      else if (error instanceof InternalServerError) {
        res.status(500).json({ error: error.message });
      }
      // Outros erros não tratados
      else {
        res.status(500).json({ error: 'Não foi possível excluir o motorista.' });
      }
    }
  }
}

module.exports = MotoristaController;
