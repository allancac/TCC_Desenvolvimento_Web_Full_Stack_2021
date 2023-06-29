const {
  // BadRequest,
  // Unauthorized,
  // Forbidden,
  NotFound,
  // InternalServerError,
  Conflict
} = require('../services/serviceErrors');

const createProdutosController = (service) => {
  // Handler para obter todos os produtos
  const getAllProdutos = async (req, res) => {
    const { offset, limit } = req.query;
    try {
      const produtos = await service.getAllProdutos(offset, limit);
      if (produtos.length > 0) {
        res.status(200).json(
          {
            status: {
              code: 200,
              message: "OK",
            },
            metadata: {
              offset: parseInt(offset), // Offset de registros
              limit: parseInt(limit), // Limite total de registros
              count: produtos.length, // Total de registros retornados na requisição atual
            },
            data: produtos
          });
      } else {
        res.status(404).json({
          status: {
            code: 404,
            error: 'Nenhum produto foi encontrado.'
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
  // Handler para obter um produto pela id
  const getProdutoById = async (req, res) => {
    try {
      const { id } = req.params;
      const produto = await service.getProdutoById(id);
      const resultado = []
      resultado.push(produto)
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
  // Handler para criar um novo produto
  const createProduto = async (req, res) => {
    try {
      const produtoData = req.body;
      const produto = await service.createProduto(produtoData);
      if (produto) {
        const resultado = []
        resultado.push(produto)
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
  // Handler para atualizar um produto
  const updateProduto = async (req, res) => {
    try {
      const { id } = req.params;
      const produtoData = req.body;
      const produto = await service.updateProduto(id, produtoData);
      const resultado = []
      resultado.push(produto)
      res.status(200).json(
        {
          status: {
            code: 200,
            message: "OK",
          },
          data: resultado
        });
    } catch (error) {
      // Tratamento de erro para produto não encontrado
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

  // Handler para excluir um produto
  const deleteProduto = async (req, res) => {
    try {
      const { id } = req.params;
      await service.deleteProduto(id);
      res.status(200).json({
        status: {
          code: 200,
          message: "Produto excluído com sucesso.",
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
    getAllProdutos,
    getProdutoById,
    createProduto,
    updateProduto,
    deleteProduto
  }
}

module.exports = createProdutosController
