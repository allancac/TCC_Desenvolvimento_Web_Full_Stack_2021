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
      const { count, rows } = await service.getAllVendas(offset, limit);
      if (rows.length > 0) {
        return res.status(200).json({
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
        });
      }
      return res.status(404).json({
        status: {
          code: 404,
          errors: ['Nenhuma venda encontrada.']
        }
      });

    } catch (error) {
      res.status(500).json({
        status: {
          code: 500,
          errors: [error.message]
        }
      });
    }
  };

  const getVendaByFilter = async (req, res) => {
    try {
      const { id_cliente, periodo, id_produto } = req.query;
      const vendas = await service.getVendaByFilter(id_cliente, periodo, id_produto);
      if (vendas.length > 0) {
        return res.status(200).json({
          status: {
            code: 200,
            message: "OK",
          },
          data: vendas,
        });
      }
      return res.status(404).json({
        status: {
          code: 404,
          errors: ['Nenhuma venda encontrada.']
        }
      });

    } catch (error) {
      res.status(500).json({
        status: {
          code: 500,
          errors: [error.message]
        }
      });
    }
  };

  // Handler para obter uma venda pelo id
  const getVendaById = async (req, res) => {
    try {
      const { id } = req.params;
      const venda = await service.getVendaById(id);
      return res.status(200).json({
        status: {
          code: 200,
          message: 'OK'
        },
        data: [venda]
      });
    } catch (error) {
      if (error instanceof NotFound) {
        return res.status(404).json({
          status: {
            code: 404,
            errors: [error.message]
          }
        });
      }
      return res.status(500).json({
        status: {
          code: 500,
          errors: [error.message]
        }
      });
    }
  };

  // Handler para criar uma nova venda
  const createVenda = async (req, res) => {
    try {
      const vendaData = req.body;
      const venda = await service.createVenda(vendaData);
      if (venda) {
        const resultado = [];
        resultado.push(venda);
        return res.status(200).json({
          status: {
            code: 200,
            message: "OK",
          },
          data: resultado
        });
      }
    } catch (error) {
      if (error instanceof Conflict) {
        return res.status(409).json({
          status: {
            code: 409,
            errors: [error.message]
          }
        });
      }
      return res.status(500).json({
        status: {
          code: 500,
          errors: [error.message]
        }
      });
    }
  };

  // Handler para atualizar uma venda
  const updateVenda = async (req, res) => {
    try {
      const { id } = req.params;
      const vendaData = req.body;
      const venda = await service.updateVenda(id, vendaData);
      return res.status(200).json({
        status: {
          code: 200,
          message: "OK",
        },
        data: [venda]
      });
    } catch (error) {
      // Tratamento de erro para venda não encontrada
      if (error instanceof NotFound) {
        return res.status(404).json({
          status: {
            code: 404,
            errors: [error.message]
          },
        });
      }
      // Tratamento de erro genérico
      return res.status(500).json({
        status: {
          code: 500,
          errors: [error.message]
        },
      });
    }
  };

  // Handler para excluir uma venda
  const deleteVenda = async (req, res) => {
    try {
      const { id } = req.params;
      await service.deleteVenda(id);
      return res.status(200).json({
        status: {
          code: 200,
          message: "Venda excluída com sucesso.",
        }
      });
    } catch (error) {
      if (error instanceof NotFound) {
        return res.status(404).json({
          status: {
            code: 404,
            errors: [error.message]
          },
        });
      } else {
        return res.status(500).json({
          status: {
            code: 500,
            errors: [error.message]
          },
        });
      }
    }
  };

  return {
    getAllVendas,
    getVendaByFilter,
    getVendaById,
    createVenda,
    updateVenda,
    deleteVenda
  };
};

module.exports = createVendasController;