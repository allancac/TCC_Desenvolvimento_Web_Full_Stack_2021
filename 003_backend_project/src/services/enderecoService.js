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
      const enderecos = await Endereco.findAll(
        {
          offset: parseInt(offset),
          limit: parseInt(limit),
        }
      );
      // Verifica se há enderecos encontrados
      if (enderecos) {
        return enderecos;
      }
      // Lança um erro genérico que será tratado
      throw new error('404');
    } catch (error) {
      if (error.message === '404') {
        throw new NotFound('Nenhum Endereco foi encontrado.');
      } else {
        throw new InternalServerError('Não foi possível listar os enderecos.');
      }
    }
  }
  // Função para obter um endereço pelo ID
  const getEnderecoById = async (id) => {
    try {
      const endereco = await Endereco.findByPk(id);
      // Verifica se o endereco foi encontrado
      if (endereco) {
        return endereco;
      } else {
        throw new Error('404');
      }
    } catch (error) {
      if (error.message === '404') {
        throw new NotFound('Endereco não encontrado.');
      } else {
        throw new InternalServerError('Não foi possível buscar o endereco.');
      }
    }
  }
  // Função para criar um novo endereço
  const createEndereco = async (enderecoData) => {
    try {
      const { logradouro } = enderecoData;
      const enderecoExiste = await Endereco.findOne({ where: { logradouro } });
      // Verifica se o CNPJ do cliente ja foi cadastrado
      if (enderecoExiste) {
        throw new Error('409');
      } else {
        const endereco = await Endereco.create(enderecoData);
        // Verifica se o endereco foi criado com sucesso
        if (endereco) {
          return endereco;
        } else {
          throw new Error('500');
        }
      }
    } catch (error) {
      if (error.message === '409') {
        throw new Conflict('Endereco já é cadastrado no sistema.');
      } else {
        throw new InternalServerError('Não foi possível criar o endereco.');
      }
    }
  }

  // Função para atualizar um endereço
  const updateEndereco = async (cpf, enderecoData) => {
    try {
      const endereco = await Endereco.findByPk(cpf);
      // Verifica se o endereco foi encontrado
      if (endereco) {
        await Endereco.update(enderecoData);
        return endereco;
      } else {
        throw new Error('404');
      }
    } catch (error) {
      if (error.message === '404') {
        throw new NotFound('Endereco não encontrado.');
      } else {
        throw new InternalServerError('Não foi possível atualizar o endereco.');
      }
    }
  }
  // Função para excluir um endereço
  const deleteEndereco = async (cpf) => {
    try {
      const endereco = await Endereco.findByPk(cpf);
      // Verifica se o endereco foi encontrado
      if (endereco) {
        await Endereco.destroy();
        return endereco;
      } else {
        throw new Error('404');
      }
    } catch (error) {
      if (error.message === '404') {
        throw new NotFound('Endereco não encontrado.');
      } else {
        throw new InternalServerError('Não foi possível excluir o endereco.');
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


