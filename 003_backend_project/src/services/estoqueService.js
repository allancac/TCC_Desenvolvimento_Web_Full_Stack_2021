const {
  BadRequest,           //400
  // Unauthorized,         //401
  // Forbidden,            //403
  Conflict,             //409
  NotFound,             //404
  InternalServerError,  //500
} = require('./serviceErrors');

const createEstoqueService = (Estoque) => {
  // Função para obter todos os estoques
  const getAllEstoques = async (offset = 0, limit = 10) => {
    try {
      if (offset >= 0 && limit >= 0) {
        const { count, rows } = await Estoque.findAndCountAll(
          {
            offset: parseInt(offset),
            limit: parseInt(limit),
          }
        );
        // Verifica se há produtos encontrados
        if (rows) {
          return { count, rows };
        } else {
          throw new NotFound('Nenhum estoque encontrada.');
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
        throw new InternalServerError('Não foi possível listar os estoques.');
      }
    }
  }

  // Obtém um Estoque pelo ID
  const getEstoqueById = async (id) => {
    try {
      if (id !== null || id !== undefined) {
        const estoque = await Estoque.findByPk(id);
        // Verifica se o Estoque foi encontrado
        if (estoque) {
          return estoque;
        } else {
          throw new NotFound('Estoque não encontrado.');
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
        throw new InternalServerError('Não foi possível buscar o Estoque.');
      }
    }
  }
  // Cria um novo Estoque
  const createEstoque = async (estoqueData) => {
    try {
      // const estoqueExiste = await Estoque.findByPk(estoqueData.id);
      const estoqueExiste = await Estoque.findAll({
        where: {
          id_produto: estoqueData.id_produto,
          localizacao: estoqueData.localizacao,
          tipo_estoque: estoqueData.tipo_estoque,
          volume: estoqueData.volume,
          capacidade_maxima: estoqueData.capacidade_maxima,
        }
      });
      if (estoqueExiste.length === 1) {
        throw new Conflict();
      } else {
        const novoEstoque = await Estoque.create(estoqueData);
        if (novoEstoque) {
          return novoEstoque;
        } else {
          throw new Error();
        }
      }
    } catch (error) {
      if (error instanceof Conflict) {
        throw new Conflict('Estoque já cadastrado no sistema.')
      } else {
        throw new InternalServerError('Não foi possível criar o Estoque.')

      }
    }
  }

  const updateEstoque = async (id, estoqueData) => {
    try {
      const idExiste = await Estoque.findByPk(id);
      if (idExiste) {
        const estoque = await Estoque.update(estoqueData, { where: { id } })
        return estoqueData;
      } else {
        throw new NotFound('Estoque não encontrado.');
      }
    } catch (error) {
      if (error instanceof NotFound) {
        throw error;
      } else {
        throw new InternalServerError('Não foi possível atualizar o Estoque.');
      }
    }
  }



  // Deleta um Estoque pelo ID
  const deleteEstoque = async (id) => {
    try {
      const idExiste = await Estoque.findByPk(id);
      if (idExiste) {
        const estoqueApagado = await Estoque.destroy({ where: { id } });
        if (estoqueApagado) {
          return estoqueApagado;
        } else {
          throw new Error();
        }
      } else {
        throw new NotFound('Estoque não encontrado.');
      }
    } catch (error) {
      if (error instanceof NotFound) {
        throw error;
      } else {
        throw new InternalServerError('Não foi possível atualizar o Estoque.');
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

module.exports = createEstoqueService;
