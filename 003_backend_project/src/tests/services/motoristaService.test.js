const createMotoristaService = require('../../services/motoristaService');
const {
  BadRequest,           //400
  Conflict,             //409
  NotFound,             //404
  InternalServerError,  //500
} = require('../../services/serviceErrors');

describe('Testes da camada de Serviço de motoristas', () => {
  let mockMotoristaModel;
  let motoristaService;
  beforeEach(() => {
    // Criação um mock para o Model de motoristas
    mockMotoristaModel = {
      findAll: jest.fn(),
      findByPk: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      destroy: jest.fn(),
    };

    // Criação uma nova instância do serviço de motoristas com o mock do Model
    motoristaService = createMotoristaService(mockMotoristaModel);
  });

  // Testes para getAllMotoristas
  describe('Testes para o método getAllMotoristas()', () => {
    test('Deve retornar todos os motoristas', async () => {

      const mockMotoristas = [
        {
          cpf: "09988877701",
          placa: "DEF5678",
          nome: "Lucas Ferreira",
          telefone: "11999888777",
          email: "lucas.ferreira@email.com",
          data_registro: "2023-06-11T00:29:31.000Z"
        },
        {
          cpf: "11122233345",
          placa: "VWX9102",
          nome: "Thiago Souza",
          telefone: "(92) 5555-5555",
          email: "thiago.souza@email.com",
          data_registro: "2023-06-11T00:29:33.000Z"
        },
      ];

      // Defina o comportamento esperado do mock do Model de motoristas
      mockMotoristaModel.findAll.mockResolvedValue(mockMotoristas);

      // Executa a chamada de serviço
      const motoristas = await motoristaService.getAllMotoristas();

      // Verifica se o resultado está correto
      expect(motoristas).toEqual(mockMotoristas);
    }
    );
    test('Deve retornar um erro BadRequest caso receba um valor inválido para o parâmetro offset', async () => {
      const mockMotoristas = [];
      // Defina o comportamento esperado do mock do Model de motoristas
      mockMotoristaModel.findAll.mockResolvedValue(mockMotoristas);
      const offset = -10;
      await expect(motoristaService.getAllMotoristas(offset)).rejects.toThrowError(BadRequest);

    });
    test('Deve retornar um erro BadRequest caso receba um valor inválido para o parâmetro limit', async () => {
      const mockMotoristas = [];
      // Defina o comportamento esperado do mock do Model de motoristas
      mockMotoristaModel.findAll.mockResolvedValue(mockMotoristas);
      const limit = -10;
      await expect(motoristaService.getAllMotoristas(0, limit)).rejects.toThrowError(BadRequest);
    });
    test('Deve lançar um erro genérico "404" no try, caso não encontre motoristas no Banco de Dados', async () => {
      const mockMotoristas = null;
      // Defina o comportamento esperado do mock do Model de motoristas
      mockMotoristaModel.findAll.mockResolvedValue(mockMotoristas);
      await expect(motoristaService.getAllMotoristas()).rejects.toThrowError(NotFound);

    });
    test('Deve lançar um erro "InternalServerError" no caso de um erro desconhecido', async () => {
      const mockMotoristas = [];
      // Defina o comportamento esperado do mock do Model de motoristas
      mockMotoristaModel.findAll.mockRejectedValue(mockMotoristas);
      await expect(motoristaService.getAllMotoristas()).rejects.toThrowError(InternalServerError);
    });
  });

  // Teste para getMotoristaByCPF
  describe('Testes para o método getMotoristaByCPF()', () => {
    test('Deve retornar um motorista pelo CPF', async () => {
      const mockMotorista = {
        cpf: "09988877701",
        placa: "DEF5678",
        nome: "Lucas Ferreira",
        telefone: "11999888777",
        email: "lucas.ferreira@email.com",
        data_registro: "2023-06-11T00:29:31.000Z"
      };
      const cpf = '09988877701';

      // Defina o comportamento esperado do mock do Model de motoristas
      mockMotoristaModel.findByPk.mockResolvedValue(mockMotorista);

      // Executa a chamada de serviço
      const motorista = await motoristaService.getMotoristaByCPF(cpf);

      // Verifica se o resultado está correto
      expect(motorista).toEqual(mockMotorista);
    });
    test('Deve lançar um erro genérico "404" no try, caso não encontre motoristas no Banco de Dados', async () => {
      const mockMotorista = null;
      const cpf = '09988877701';
      // Defina o comportamento esperado do mock do Model de motoristas
      mockMotoristaModel.findByPk.mockResolvedValue(mockMotorista);
      await expect(motoristaService.getMotoristaByCPF(cpf)).rejects.toThrowError(NotFound);

    });
    test('Deve lançar um erro "InternalServerError" no caso de um erro desconhecido', async () => {
      const mockMotorista = {};
      const cpf = '09988877701';
      // Defina o comportamento esperado do mock do Model de motoristas
      mockMotoristaModel.findByPk.mockRejectedValue(mockMotorista);
      await expect(motoristaService.getMotoristaByCPF(cpf)).rejects.toThrowError(InternalServerError);
    });
  });

  // Teste para createMotorista
  describe('Testes para o método createMotorista', () => {
    test('Deve criar um novo motorista', async () => {
      const motoristaData = {
        cpf: "0944781339",
        placa: "DEF5678",
        nome: "Allan Cezar Almeida Chaves",
        telefone: "11999087167",
        email: "allancac@hotmail.com"
      };
      const mockMotoristaCriado = {
        cpf: "09447813739",
        placa: "DEF5678",
        nome: "Allan Cezar Almeida Chaves",
        telefone: "11999087167",
        email: "allancac@hotmail.com",
        data_registro: "2023-06-15T20:20:00.000Z"
      };

      // Defina o comportamento esperado do mock do Model de motoristas
      mockMotoristaModel.findByPk.mockResolvedValue(null); // Simula cpfExiste = false
      mockMotoristaModel.create.mockResolvedValue(mockMotoristaCriado);

      // Executa a chamada de serviço
      const motorista = await motoristaService.createMotorista(motoristaData);

      // Verifica se o resultado está correto
      expect(motorista).toEqual(mockMotoristaCriado);
    });
    test('Deve lançar um erro "Conflict" caso o motorista já exista', async () => {
      const motoristaData = {
        cpf: "09988877701",
        placa: "DEF5678",
        nome: "Lucas Ferreira",
        telefone: "11999888777",
        email: "lucas.ferreira@email.com",
      };

      // Defina o comportamento esperado do mock do Model de motoristas
      mockMotoristaModel.findByPk.mockResolvedValue(true);  // Simula cpfExiste = true

      // Chama a função createMotorista e verifica se lança uma exceção Conflict
      expect(() => motoristaService.createMotorista(motoristaData)).rejects.toThrowError(Conflict);

      // Verifica se a função do mock foi chamada corretamente
      expect(mockMotoristaModel.findByPk).toHaveBeenCalledTimes(1);
      expect(mockMotoristaModel.findByPk).toHaveBeenCalledWith(motoristaData.cpf);
    });
    test('Deve lançar um erro "InternalServerError" no caso de um erro desconhecido', async () => {
      const motoristaData = {
        cpf: "09988877701",
        placa: "DEF5678",
        nome: "Lucas Ferreira",
        telefone: "11999888777",
        email: "lucas.ferreira@email.com",
      };
      const mockMotorista = null
      // Defina o comportamento esperado do mock do Model de motoristas
      mockMotoristaModel.findByPk.mockRejectedValue(mockMotorista);

      // Chama a função createMotorista e verifica se lança uma exceção InternalServerError
      await expect(motoristaService.createMotorista(motoristaData)).rejects.toThrowError(InternalServerError);

      // Verifica se a função do mock foi chamada corretamente
      expect(mockMotoristaModel.findByPk).toHaveBeenCalledTimes(1);
      expect(mockMotoristaModel.findByPk).toHaveBeenCalledWith(motoristaData.cpf);
    });
  });

  // Teste para updateMotorista
  describe('Testes para o método updateMotorista', () => {
    test('Deve atualizar um motorista existente', async () => {
      const cpf = '09988877701';
      const motoristaData = {
        cpf: "09988877701",
        placa: "DEF5678",
        nome: "Lucas Ferreira da Silva",
        telefone: "11999888777",
        email: "lucas.ferreira@email.com",
      };

      const mockMotoristaAtualizado = {
        cpf: "09988877701",
        placa: "DEF5678",
        nome: "Lucas Ferreira da Silva",
        telefone: "11999888777",
        email: "lucas.ferreira@email.com",
        data_registro: "2023-06-15T01:49:39.000Z"
      };

      // Defina o comportamento esperado do mock do Model de motoristas
      mockMotoristaModel.findByPk.mockResolvedValue(true);  // Simula cpfExiste = true
      mockMotoristaModel.update.mockResolvedValue(mockMotoristaAtualizado); // Simula que a atualização foi bem-sucedida

      // // Executa a chamada de serviço
      const resultado = await motoristaService.updateMotorista(cpf, motoristaData)
      expect(resultado).toEqual(motoristaData);


    });
    test('Deve lançar um erro "NotFound" caso o motorista não seja encontrado', async () => {
      const cpf = '09988877701';
      const mockMotorista = null;

      // Defina o comportamento esperado do mock do Model de motoristas
      mockMotoristaModel.findByPk.mockResolvedValue(mockMotorista);

      // Chama a função deleteMotorista e verifica se lança uma exceção NotFound
      await expect(motoristaService.updateMotorista(cpf)).rejects.toThrowError(NotFound);

      // Verifica se a função do mock foi chamada corretamente
      expect(mockMotoristaModel.findByPk).toHaveBeenCalledTimes(1);
      expect(mockMotoristaModel.findByPk).toHaveBeenCalledWith(cpf);
    });
    test('Deve lançar um erro "InternalServerError" no caso de um erro desconhecido', async () => {
      const cpf = '09988877701';
      const mockMotorista = {};

      // Defina o comportamento esperado do mock do Model de motoristas
      mockMotoristaModel.findByPk.mockRejectedValue(mockMotorista);

      // Chama a função deleteMotorista e verifica se lança uma exceção InternalServerError
      await expect(motoristaService.updateMotorista(cpf)).rejects.toThrowError(InternalServerError);

      // Verifica se a função do mock foi chamada corretamente
      expect(mockMotoristaModel.findByPk).toHaveBeenCalledTimes(1);
      expect(mockMotoristaModel.findByPk).toHaveBeenCalledWith(cpf);

    });
  });

  // Teste para deleteMotorista
  describe('Testes para o método deleteMotorista', () => {
    test('Deve excluir um motorista existente', async () => {
      const cpf = '09988877701';
      // Definição do comportamento esperado do mock do Model de motoristas
      const mockMotorista = {
        cpf: "09988877701",
        placa: "DEF5678",
        nome: "Lucas Ferreira",
        telefone: "11999888777",
        email: "lucas.ferreira@email.com",
        data_registro: "2023-06-11T00:29:31.000Z"
      }
      mockMotoristaModel.findByPk.mockResolvedValueOnce(mockMotorista);
      mockMotoristaModel.destroy.mockResolvedValue(1); // Simula que a exclusão foi bem-sucedida

      // Executa a chamada de serviço
      const resultado = await motoristaService.deleteMotorista(cpf);
      expect(resultado).toEqual(1);
    });
    test('Deve lançar um erro "NotFound', async () => {
      const cpf = '09988877701';
      const mockMotorista = null;

      // Defina o comportamento esperado do mock do Model de motoristas
      mockMotoristaModel.findByPk.mockResolvedValue(mockMotorista);

      // Chama a função deleteMotorista e verifica se lança uma exceção NotFound
      await expect(motoristaService.deleteMotorista(cpf)).rejects.toThrowError(NotFound);

      // Verifica se a função do mock foi chamada corretamente
      expect(mockMotoristaModel.findByPk).toHaveBeenCalledTimes(1);
      expect(mockMotoristaModel.findByPk).toHaveBeenCalledWith(cpf);
    });
    test('Deve lançar um erro "InternalServerError" no caso de um erro desconhecido', async () => {
      const cpf = '09988877701';
      const mockMotorista = {};

      // Defina o comportamento esperado do mock do Model de motoristas
      mockMotoristaModel.findByPk.mockRejectedValue(mockMotorista);

      // Chama a função deleteMotorista e verifica se lança uma exceção InternalServerError
      await expect(motoristaService.deleteMotorista(cpf)).rejects.toThrowError(InternalServerError);

      // Verifica se a função do mock foi chamada corretamente
      expect(mockMotoristaModel.findByPk).toHaveBeenCalledTimes(1);
      expect(mockMotoristaModel.findByPk).toHaveBeenCalledWith(cpf);

    });
  });

});
