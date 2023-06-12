const {
  BadRequest,
  Unauthorized,
  Forbidden,
  NotFound,
  InternalServerError,
  Conflict
} = require('../services/serviceErrors');



const EnderecoController = (service) => {
  // Handler para obter todos os endereços
  const getAllEnderecos = async (req, res) => {
    const { offset, limit } = req.query;
    try {
      const enderecos = await service.getAllEnderecos(offset, limit);
      if (enderecos) {
        res.status(200).json(
          {
            status: {
              code: 200,
              message: "OK",
            },
            metadata: {
              offset: parseInt(offset), // Offset de registros
              limit: parseInt(limit), // Limite total de registros
              count: enderecos.length, // Total de registros retornados na requisição atual

            },
            data: enderecos
          }

        );
        return
      }

      res.status(404).json({
        status: {
          code: 404,
          error: error.message
        }
      });
      return

    } catch (error) {
      // Tratamento de erro genérico
      console.log(error)
      res.status(500).json({
        status: {
          code: 500,
          error: error.message
        }
      });

    }
  }

  // Handler para obter um endereço pelo ID
  const getEnderecoById = async (req, res) => {
    try {
      const { id } = req.params;
      const endereco = await service.getEndrecoById(id);
      const resultado = []
      resultado.push(endereco)
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
        console.log(error);
        res.status(500).json({
          status: {
            code: 500,
            error: error.message
          }
        });
      }
    }
  }

  // Handler para criar um novo endereço
  const createEndereco = async (req, res) => {
    try {
      const enderecoData = req.body;
      const endereco = await service.createEndereco(enderecoData);
      const resultado = []
      resultado.push(endereco)
      if (endereco) {
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

  // Handler para atualizar um endereço
  const updateEndereco = async (req, res) => {
    try {
      const { cpf } = req.params;
      const enderecoData = req.body;
      const endereco = await service.updateEndereco(cpf, enderecoData);
      const resultado = []
      resultado.push(endereco)
      res.status(200).json(
        {
          status: {
            code: 200,
            message: "OK",
          },
          data: resultado
        });
    } catch (error) {
      // Tratamento de erro para endereco não encontrado
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

  // Handler para excluir um endereço
  const deleteEndereco = async (req, res) => {
    try {
      const { id } = req.params;
      await service.deleteEndereco(id);
      res.status(200).json({
        status: {
          code: 200,
          message: "Enreceço excluído com sucesso.",
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
    getAllEnderecos,
    getEnderecoById,
    createEndereco,
    updateEndereco,
    deleteEndereco
  }
}
module.exports = EnderecoController;