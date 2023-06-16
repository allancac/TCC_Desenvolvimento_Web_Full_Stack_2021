const createVeiculoService = require('../../services/veiculosService')
const {
  BadRequest,           //400
  Conflict,             //409
  NotFound,             //404
  InternalServerError,  //500
} = require('../../services/serviceErrors');

describe('Testes da camada de Serviço de veiculos', () => {
  let mockVeiculoModel;
  let veiculoService;
  beforeEach(() => {
    // Criação um mock para o Model de veiculos
    mockVeiculoModel = {
      findAll: jest.fn(),
      findByPk: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      destroy: jest.fn(),
    };

    // Criação uma nova instância do serviço de veiculos com o mock do Model
    veiculoService = createVeiculoService(mockVeiculoModel);
  });

  describe('Testes para o método getAllVeiculos()', () => {

    test('Deve retornar todos os veículo', async () => {
      const mockVeiculos = [
        {
          placa: "ABC1234",
          id_cliente: 1,
          marca: "Scania",
          modelo: "R440",
          altura_cacamba: "0.80",
          largura_cacamba: "2.60",
          comprimento_cacamba: "7.80",
          data_registro: "2023-02-10T00:00:00.000Z"
        },
        {
          placa: "BCD6780",
          id_cliente: 15,
          marca: "Mercedes-Benz",
          modelo: "Actros 2653",
          altura_cacamba: "2.80",
          largura_cacamba: "2.70",
          comprimento_cacamba: "8.20",
          data_registro: "2023-05-10T00:00:00.000Z"
        }
      ];

      // Defina o comportamento esperado do mock do Model de veiculos
      mockVeiculoModel.findAll.mockResolvedValue(mockVeiculos);

      // Executa a chamada de serviço
      const veiculos = await veiculoService.getAllVeiculos();

      // Verifica se o resultado está correto
      expect(veiculos).toEqual(mockVeiculos);
    });
    test('Deve retornar um erro BadRequest caso receba um valor inválido para o parâmetro offset', async () => {
      const mockVeiculos = [];
      // Defina o comportamento esperado do mock do Model de veiculos
      mockVeiculoModel.findAll.mockResolvedValue(mockVeiculos);
      const offset = -10;
      await expect(veiculoService.getAllVeiculos(offset)).rejects.toThrowError(BadRequest);

    });
    test('Deve retornar um erro BadRequest caso receba um valor inválido para o parâmetro limit', async () => {
      const mockVeiculos = [];
      // Defina o comportamento esperado do mock do Model de veiculos
      mockVeiculoModel.findAll.mockResolvedValue(mockVeiculos);
      const limit = -10;
      await expect(veiculoService.getAllVeiculos(0, limit)).rejects.toThrowError(BadRequest);
    });
    test('Deve lançar um erro genérico "404" no try, caso não encontre veiculos no Banco de Dados', async () => {
      const mockVeiculos = null;
      // Defina o comportamento esperado do mock do Model de veiculos
      mockVeiculoModel.findAll.mockResolvedValue(mockVeiculos);
      await expect(veiculoService.getAllVeiculos()).rejects.toThrowError(NotFound);
    });
    test('Deve lançar um erro "InternalServerError" no caso de um erro desconhecido', async () => {
      const mockVeiculos = [];
      // Defina o comportamento esperado do mock do Model de veiculos
      mockVeiculoModel.findAll.mockRejectedValue(mockVeiculos);
      await expect(veiculoService.getAllVeiculos()).rejects.toThrowError(InternalServerError);
    });
  });

  describe('Testes para o método getVeiculoByPlaca()', () => {
    test('Deve retornar um veiculo pela placa', async () => {
      const mockVeiculo = {
        placa: "ABC1234",
        id_cliente: 1,
        marca: "Scania",
        modelo: "R440",
        altura_cacamba: "0.80",
        largura_cacamba: "2.60",
        comprimento_cacamba: "7.80",
        data_registro: "2023-02-10T00:00:00.000Z"
      };
      const placa = 'ABC1234';

      // Defina o comportamento esperado do mock do Model de veiculos
      mockVeiculoModel.findByPk.mockResolvedValue(mockVeiculo);

      // Executa a chamada de serviço
      const veiculo = await veiculoService.getVeiculoByPlaca(placa);

      // Verifica se o resultado está correto
      expect(veiculo).toEqual(mockVeiculo);
    });
    test('Deve lançar um erro genérico "404" no try, caso não encontre veiculos no Banco de Dados', async () => {
      const mockVeiculo = null;
      const placa = 'ABC1234';
      // Defina o comportamento esperado do mock do Model de veiculos
      mockVeiculoModel.findByPk.mockResolvedValue(mockVeiculo);
      await expect(veiculoService.getVeiculoByPlaca(placa)).rejects.toThrowError(NotFound);

    });
    test('Deve lançar um erro "InternalServerError" no caso de um erro desconhecido', async () => {
      const mockVeiculo = {};
      const placa = 'ABC1234';
      // Defina o comportamento esperado do mock do Model de veiculos
      mockVeiculoModel.findByPk.mockRejectedValue(mockVeiculo);
      await expect(veiculoService.getVeiculoByPlaca(placa)).rejects.toThrowError(InternalServerError);
    });
  });

  describe('Testes para o método createVeiculo()', () => {
    test('Deve criar um novo veiculo.', async () => {
      const veiculoData = {
        placa: "ABC1234",
        id_cliente: 1,
        marca: "Scania",
        modelo: "R440",
        altura_cacamba: "0.80",
        largura_cacamba: "2.60",
        comprimento_cacamba: "7.80",
      };
      const mockVeiculoCriado = {
        placa: "ABC1234",
        id_cliente: 1,
        marca: "Scania",
        modelo: "R440",
        altura_cacamba: "0.80",
        largura_cacamba: "2.60",
        comprimento_cacamba: "7.80",
        data_registro: "2023-02-10T00:00:00.000Z"
      };

      // Defina o comportamento esperado do mock do Model de veiculos
      mockVeiculoModel.findByPk.mockResolvedValue(null); // Simula placaExiste = false
      mockVeiculoModel.create.mockResolvedValue(mockVeiculoCriado);

      // Executa a chamada de serviço
      const veiculo = await veiculoService.createVeiculo(veiculoData);

      // Verifica se o resultado está correto
      expect(veiculo).toEqual(mockVeiculoCriado);
    });
    test('Deve lançar um erro "Conflict" caso o veiculo já exista', async () => {
      const veiculoData = {
        placa: "ABC1234",
        id_cliente: 1,
        marca: "Scania",
        modelo: "R440",
        altura_cacamba: "0.80",
        largura_cacamba: "2.60",
        comprimento_cacamba: "7.80",
      };

      // Defina o comportamento esperado do mock do Model de veiculos
      mockVeiculoModel.findByPk.mockResolvedValue(true);  // Simula placaExiste = true

      // Chama a função createVeiculo e verifica se lança uma exceção Conflict
      expect(() => veiculoService.createVeiculo(veiculoData)).rejects.toThrowError(Conflict);

      // Verifica se a função do mock foi chamada corretamente
      expect(mockVeiculoModel.findByPk).toHaveBeenCalledTimes(1);
      expect(mockVeiculoModel.findByPk).toHaveBeenCalledWith(veiculoData.placa);
    });
    test('Deve lançar um erro "InternalServerError" no caso de um erro desconhecido', async () => {
      const veiculoData = {
        placa: "ABC1234",
        id_cliente: 1,
        marca: "Scania",
        modelo: "R440",
        altura_cacamba: "0.80",
        largura_cacamba: "2.60",
        comprimento_cacamba: "7.80",
      };
      const mockVeiculo = null;
      // Defina o comportamento esperado do mock do Model de veiculos
      mockVeiculoModel.findByPk.mockRejectedValue(mockVeiculo);

      // Chama a função createVeiculo e verifica se lança uma exceção InternalServerError
      await expect(veiculoService.createVeiculo(veiculoData)).rejects.toThrowError(InternalServerError);

      // Verifica se a função do mock foi chamada corretamente
      expect(mockVeiculoModel.findByPk).toHaveBeenCalledTimes(1);
      expect(mockVeiculoModel.findByPk).toHaveBeenCalledWith(veiculoData.placa);
    });
  });

  describe('Testes para o método updateVeiculo', () => {
    test('Deve atualizar um veiculo existente', async () => {
      const placa = 'ABC1234';
      const veiculoData = {
        id_cliente: 1,
        marca: "Scania",
        modelo: "R440",
        altura_cacamba: "0.80",
        largura_cacamba: "2.60",
        comprimento_cacamba: "7.80",
      };

      const mockVeiculoAtualizado = {
        placa: "ABC1234",
        id_cliente: 1,
        marca: "Scania",
        modelo: "R440",
        altura_cacamba: "0.80",
        largura_cacamba: "2.60",
        comprimento_cacamba: "7.80",
        data_registro: "2023-02-10T00:00:00.000Z"
      };

      // Defina o comportamento esperado do mock do Model de veiculos
      mockVeiculoModel.findByPk.mockResolvedValue(true);  // Simula placaExiste = true
      mockVeiculoModel.update.mockResolvedValue(mockVeiculoAtualizado); // Simula que a atualização foi bem-sucedida

      // // Executa a chamada de serviço
      const resultado = await veiculoService.updateVeiculo(placa, veiculoData)
      expect(resultado).toEqual(veiculoData);


    });
    test('Deve lançar um erro "NotFound" caso o veiculo não seja encontrado', async () => {
      const placa = 'ABC1234';
      const mockVeiculo = null;

      // Defina o comportamento esperado do mock do Model de veiculos
      mockVeiculoModel.findByPk.mockResolvedValue(mockVeiculo);

      // Chama a função deleteVeiculo e verifica se lança uma exceção NotFound
      await expect(veiculoService.updateVeiculo(placa)).rejects.toThrowError(NotFound);

      // Verifica se a função do mock foi chamada corretamente
      expect(mockVeiculoModel.findByPk).toHaveBeenCalledTimes(1);
      expect(mockVeiculoModel.findByPk).toHaveBeenCalledWith(placa);
    });
    test('Deve lançar um erro "InternalServerError" no caso de um erro desconhecido', async () => {
      const placa = 'ABC1234';
      const mockVeiculo = {};

      // Defina o comportamento esperado do mock do Model de veiculos
      mockVeiculoModel.findByPk.mockRejectedValue(mockVeiculo);

      // Chama a função deleteVeiculo e verifica se lança uma exceção InternalServerError
      await expect(veiculoService.updateVeiculo(placa)).rejects.toThrowError(InternalServerError);

      // Verifica se a função do mock foi chamada corretamente
      expect(mockVeiculoModel.findByPk).toHaveBeenCalledTimes(1);
      expect(mockVeiculoModel.findByPk).toHaveBeenCalledWith(placa);

    });
  });

  // Teste para deleteVeiculo
  describe('Testes para o método deleteVeiculo', () => {
    test('Deve excluir um veiculo existente', async () => {
      const placa = 'ABC1234';
      // Definição do comportamento esperado do mock do Model de veiculos
      const mockVeiculo = {
        placa: "ABC1234",
        placa: "DEF5678",
        nome: "Lucas Ferreira",
        telefone: "11999888777",
        email: "lucas.ferreira@email.com",
        data_registro: "2023-06-11T00:29:31.000Z"
      }
      mockVeiculoModel.findByPk.mockResolvedValueOnce(mockVeiculo);
      mockVeiculoModel.destroy.mockResolvedValue(1); // Simula que a exclusão foi bem-sucedida

      // Executa a chamada de serviço
      const resultado = await veiculoService.deleteVeiculo(placa);
      expect(resultado).toEqual(1);
    });
    test('Deve lançar um erro "NotFound', async () => {
      const placa = 'ABC1234';
      const mockVeiculo = null;

      // Defina o comportamento esperado do mock do Model de veiculos
      mockVeiculoModel.findByPk.mockResolvedValue(mockVeiculo);

      // Chama a função deleteVeiculo e verifica se lança uma exceção NotFound
      await expect(veiculoService.deleteVeiculo(placa)).rejects.toThrowError(NotFound);

      // Verifica se a função do mock foi chamada corretamente
      expect(mockVeiculoModel.findByPk).toHaveBeenCalledTimes(1);
      expect(mockVeiculoModel.findByPk).toHaveBeenCalledWith(placa);
    });
    test('Deve lançar um erro "InternalServerError" no caso de um erro desconhecido', async () => {
      const placa = 'ABC1234';
      const mockVeiculo = {};

      // Defina o comportamento esperado do mock do Model de veiculos
      mockVeiculoModel.findByPk.mockRejectedValue(mockVeiculo);

      // Chama a função deleteVeiculo e verifica se lança uma exceção InternalServerError
      await expect(veiculoService.deleteVeiculo(placa)).rejects.toThrowError(InternalServerError);

      // Verifica se a função do mock foi chamada corretamente
      expect(mockVeiculoModel.findByPk).toHaveBeenCalledTimes(1);
      expect(mockVeiculoModel.findByPk).toHaveBeenCalledWith(placa);

    });
  });


});