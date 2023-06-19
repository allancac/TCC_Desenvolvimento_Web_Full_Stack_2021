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
      if (offset >= 0 && limit >= 0) {
        const clientes = await Cliente.findAll(
          {
            offset: parseInt(offset),
            limit: parseInt(limit),
          }
        );
        // Verifica se há clientes encontrados
        if (clientes) {
          return clientes;
        } else {
          throw new NotFound('Nenhum cliente encontrado.');
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
        throw new InternalServerError('Não foi possível listar os clientes.');
      }
    }
  }

  // Função para obter um cliente pelo ID
  const getClienteById = async (id) => {
    try {
      if (id !== null || id !== undefined) {
        const cliente = await Cliente.findByPk(id);
        // Verifica se o cliente foi encontrado
        if (cliente) {
          return cliente;
        } else {
          throw new NotFound('Cliente não encontrado.');
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
        throw new InternalServerError('Não foi possível buscar o cliente.');
      }
    }
  }
  // Função para criar um novo cliente
  const createCliente = async (clienteData) => {
    try {
      const idExiste = await Cliente.findByPk(clienteData.id);
      if (idExiste) {
        throw new Conflict('Cliente já é cadastrado no sistema.')
      } else {
        const cliente = await Cliente.create(clienteData);
        if (cliente) {
          return cliente;
        } else {
          throw new Error();
        }
      }
    } catch (error) {
      if (error instanceof Conflict) {
        throw error;
      } else {
        throw new InternalServerError('Não foi possível criar o cliente.')

      }
    }
  }

  // Função para atualizar um cliente
  const updateCliente = async (id, clienteData) => {
    try {
      const idExiste = await Cliente.findByPk(id);
      if (idExiste) {
        const cliente = await Cliente.update(clienteData, { where: { id } })
        return clienteData;
      } else {
        throw new NotFound('Cliente não encontrado.');
      }
    } catch (error) {
      if (error instanceof NotFound) {
        throw error;
      } else {
        throw new InternalServerError('Não foi possível atualizar o cliente.');
      }
    }
  }

  // Função para excluir um cliente
  const deleteCliente = async (id) => {
    try {
      const idExiste = await Cliente.findByPk(id);
      if (idExiste) {
        const clienteApagado = await Cliente.destroy({ where: { id } });
        if (clienteApagado) {
          return clienteApagado;
        } else {
          throw new Error();
        }
      } else {
        throw new NotFound('Cliente não encontrado.');
      }
    } catch (error) {
      if (error instanceof NotFound) {
        throw error;
      } else {
        throw new InternalServerError('Não foi possível atualizar o cliente.');
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