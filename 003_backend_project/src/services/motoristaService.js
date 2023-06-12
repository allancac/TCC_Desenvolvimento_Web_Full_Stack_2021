const {
  BadRequest,           //400
  Unauthorized,         //401
  Forbidden,            //403
  Conflict,             //409
  NotFound,             //404
  InternalServerError,  //500
} = require('./serviceErrors');

const createMotoristaService = (Motorista) => {
  // Função para obter todos os motoristas
  const getAllMotoristas = async (offset = 0, limit = 10) => {
    try {
      const motoristas = await Motorista.findAll(
        {
          offset: parseInt(offset),
          limit: parseInt(limit),
        }
      );
      // Verifica se há motoristas encontrados
      if (motoristas) {
        return motoristas;
      }
      // Lança um erro genérico que será tratado
      throw new error('404');
    } catch (error) {
      if (error.message === '404') {
        throw new NotFound('Nenhum Motorista foi encontrado.');
      } else {
        throw new InternalServerError('Não foi possível listar os motoristas.');
      }
    }
  }

  // Obtém um motorista pelo CPF
  const getMotoristaByCPF = async (cpf) => {
    try {
      const motorista = await Motorista.findByPk(cpf);
      // Verifica se o motorista foi encontrado
      if (motorista) {
        return motorista;
      } else {
        throw new Error('404');
      }
    } catch (error) {
      if (error.message === '404') {
        throw new NotFound('Motorista não encontrado.');
      } else {
        throw new InternalServerError('Não foi possível buscar o motorista.');
      }
    }
  }
  // Cria um novo motorista
  const createMotorista = async (motoristaData) => {
    try {
      const cpfExiste = await Motorista.findByPk(motoristaData.cpf);
      // Verifica se o CPF do motorista ja foi cadastrado
      if (cpfExiste) {
        throw new Error('409');
      } else {
        const motorista = await Motorista.create(motoristaData);
        // Verifica se o motorista foi criado com sucesso
        if (motorista) {
          return motorista;
        } else {
          throw new Error('500');
        }
      }
    } catch (error) {

      if (error.message === '409') {
        throw new Conflict('Motorista já é cadastrado no sistema.');
      } else {
        throw new InternalServerError('Não foi possível criar o motorista.');
      }
    }
  }

  // Atualiza um motorista existente pelo CPF
  const updateMotorista = async (cpf, motoristaData) => {
    try {
      const motorista = await Motorista.findByPk(cpf);
      // Verifica se o motorista foi encontrado
      if (motorista) {
        await Motorista.update(motoristaData);
        return motorista;
      } else {
        throw new Error('404');
      }
    } catch (error) {
      if (error.message === '404') {
        throw new NotFound('Motorista não encontrado.');
      } else {
        throw new InternalServerError('Não foi possível atualizar o motorista.');
      }
    }
  }

  // Deleta um motorista pelo CPF
  const deleteMotorista = async (cpf) => {
    try {
      const motorista = await Motorista.findByPk(cpf);
      // Verifica se o motorista foi encontrado
      if (motorista) {
        await Motorista.destroy();
        return motorista;
      } else {
        throw new Error('404');
      }
    } catch (error) {
      if (error.message === '404') {
        throw new NotFound('Motorista não encontrado.');
      } else {
        throw new InternalServerError('Não foi possível excluir o motorista.');
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
