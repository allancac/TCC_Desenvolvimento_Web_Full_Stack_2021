const {
  // BadRequest,
  // Unauthorized,
  // Forbidden,
  NotFound,
  // InternalServerError,
  Conflict
} = require('../services/serviceErrors');

const ClienteController = (service) => {
  // Handler para obter todos os clientes
  const getAllClientes = async (req, res) => {
    const { offset, limit } = req.query;
    try {
      const { count, rows } = await service.getAllClientes(offset, limit);
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
            errors: ['Nenhum cliente foi encontrado.']
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

  // Handler para obter um cliente pelo ID
  const getClienteById = async (req, res) => {
    const { id } = req.params;
    try {
      const cliente = await service.getClienteById(id);
      res.status(200).json({
        status: {
          code: 200,
          message: 'OK'
        },
        data: [cliente]
      });
    } catch (error) {
      if (error instanceof NotFound) {
        res.status(404).json({
          status: {
            code: 404,
            errors: [error.message]
          }
        });
      }
      res.status(500).json({
        status: {
          code: 500,
          errors: [error.message]
        }
      });

    }
  }

  // Handler para obter um cliente pelo Nome
  const getClienteByName = async (req, res) => {
    const { name } = req.query;
    try {
      const resultado = await service.getClienteByName(name);
      res.status(200).json({
        status: {
          code: 200,
          message: 'OK'
        },
        data: [resultado]
      });
    } catch (error) {
      if (error instanceof NotFound) {
        res.status(404).json({
          status: {
            code: 404,
            errors: [error.message]
          }
        });
      }
      res.status(500).json({
        status: {
          code: 500,
          errors: [error.message]
        }
      });

    }
  }



  // Handler para criar um novo cliente
  const createCliente = async (req, res) => {
    try {
      const clienteData = req.body;
      const cliente = await service.createCliente(clienteData);
      if (cliente) {
        const resultado = []
        resultado.push(cliente)
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
      res.status(500).json({
        status: {
          code: 500,
          errors: [error.message]
        }
      });

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
            errors: [error.message]
          },
        });
      }
      res.status(500).json({
        status: {
          code: 500,
          errors: [error.message]
        },
      });


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
            errors: [error.message]
          },
        });
      }
      res.status(500).json({
        status: {
          code: 500,
          errors: [error.message]
        },
      });

    }
  }
  return {
    getAllClientes,
    getClienteById,
    getClienteByName,
    createCliente,
    updateCliente,
    deleteCliente
  }
}
module.exports = ClienteController;
