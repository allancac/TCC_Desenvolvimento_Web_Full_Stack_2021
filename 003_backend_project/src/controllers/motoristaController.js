const {
  BadRequest,
  Unauthorized,
  Forbidden,
  NotFound,
  InternalServerError,
  Conflict
} = require('../services/serviceErrors');


const createMotoristaController = (service) => {
  // Handler para obter todos os motoristas
  const getAllMotoristas = async (req, res) => {
    const { offset, limit } = req.query;
    try {
      const motoristas = await service.getAllMotoristas(offset, limit);
      if (motoristas.length > 0) {
        res.status(200).json(
          {
            status: {
              code: 200,
              message: "OK",
            },
            metadata: {
              offset: parseInt(offset), // Offset de registros
              limit: parseInt(limit), // Limite total de registros
              count: motoristas.length, // Total de registros retornados na requisição atual

            },
            data: motoristas
          }

        );
      } else {
        res.status(404).json({
          status: {
            code: 404,
            error: 'Nenhum motorista foi encontrado.'
          }
        });
      }

    } catch (error) {
      // Tratamento de erro genérico
      res.status(500).json({
        status: {
          code: 500,
          error: error.message
        }
      });

    }
  }

  // Handler para obter um motorista pelo CPF
  const getMotoristaByCPF = async (req, res) => {
    try {
      const { cpf } = req.params;
      const motorista = await service.getMotoristaByCPF(cpf);
      const resultado = []
      resultado.push(motorista)
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
            error: error.message
          }
        });
      } else {
        res.status(500).json({
          status: {
            code: 500,
            error: error.message
          }
        });
      }
    }
  }

  // Handler para criar um novo Motorista
  const createMotorista = async (req, res) => {
    try {
      const motoristaData = req.body;
      const motorista = await service.createMotorista(motoristaData);
      if (motorista) {
        const resultado = []
        resultado.push(motorista)
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
            error: error.message
          }
        });
      }
      // Outros erros não tratados
      else {
        res.status(500).json({
          status: {
            code: 500,
            error: error.message
          }
        });
      }
    }
  }

  // Handler para atualizar um motorista
  const updateMotorista = async (req, res) => {
    try {
      const { cpf } = req.params;
      const motoristaData = req.body;
      const motorista = await service.updateMotorista(cpf, motoristaData);
      const resultado = []
      resultado.push(motorista)
      res.status(200).json(
        {
          status: {
            code: 200,
            message: "OK",
          },
          data: resultado
        });
    } catch (error) {
      // Tratamento de erro para motorista não encontrado
      if (error instanceof NotFound) {
        res.status(404).json({
          status: {
            code: 404,
            error: error.message
          },
        });
      }
      // Tratamento de erro genérico
      else {
        res.status(500).json({
          status: {
            code: 500,
            error: error.message
          },
        });
      }

    }
  }

  // Handler para deletar um motorista
  const deleteMotorista = async (req, res) => {
    try {
      const { cpf } = req.params;
      await service.deleteMotorista(cpf);
      res.status(200).json({
        status: {
          code: 200,
          message: "Motorista excluído com sucesso.",
        }
      });
    } catch (error) {
      if (error instanceof NotFound) {
        res.status(404).json({
          status: {
            code: 404,
            error: error.message
          },
        });
      }
      else {
        res.status(500).json({
          status: {
            code: 500,
            error: error.message
          },
        });
      }
    }
  }
  return {
    getAllMotoristas,
    getMotoristaByCPF,
    createMotorista,
    updateMotorista,
    deleteMotorista
  }
}
module.exports = createMotoristaController