const {
  BadRequest,           //400
  Unauthorized,         //401
  Forbidden,            //403
  Conflict,             //409
  NotFound,             //404
  InternalServerError,  //500
} = require('./serviceErrors');

const createClienteService = (Cliente) => {
  // Função para obter todos os clientes
  const getAllClientes = async (offset = 0, limit = 10) => {
    try {
      const clientes = await Cliente.findAll(
        {
          offset: parseInt(offset),
          limit: parseInt(limit),
        }
      );
      // Verifica se há clientes encontrados
      if (clientes) {
        return clientes
      }
      // Lança um erro genérico que será tratado
      throw new error('404');
    } catch (error) {
      if (error.message === '404') {
        throw new NotFound('Nenhum cliente foi encontrado.');
      } else {
        throw new InternalServerError('Não foi possível listar os clientes.');
      }
    }
  }

  // Função para obter um cliente pelo ID
  const getClienteById = async (id) => {
    try {
      const cliente = await Cliente.findByPk(id);
      // Verifica se o cliente foi encontrado
      if (cliente) {
        return cliente;
      } else {
        throw new Error('404');
      }
    } catch (error) {
      if (error.message === '404') {
        throw new NotFound('Cliente não encontrado.');
      } else {
        throw new InternalServerError('Não foi possível buscar o cliente.');
      }
    }
  }
  // Função para criar um novo cliente
  const createCliente = async (clienteData) => {
    try {
      const cnpjExiste = await Cliente.findByPk(clienteData.cnpj);
      // Verifica se o CNPJ do cliente ja foi cadastrado
      if (cnpjExiste) {
        throw new Error('409');
      } else {
        const cliente = await Cliente.create(clienteData);
        // Verifica se o cliente foi criado com sucesso
        if (cliente) {
          return cliente;
        } else {
          throw new Error('500');
        }
      }
    } catch (error) {
      if (error.message === '409') {
        throw new Conflict('Cliente já é cadastrado no sistema.');
      } else {
        throw new InternalServerError('Não foi possível criar o cliente.');
      }
    }
  }

  // Função para atualizar um cliente
  const updateCliente = async (id, clienteData) => {
    try {
      const cliente = await Cliente.findByPk(id);
      // Verifica se o cliente foi encontrado
      if (cliente) {
        await Cliente.update(clienteData);
        return cliente;
      } else {
        throw new Error('404');
      }
    } catch (error) {
      if (error.message === '404') {
        throw new NotFound('Cliente não encontrado.');
      } else {
        throw new InternalServerError('Não foi possível atualizar o cliente.');
      }
    }
  }

  // Função para excluir um cliente
  const deleteCliente = async (cpf) => {
    try {
      const cliente = await Cliente.findByPk(cpf);
      // Verifica se o cliente foi encontrado
      if (cliente) {
        await Cliente.destroy();
        return cliente;
      } else {
        throw new Error('404');
      }
    } catch (error) {
      if (error.message === '404') {
        throw new NotFound('Cliente não encontrado.');
      } else {
        throw new InternalServerError('Não foi possível excluir o cliente.');
      }
    }
  }


  return {
    getAllClientes,
    getClienteById,
    createCliente,
    updateCliente,
    deleteCliente,

  }
}

module.exports = createClienteService;