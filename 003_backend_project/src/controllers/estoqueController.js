const {
  // BadRequest,
  // Unauthorized,
  // Forbidden,
  NotFound,
  // InternalServerError,
  Conflict
} = require('../services/serviceErrors');

const createEstoquesController = (service) => {
  // Handler para obter todos os estoques
  const getAllEstoques = async (req, res) => {
    const { offset, limit } = req.query;
    try {
      const { count, rows } = await service.getAllEstoques(offset, limit);
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
            errors: ['Nenhum estoque foi encontrado.']
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
  // Handler para obter um estoque pela id
  const getEstoqueById = async (req, res) => {
    try {
      const { id } = req.params;
      const estoque = await service.getEstoqueById(id);
      const resultado = []
      resultado.push(estoque)
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
  // Handler para criar um novo estoque
  const createEstoque = async (req, res) => {
    try {
      const estoqueData = req.body;
      const estoque = await service.createEstoque(estoqueData);
      if (estoque) {
        const resultado = []
        resultado.push(estoque)
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
  // Handler para atualizar um estoque
  const updateEstoque = async (req, res) => {
    try {
      const { id } = req.params;
      const estoqueData = req.body;
      const estoque = await service.updateEstoque(id, estoqueData);
      const resultado = []
      resultado.push(estoque)
      res.status(200).json(
        {
          status: {
            code: 200,
            message: "OK",
          },
          data: resultado
        });
    } catch (error) {
      // Tratamento de erro para estoque não encontrado
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

  // Handler para excluir um estoque
  const deleteEstoque = async (req, res) => {
    try {
      const { id } = req.params;
      await service.deleteEstoque(id);
      res.status(200).json({
        status: {
          code: 200,
          message: "Estoque excluído com sucesso.",
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
    getAllEstoques,
    getEstoqueById,
    createEstoque,
    updateEstoque,
    deleteEstoque
  }
}

module.exports = createEstoquesController
