const {
  BadRequest,           //400
  // Unauthorized,         //401
  // Forbidden,            //403
  Conflict,             //409
  NotFound,             //404
  InternalServerError,  //500
} = require('./serviceErrors');

const createVeiculoService = (Veiculo) => {
  // Função para obter todos os veículos

  const getAllVeiculos = async (offset = 0, limit = 10) => {
    try {
      if (offset >= 0 && limit >= 0) {
        const veiculos = await Veiculo.findAll(
          {
            offset: parseInt(offset),
            limit: parseInt(limit),
          }
        );
        // Verifica se há veiculos encontrados
        if (veiculos) {
          return veiculos;
        } else {
          throw new NotFound('Nenhum veiculo encontrado.');
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
        throw new InternalServerError('Não foi possível listar os veiculos.');
      }
    }
  }

  // Função para obter um veículo pela placa
  const getVeiculoByPlaca = async (placa) => {
    try {
      if (placa !== null || placa !== undefined) {
        const veiculo = await Veiculo.findByPk(placa);
        // Verifica se o veiculo foi encontrado
        if (veiculo) {
          return veiculo;
        } else {
          throw new NotFound('Veiculo não encontrado.');
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
        throw new InternalServerError('Não foi possível buscar o veiculo.');
      }
    }
  }
  // Função para criar um novo veiculo
  const createVeiculo = async (veiculoData) => {
    try {
      const placaExiste = await Veiculo.findByPk(veiculoData.placa);
      if (placaExiste) {
        throw new Conflict();
      } else {
        const veiculo = await Veiculo.create(veiculoData);
        if (veiculo) {
          return veiculo;
        } else {
          throw new Error();
        }
      }
    } catch (error) {
      if (error instanceof Conflict) {
        throw new Conflict('Veiculo já é cadastrado no sistema.')
      } else {
        throw new InternalServerError('Não foi possível criar o veiculo.')

      }
    }
  }
  // Função para atualizar um veículo
  const updateVeiculo = async (placa, veiculoData) => {
    try {
      const placaExiste = await Veiculo.findByPk(placa);
      if (placaExiste) {
        const veiculo = await Veiculo.update(veiculoData, { where: { placa } })
        return veiculoData;
      } else {
        throw new NotFound('Veiculo não encontrado.');
      }
    } catch (error) {
      if (error instanceof NotFound) {
        throw error;
      } else {
        throw new InternalServerError('Não foi possível atualizar o veiculo.');
      }
    }
  }

  // Função para excluir um veículo
  const deleteVeiculo = async (placa) => {
    try {
      const placaExiste = await Veiculo.findByPk(placa);
      if (placaExiste) {
        const veiculoApagado = await Veiculo.destroy({ where: { placa } });
        if (veiculoApagado) {
          return veiculoApagado;
        } else {
          throw new Error();
        }
      } else {
        throw new NotFound('Veiculo não encontrado.');
      }
    } catch (error) {
      if (error instanceof NotFound) {
        throw error;
      } else {
        throw new InternalServerError('Não foi possível atualizar o veiculo.');
      }
    }
  }

  return {
    getAllVeiculos,
    getVeiculoByPlaca,
    createVeiculo,
    updateVeiculo,
    deleteVeiculo
  }
}

module.exports = createVeiculoService;
