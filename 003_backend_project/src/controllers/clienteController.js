const {
  BadRequest,
  Unauthorized,
  Forbidden,
  NotFound,
  InternalServerError,
  Conflict
} = require('../services/serviceErrors');

const ClienteController = (service) => {
  // Handler para obter todos os clientes
  const getAllClientes = async (req, res) => {
    const { offset, limit } = req.query;
    try {
      const clientes = await service.getAllClientes(offset, limit);
      if (clientes) {
        res.status(200).json(
          {
            status: {
              code: 200,
              message: "OK",
            },
            metadata: {
              offset: parseInt(offset), // Offset de registros
              limit: parseInt(limit), // Limite total de registros
              count: clientes.length, // Total de registros retornados na requisição atual

            },
            data: clientes
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

  // Handler para obter um cliente pelo ID
  const getClienteById = async (req, res) => {
    try {
      const { id } = req.params;
      const cliente = await service.getClienteById(id);
      const resultado = []
      resultado.push(cliente)
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

  // Handler para criar um novo cliente
  const createCliente = async (req, res) => {
    try {
      const clienteData = req.body;
      const cliente = await service.getClienteById(clienteData.id);
      const resultado = []
      resultado.push(cliente)
      if (cliente) {
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

  // Handler para atualizar um cliente
  const updateCliente = async (req, res) => {
    try {
      const { id } = req.params;
      const dadosCliente = req.body;
      const cliente = await service.updateCliente(id, dadosCliente);
      const resultado = []
      resultado.push(cliente)
      res.status(200).json(
        {
          status: {
            code: 200,
            message: "OK",
          },
          data: resultado
        });
    } catch (error) {
      // Tratamento de erro para cliente não encontrado
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

  // Handler para excluir um cliente

  const deleteCliente = async (req, res) => {
    try {
      const { id } = req.params;
      await service.deleteCliente(id);
      res.status(200).json({
        status: {
          code: 200,
          message: "Cliente excluído com sucesso.",
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
    getAllClientes,
    getClienteById,
    createCliente,
    updateCliente,
    deleteCliente
  }
}
module.exports = ClienteController;
