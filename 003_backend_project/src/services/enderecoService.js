const {
  BadRequest,           //400
  Unauthorized,         //401
  Forbidden,            //403
  Conflict,             //409
  NotFound,             //404
  InternalServerError,  //500
} = require('./serviceErrors');

const createEnderecoService = (Endereco) => {
  // Função para obter todos os endereços
  const getAllEnderecos = async (offset = 0, limit = 10) => {
    try {
      if (offset >= 0 && limit >= 0) {
        const enderecos = await Endereco.findAll(
          {
            offset: parseInt(offset),
            limit: parseInt(limit),
          }
        );
        // Verifica se há enderecos encontrados
        if (enderecos) {
          return enderecos;
        } else {
          throw new NotFound('Nenhum endereco encontrado.');
        }

      } else {
        throw new BadRequest('Parâmetros inválidos.');
      }
    } catch (error) {
      if (error instanceof NotFound) {
        throw error;
      } else if (error instanceof BadRequest) {
        throw error;
      } else {
        throw new InternalServerError('Não foi possível listar os enderecos.');
      }
    }
  }
  // Função para obter um endereço pelo ID
  const getEnderecoById = async (id) => {
    try {
      if (id !== null || id !== undefined) {
        const endereco = await Endereco.findByPk(id);
        // Verifica se o endereco foi encontrado
        if (endereco) {
          return endereco;
        } else {
          throw new NotFound('Endereço não encontrado.');
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
        throw new InternalServerError('Não foi possível buscar o endereço.');
      }
    }
  }
  // Função para criar um novo endereço
  const createEndereco = async (enderecoData) => {
    try {
      const idExiste = await Endereco.findByPk(enderecoData.id);
      if (idExiste) {
        throw new Conflict();
      } else {
        const endereco = await Endereco.create(enderecoData);
        if (endereco) {
          return endereco;
        } else {
          throw new Error();
        }
      }
    } catch (error) {
      if (error instanceof Conflict) {
        throw new Conflict('Endereco já é cadastrado no sistema.')
      } else {
        throw new InternalServerError('Não foi possível criar o endereco.')

      }
    }
  }

  // Função para atualizar um endereço
  const updateEndereco = async (id, enderecoData) => {
    try {
      const idExiste = await Endereco.findByPk(id);

      if (idExiste) {
        const endereco = await Endereco.update(enderecoData, { where: { id } })
        return enderecoData;
      } else {
        throw new NotFound('Endereco não encontrado.');
      }
    } catch (error) {
      if (error instanceof NotFound) {
        throw error;
      } else {
        throw new InternalServerError('Não foi possível atualizar o endereco.');
      }
    }
  }
  // Função para excluir um endereço
  const deleteEndereco = async (id) => {
    try {
      const idExiste = await Endereco.findByPk(id);
      if (idExiste) {
        const enderecoApagado = await Endereco.destroy({ where: { id } });
        if (enderecoApagado) {
          return enderecoApagado;
        } else {
          throw new Error();
        }
      } else {
        throw new NotFound('Endereco não encontrado.');
      }
    } catch (error) {
      if (error instanceof NotFound) {
        throw error;
      } else {
        throw new InternalServerError('Não foi possível atualizar o endereco.');
      }
    }
  }

  return {
    getAllEnderecos,
    getEnderecoById,
    createEndereco,
    updateEndereco,
    deleteEndereco,
  }
}
module.exports = createEnderecoService;


