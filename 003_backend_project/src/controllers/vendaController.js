const {
  // BadRequest,
  // Unauthorized,
  // Forbidden,
  NotFound,
  // InternalServerError,
  Conflict
} = require('../services/serviceErrors');

const createVendasController = (service) => {
  // Handler para obter todos as vendas
  const getAllVendas = async (req, res) => {
    const { offset, limit } = req.query;
    try {
      const vendas = await service.getAllVendas(offset, limit);
      if (vendas.length > 0) {
        res.status(200).json(
          {
            status: {
              code: 200,
              message: "OK",
            },
            metadata: {
              offset: parseInt(offset), // Offset de registros
              limit: parseInt(limit), // Limite total de registros
              count: vendas.length, // Total de registros retornados na requisição atual
            },
            data: vendas
          });
      } else {
        res.status(404).json({
          status: {
            code: 404,
            error: 'Nenhuma venda foi encontrado.'
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
  // Handler para obter ums venda pelo id
  const getVendaById = async (req, res) => {
    try {
      const { id } = req.params;
      const venda = await service.getVendaById(id);
      const resultado = []
      resultado.push(venda)
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
  // Handler para criar uma novo venda
  const createVenda = async (req, res) => {
    try {
      const vendaData = req.body;
      const venda = await service.createVenda(vendaData);
      if (venda) {
        const resultado = []
        resultado.push(venda)
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
  // Handler para atualizar uma venda
  const updateVenda = async (req, res) => {
    try {
      const { id } = req.params;
      const vendaData = req.body;
      const venda = await service.updateVenda(id, vendaData);
      const resultado = []
      resultado.push(venda)
      res.status(200).json(
        {
          status: {
            code: 200,
            message: "OK",
          },
          data: resultado
        });
    } catch (error) {
      // Tratamento de erro para venda não encontrada
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

  // Handler para excluir uma venda
  const deleteVenda = async (req, res) => {
    try {
      const { id } = req.params;
      await service.deleteVenda(id);
      res.status(200).json({
        status: {
          code: 200,
          message: "Venda excluído com sucesso.",
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
    getAllVendas,
    getVendaById,
    createVenda,
    updateVenda,
    deleteVenda
  }
}

module.exports = createVendasController
