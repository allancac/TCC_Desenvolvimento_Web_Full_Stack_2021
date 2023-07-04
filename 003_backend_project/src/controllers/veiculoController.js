const {
  // BadRequest,
  // Unauthorized,
  // Forbidden,
  NotFound,
  // InternalServerError,
  Conflict
} = require('../services/serviceErrors');

const createVeiculosController = (service) => {
  // Handler para obter todos os veículos
  const getAllVeiculos = async (req, res) => {
    const { offset, limit } = req.query;
    try {
      const { count, rows } = await service.getAllVeiculos(offset, limit);
      if (rows.length > 0) {
        res.status(200).json(
          {
            status: {
              code: 200,
              message: "OK",
            },
            metadata: {
              offset: parseInt(offset), // Offset de registros
              limit: parseInt(limit), // Limite total de registros
              count: rows.length, // Total de registros retornados na requisição atual
              countAll: count
            },
            data: rows
          }
        );
      } else {
        res.status(404).json({
          status: {
            code: 404,
            erros: ['Nenhum veículo foi encontrado.']
          }
        });
      }
    } catch (error) {
      // Tratamento de erro genérico
      res.status(500).json({
        status: {
          code: 500,
          errors: [error.message]
        }
      });
    }
  }
  // Handler para obter um veículo pela placa
  const getVeiculoByPlaca = async (req, res) => {
    try {
      const { placa } = req.params;
      const veiculo = await service.getVeiculoByPlaca(placa);
      const resultado = []
      resultado.push(veiculo)
      res.status(200).json({
        status: {
          code: 200,
          message: 'OK'
        },
        data: resultado
      });

    } catch (error) {
      if (error instanceof NotFound) {
        res.status(404).json({
          status: {
            code: 404,
            errors: [error.message]
          }
        });
      } else {
        res.status(500).json({
          status: {
            code: 500,
            errors: [error.message]
          }
        });
      }
    }
  }
  // Handler para criar um novo veículo
  const createVeiculo = async (req, res) => {
    try {
      const veiculoData = req.body;
      const veiculo = await service.createVeiculo(veiculoData);
      if (veiculo) {
        const resultado = []
        resultado.push(veiculo)
        res.status(200).json(
          {
            status: {
              code: 200,
              message: "OK",
            },
            data: resultado

          }
        );
      }
    } catch (error) {
      // Tratamento de erro para requisição inválida
      if (error instanceof Conflict) {
        res.status(409).json({
          status: {
            code: 409,
            errors: [error.message]
          }
        });
      }
      // Outros erros não tratados
      else {
        res.status(500).json({
          status: {
            code: 500,
            errors: [error.message]
          }
        });
      }
    }
  }
  // Handler para atualizar um veículo
  const updateVeiculo = async (req, res) => {
    try {
      const { placa } = req.params;
      const veiculoData = req.body;
      const veiculo = await service.updateVeiculo(placa, veiculoData);
      const resultado = []
      resultado.push(veiculo)
      res.status(200).json(
        {
          status: {
            code: 200,
            message: "OK",
          },
          data: resultado
        });
    } catch (error) {
      // Tratamento de erro para veiculo não encontrado
      if (error instanceof NotFound) {
        res.status(404).json({
          status: {
            code: 404,
            errors: [error.message]
          },
        });
      }
      // Tratamento de erro genérico
      else {
        res.status(500).json({
          status: {
            code: 500,
            errors: [error.message]
          },
        });
      }

    }
  }

  // Handler para excluir um veículo
  const deleteVeiculo = async (req, res) => {
    try {
      const { placa } = req.params;
      await service.deleteVeiculo(placa);
      res.status(200).json({
        status: {
          code: 200,
          message: "Veiculo excluído com sucesso.",
        }
      });
    } catch (error) {
      if (error instanceof NotFound) {
        res.status(404).json({
          status: {
            code: 404,
            errors: [error.message]
          },
        });
      }
      else {
        res.status(500).json({
          status: {
            code: 500,
            errors: [error.message]
          },
        });
      }
    }
  }
  return {
    getAllVeiculos,
    getVeiculoByPlaca,
    createVeiculo,
    updateVeiculo,
    deleteVeiculo
  }
}

module.exports = createVeiculosController
