const {
  BadRequest,           //400
  // Unauthorized,         //401
  // Forbidden,            //403
  Conflict,             //409
  NotFound,             //404
  InternalServerError,  //500
} = require('./serviceErrors');

const createProdutoService = (Produto) => {
  // Função para obter todos os produtos
  const getAllProdutos = async (offset = 0, limit = 10) => {
    try {
      if (offset >= 0 && limit >= 0) {
        const { count, rows } = await Produto.findAndCountAll(
          {
            offset: parseInt(offset),
            limit: parseInt(limit),
          }
        );
        // Verifica se há produtos encontrados
        if (rows) {
          return { count, rows };
        } else {
          throw new NotFound('Nenhum produto encontrado.');
        }
        // Lança um erro genérico que será tratado
      } else {
        throw new BadRequest('Parâmetros inválidos.');
      }
    } catch (error) {
      if (error instanceof NotFound) {
        throw error;
      } else if (error instanceof BadRequest) {
        throw error;
      } else {
        throw new InternalServerError('Não foi possível listar os produtos.');
      }
    }
  }

  // Obtém um Produto pelo ID
  const getProdutoById = async (id) => {
    try {
      if (id !== null || id !== undefined) {
        const produto = await Produto.findByPk(id);
        // Verifica se o Produto foi encontrado
        if (produto) {
          return produto;
        } else {
          throw new NotFound('Produto não encontrado.');
        }
      } else {
        throw new BadRequest('Parâmetros inválidos.');
      }
    } catch (error) {
      if (error instanceof NotFound) {
        throw error;
      } else if (error instanceof BadRequest) {
        throw error;
      }
      else {
        throw new InternalServerError('Não foi possível buscar o Produto.');
      }
    }
  }
  // Cria um novo Produto
  const createProduto = async (produtoData) => {
    try {
      const idExiste = await Produto.findByPk(produtoData.id);
      if (idExiste) {
        throw new Conflict();
      } else {
        const produto = await Produto.create(produtoData);
        if (produto) {
          return produto;
        } else {
          throw new Error();
        }
      }
    } catch (error) {
      if (error instanceof Conflict) {
        throw new Conflict('Produto já cadastrado no sistema.')
      } else {
        throw new InternalServerError('Não foi possível criar o Produto.')

      }
    }
  }

  const updateProduto = async (id, produtoData) => {
    try {
      const idExiste = await Produto.findByPk(id);
      if (idExiste) {
        const produto = await Produto.update(produtoData, { where: { id } })
        return produtoData;
      } else {
        throw new NotFound('Produto não encontrado.');
      }
    } catch (error) {
      if (error instanceof NotFound) {
        throw error;
      } else {
        throw new InternalServerError('Não foi possível atualizar o Produto.');
      }
    }
  }



  // Deleta um Produto pelo ID
  const deleteProduto = async (id) => {
    try {
      const idExiste = await Produto.findByPk(id);
      if (idExiste) {
        const produtoApagado = await Produto.destroy({ where: { id } });
        if (produtoApagado) {
          return produtoApagado;
        } else {
          throw new Error();
        }
      } else {
        throw new NotFound('Produto não encontrado.');
      }
    } catch (error) {
      if (error instanceof NotFound) {
        throw error;
      } else {
        throw new InternalServerError('Não foi possível atualizar o Produto.');
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

module.exports = createProdutoService;
