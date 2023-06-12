const {
  BadRequest,           //400
  Unauthorized,         //401
  Forbidden,            //403
  Conflict,             //409
  NotFound,             //404
  InternalServerError,  //500
} = require('./serviceErrors');

const createVeiculoService = (Veiculo) => {
  // Função para obter todos os veículos
  const getAllVeiculos = async (offset = 0, limit = 10) => {
    try {
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
        // Lança um erro genérico que será tratado
        throw new error('404');
      }
    } catch (error) {
      if (error.message === '404') {
        throw new NotFound('Nenhum Veiculo foi encontrado.');
      } else {
        throw new InternalServerError('Não foi possível listar os veiculos.');
      }
    }
  }

  // Função para obter um veículo pela placa
  const getVeiculoByPlaca = async (placa) => {
    try {
      const veiculo = await Veiculo.findByPk(placa);
      // Verifica se o veiculo foi encontrado
      if (veiculo) {
        return veiculo;
      } else {
        throw new Error('404');
      }
    } catch (error) {
      if (error.message === '404') {
        throw new NotFound('Veiculo não encontrado.');
      } else {
        throw new InternalServerError('Não foi possível buscar o veiculo.');
      }
    }
  }
  // Função para criar um novo veiculo


  const createVeiculo = async (veiculoData) => {
    try {
      const placaExiste = await Motorista.findByPk(veiculoData.placa);
      // Verifica se o CPF do motorista ja foi cadastrado
      if (placaExiste) {
        throw new Error('409');
      } else {
        const veiculo = await Veiculo.create(veiculoData);
        // Verifica se o veiculo foi criado com sucesso
        if (veiculo) {
          return veiculo;
        } else {
          throw new Error('500');
        }
      }
    } catch (error) {

      if (error.message === '409') {
        throw new Conflict('Veiculo já é cadastrado no sistema.');
      } else {
        throw new InternalServerError('Não foi possível criar o veiculo.');
      }
    }
  }
  // Função para atualizar um veículo
  const updateVeiculo = async (placa, veiculoData) => {
    try {
      const veiculo = await veiculo.findByPk(placa);
      // Verifica se o veiculo foi encontrado
      if (veiculo) {
        await Veiculo.update(veiculoData);
        return veiculo;
      } else {
        throw new Error('404');
      }
    } catch (error) {
      if (error.message === '404') {
        throw new NotFound('Veiculo não encontrado.');
      } else {
        throw new InternalServerError('Não foi possível atualizar o veiculo.');
      }
    }
  }

  // Função para excluir um veículo
  const deleteVeiculo = async (cpf) => {
    try {
      const veiculo = await Veiculo.findByPk(cpf);
      // Verifica se o veiculo foi encontrado
      if (veiculo) {
        await Veiculo.destroy();
        return veiculo;
      } else {
        throw new Error('404');
      }
    } catch (error) {
      if (error.message === '404') {
        throw new NotFound('veiculo não encontrado.');
      } else {
        throw new InternalServerError('Não foi possível excluir o veiculo.');
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
