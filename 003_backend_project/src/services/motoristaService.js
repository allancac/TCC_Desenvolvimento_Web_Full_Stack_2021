const {
  BadRequest,           //400
  // Unauthorized,         //401
  // Forbidden,            //403
  Conflict,             //409
  NotFound,             //404
  InternalServerError,  //500
} = require('./serviceErrors');

const createMotoristaService = (Motorista) => {
  // Função para obter todos os motoristas
  const getAllMotoristas = async (offset = 0, limit = 10) => {
    try {
      if (offset >= 0 && limit >= 0) {
        const { count, rows } = await Motorista.findAndCountAll(
          {
            offset: parseInt(offset),
            limit: parseInt(limit),
          }
        );
        // Verifica se há motoristas encontrados
        if (rows) {
          return { count, rows };
        } else {
          throw new NotFound('Nenhum motorista encontrado.');
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
        throw new InternalServerError('Não foi possível listar os motoristas.');
      }
    }
  }

  // Obtém um motorista pelo CPF
  const getMotoristaByCPF = async (cpf) => {
    try {
      if (cpf !== null || cpf !== undefined) {
        const motorista = await Motorista.findByPk(cpf, { include: ['veiculos'] });
        // Verifica se o motorista foi encontrado
        if (motorista) {
          return motorista;
        } else {
          throw new NotFound('Motorista não encontrado.');
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
        throw new InternalServerError('Não foi possível buscar o motorista.');
      }
    }
  }
  // Cria um novo motorista
  const createMotorista = async (motoristaData) => {
    try {
      const cpfExiste = await Motorista.findByPk(motoristaData.cpf);
      if (cpfExiste) {
        throw new Conflict();
      } else {
        const motorista = await Motorista.create(motoristaData);
        if (motorista) {
          return motorista;
        } else {
          throw new Error();
        }
      }
    } catch (error) {
      if (error instanceof Conflict) {
        throw new Conflict('Motorista já é cadastrado no sistema.')
      } else {
        throw new InternalServerError('Não foi possível criar o motorista.')

      }
    }
  }

  const updateMotorista = async (cpf, motoristaData) => {
    try {
      const cpfExiste = await Motorista.findByPk(cpf);
      if (cpfExiste) {
        const motorista = await Motorista.update(motoristaData, { where: { cpf } })
        return motoristaData;
      } else {
        throw new NotFound('Motorista não encontrado.');
      }
    } catch (error) {
      if (error instanceof NotFound) {
        throw error;
      } else {
        throw new InternalServerError('Não foi possível atualizar o motorista.');
      }
    }
  }



  // Deleta um motorista pelo CPF
  const deleteMotorista = async (cpf) => {
    try {
      const cpfExiste = await Motorista.findByPk(cpf);
      if (cpfExiste) {
        const motoristaApagado = await Motorista.destroy({ where: { cpf } });
        if (motoristaApagado) {
          return motoristaApagado;
        } else {
          throw new Error();
        }
      } else {
        throw new NotFound('Motorista não encontrado.');
      }
    } catch (error) {
      if (error instanceof NotFound) {
        throw error;
      } else {
        throw new InternalServerError('Não foi possível atualizar o motorista.');
      }
    }
  }

  return {
    getAllMotoristas,
    getMotoristaByCPF,
    createMotorista,
    updateMotorista,
    deleteMotorista
  }

}

module.exports = createMotoristaService;
