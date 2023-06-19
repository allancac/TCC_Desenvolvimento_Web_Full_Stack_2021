// importar as dependências usadas no Controller
const { NotFound, InternalServerError, Conflict } = require('../../services/serviceErrors');
MotoristaController = require('../../controllers/motoristaController')

describe('Testes da camada Controller da entidade Motoristas', () => {
  let mockMotoristaService;
  let motoristaController;

  beforeEach(() => {
    // Criação um mock para o a camada de Serviços da entidade motoristas
    mockMotoristaService = {
      getAllMotoristas: jest.fn(),
      getMotoristaByCPF: jest.fn(),
      createMotorista: jest.fn(),
      updateMotorista: jest.fn(),
      deleteMotorista: jest.fn(),
    };
    // Cria uma instância do Controller da entidade Motorista. Também injeta a dependência mockada
    motoristaController = MotoristaController(mockMotoristaService)
  });

  describe('Testes para o método getAllMotoristas()', () => {
    test('Deve invocar o médoto getAllMotoristas da camada de serviços e retornar um array de motoristas', async () => {
      // Cria um Mock da lista de Motoristas
      const mockMotoristas = [
        {
          cpf: "11122233344",
          placa: "DEF5678",
          nome: "Lucas Ferreira",
          telefone: "(31) 7777-7777",
          email: "lucas.ferreira@email.com",
          data_registro: "2023-06-16T15:12:34.000Z"
        },
        {
          cpf: "11122233345",
          placa: "VWX9102",
          nome: "Thiago Souza",
          telefone: "(92) 5555-5555",
          email: "thiago.souza@email.com",
          data_registro: "2023-06-16T15:12:36.000Z"
        }

      ];

      // Cria um Mock do objeto `req` 
      const req = { query: { offset: '0', limit: '10' } }; // Define offset e limit como strings

      // Cria um Mock do objeto `res`
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Define o comportamento esperado do mock da camada Service da entidade motoristas
      mockMotoristaService.getAllMotoristas.mockResolvedValue(mockMotoristas);

      // Executa a chamada do Controller 
      await motoristaController.getAllMotoristas(req, res);

      // Verifica se o resultado está correto
      expect(res.status).toHaveBeenCalledWith(200);

      // Verifica se o resultado está correto
      expect(res.json).toHaveBeenCalledWith({
        status: {
          code: 200,
          message: 'OK',
        },
        metadata: {
          offset: 0,
          limit: 10,
          count: mockMotoristas.length,
        },
        data: mockMotoristas,
      });

    });
    test('Deve retornar um HTTP Status Code 404 e um Json com descrição do erro caso não encontre Motoristas', async () => {
      // Cria um Mock para a retorno do método getAllMotoristas() da camada de serviços.
      const mockMotoristas = [];

      // Cria um Mock do objeto `req` 
      const req = { query: { offset: '0', limit: '10' } }; // Define offset e limit como strings

      // Cria um Mock do objeto `res`
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Define o comportamento esperado do mock da camada Service da entidade motoristas
      mockMotoristaService.getAllMotoristas.mockResolvedValue(mockMotoristas);

      // Executa a chamada do Controller 
      await motoristaController.getAllMotoristas(req, res);

      // Verifica se o resultado está correto
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        status: {
          code: 404,
          error: 'Nenhum motorista foi encontrado.'
        }
      });

    });
    test('Deve retornar um HTTP Status Code 500 e um Json com descrição do erro para erros desconhecidos', async () => {
      // Cria um Mock para a retorno do método getAllMotoristas() da camada de serviços.
      const mockMotoristas = [];

      // Cria um Mock do objeto `req` 
      const req = { query: { offset: '0', limit: '10' } }; // Define offset e limit como strings

      // Cria um Mock do objeto `res`
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Define o comportamento esperado do mock da camada Service da entidade motoristas
      mockMotoristaService.getAllMotoristas.mockRejectedValue(mockMotoristas);

      // Executa a chamada do Controller 
      await motoristaController.getAllMotoristas(req, res);

      // Verifica se o resultado está correto
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        status: {
          code: 500,
          error: undefined
        }
      });


    });
  });
  describe('Testes para o método getMotoristaByCPF()', () => {
    test('Deve invocar o método getMotoristaByCPF da camada de serviço e retornar um array com o motorista procurado', async () => {
      // Cria um Mock para a retorno do método getAllMotoristas() da camada de serviços.
      const mockMotorista = [
        {
          cpf: "11122233344",
          placa: "DEF5678",
          nome: "Lucas Ferreira",
          telefone: "(31) 7777-7777",
          email: "lucas.ferreira@email.com",
          data_registro: "2023-06-16T15:12:34.000Z"
        }
      ];

      // Cria um Mock do objeto `req` 
      const req = { params: { cpf: "11122233344" } }; // Define offset e limit como strings

      // Cria um Mock do objeto `res`
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Define o comportamento esperado do mock da camada Service da entidade motoristas
      mockMotoristaService.getMotoristaByCPF.mockResolvedValue(mockMotorista);

      // Executa a chamada do Controller 
      await motoristaController.getMotoristaByCPF(req, res);

      // Verifica se a resposta do status HTTP está correto
      expect(res.status).toHaveBeenCalledWith(200);
      // Verifica se o resultado JSON passado no corpo da resposta está correto
      expect(res.json).toHaveBeenCalledWith({
        status:
        {
          code: 200,
          message: 'OK'
        },
        data: [mockMotorista],
      });

    });
    test('Deve retornar um HTTP Status Code 404 e um Json com descrição do erro caso não encontre um Motorista', async () => {

      // Cria um Mock do objeto `req` 
      const req = { params: { cpf: "11122233344" } }; // Define offset e limit como strings

      // Cria um Mock do objeto `res`
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Define o comportamento esperado do mock da camada Service da entidade motoristas
      mockMotoristaService.getMotoristaByCPF.mockRejectedValue(new NotFound('Motorista não encontrado.'));

      // Executa a chamada do Controller 
      await motoristaController.getMotoristaByCPF(req, res);

      // Verifica se o resultado está correto
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        status: {
          code: 404,
          error: 'Motorista não encontrado.'
        }
      });

    });
    test('Deve retornar um HTTP Status Code 500 e um Json com descrição do erro para erros desconhecidos', async () => {
      // Cria um Mock para a retorno do método getAllMotoristas() da camada de serviços.
      const mockMotorista = [];

      // Cria um Mock do objeto `req` 
      const req = { params: { cpf: "11122233344" } }; // Define offset e limit como strings

      // Cria um Mock do objeto `res`
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Define o comportamento esperado do mock da camada Service da entidade motoristas
      mockMotoristaService.getMotoristaByCPF.mockRejectedValue(mockMotorista);

      // Executa a chamada do Controller 
      await motoristaController.getMotoristaByCPF(req, res);

      // Verifica se o resultado está correto
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        status: {
          code: 500,
          error: undefined
        }
      });
    });
  });
  describe('Testes para o método createMotorista()', () => {
    test('Deve invocar o método createMotorista da camada de serviço e criar um motorista', async () => {
      // Cria um Mock para a retorno do método createMotorista() da camada de serviços.
      const mockMotorista = [
        {
          cpf: "11122233344",
          placa: "DEF5678",
          nome: "Lucas Ferreira",
          telefone: "(31) 7777-7777",
          email: "lucas.ferreira@email.com",
          data_registro: "2023-06-16T15:12:34.000Z"
        }];
      const mockMotoristaData = {
        cpf: "11122233344",
        placa: "DEF5678",
        nome: "Lucas Ferreira",
        telefone: "(31) 7777-7777",
        email: "lucas.ferreira@email.com"
      };

      // Cria um Mock do objeto `req` 
      const req = { body: mockMotoristaData }; // Define o conteúdo do body passado no corpo da requisição

      // Cria um Mock do objeto `res`
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Define o comportamento esperado do mock da camada Service da entidade motoristas
      mockMotoristaService.createMotorista.mockResolvedValue(mockMotorista);

      // Executa a chamada do Controller 
      await motoristaController.createMotorista(req, res);

      // Verifica se a resposta do status HTTP está correto 
      expect(res.status).toHaveBeenCalledWith(200);
      // Verifica se o resultado está correto
      expect(res.json).toHaveBeenCalledWith({
        status: {
          code: 200,
          message: 'OK',
        },
        data: [mockMotorista],
      });

    });
    test('Deve retornar um HTTP Status Code 409 e um Json com descrição do erro caso encontre um Motorista já cadastrado', async () => {
      // Cria um Mock para a retorno do método createMotorista() da camada de serviços.

      const mockMotoristaData = {
        cpf: "11122233344",
        placa: "DEF5678",
        nome: "Lucas Ferreira",
        telefone: "(31) 7777-7777",
        email: "lucas.ferreira@email.com"
      };

      // Cria um Mock do objeto `req` 
      const req = { body: mockMotoristaData }; // Define o conteúdo do body passado no corpo da requisição

      // Cria um Mock do objeto `res`
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Define o comportamento esperado do mock da camada Service da entidade motoristas
      mockMotoristaService.createMotorista.mockRejectedValue(new Conflict('Motorista já é cadastrado no sistema.'));

      // Executa a chamada do Controller 

      // Verifica se a resposta do status HTTP está correto 
      await motoristaController.createMotorista(req, res)
      expect(res.status).toHaveBeenCalledWith(409);
      // Verifica se o resultado está correto
      expect(res.json).toHaveBeenCalledWith({
        status: {
          code: 409,
          error: 'Motorista já é cadastrado no sistema.'
        },
      });

    });
    test('Deve retornar um HTTP Status Code 500 e um Json com descrição do erro para erros desconhecidos', async () => {
      const mockMotoristaData = {
        cpf: "11122233344",
        placa: "DEF5678",
        nome: "Lucas Ferreira",
        telefone: "(31) 7777-7777",
        email: "lucas.ferreira@email.com"
      };

      // Cria um Mock do objeto `req` 
      const req = { body: mockMotoristaData }; // Define o conteúdo do body passado no corpo da requisição

      // Cria um Mock do objeto `res`
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Define o comportamento esperado do mock da camada Service da entidade motoristas
      mockMotoristaService.createMotorista.mockRejectedValue(new InternalServerError('Não foi possível criar o motorista.'));

      // Verifica se a resposta do status HTTP está correto 
      await motoristaController.createMotorista(req, res)
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        status: {
          code: 500,
          error: 'Não foi possível criar o motorista.'
        },
      });

    });
  });
  describe('Testes para o método updateMotorista()', () => {
    test('Deve invocar o método updataMotorista da camada de serviço e atualizar um motorista', async () => {
      // Cria um Mock para a retorno do método getAllMotoristas() da camada de serviços.
      const mockMotoristaData = {
        cpf: "11122233344",
        placa: "DEF5678",
        nome: "Lucas Ferreira",
        telefone: "(31) 7777-7777",
        email: "lucas.ferreira@email.com"
      };


      const mockMotorista = {
        cpf: "11122233344",
        placa: "DEF5678",
        nome: "Lucas Ferreira",
        telefone: "(31) 7777-7777",
        email: "lucas.ferreira@email.com",
        data_registro: "2023-06-16T15:12:34.000Z"
      };

      // Cria um Mock do objeto `req` 
      const req = {
        params: { cpf: "11122233344" },
        body: mockMotoristaData
      };

      // Cria um Mock do objeto `res`
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Define o comportamento esperado do mock da camada Service da entidade motoristas
      mockMotoristaService.updateMotorista.mockResolvedValue(mockMotorista);

      // Executa a chamada do Controller 
      await motoristaController.updateMotorista(req, res);

      // Verifica se a resposta do status HTTP está correto 
      expect(res.status).toHaveBeenCalledWith(200);
      // Verifica se o resultado está correto
      expect(res.json).toHaveBeenCalledWith({
        status: {
          code: 200,
          message: 'OK',
        },
        data: [mockMotorista],
      });


    });
    test('Deve retornar um HTTP Status Code 404 e um Json com descrição do erro caso não encontre Motoristas', async () => {
      // Cria um Mock do body da Requisição 
      const mockMotoristaData = {
        cpf: "11122233344",
        placa: "DEF5678",
        nome: "Lucas Ferreira",
        telefone: "(31) 7777-7777",
        email: "lucas.ferreira@email.com",
        data_registro: "2023-06-16T15:12:34.000Z"
      };

      // Cria um Mock do objeto `req`
      const req = {
        params: { cpf: "11122233344" },
        body: mockMotoristaData
      };

      // Cria um Mock do objeto `res`
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Define o comportamento esperado do mock da camada Service da entidade motoristas
      mockMotoristaService.getMotoristaByCPF.mockRejectedValue(new NotFound('Motorista não encontrado.'));

      // Executa a chamada do Controller 
      await motoristaController.getMotoristaByCPF(req, res);

      // Verifica se o resultado está correto
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        status: {
          code: 404,
          error: 'Motorista não encontrado.'
        }
      });
    });
    test('Deve retornar um HTTP Status Code 500 e um Json com descrição do erro para erros desconhecidos', async () => {

      // Cria um Mock para a retorno do método getAllMotoristas() da camada de serviços.
      const mockMotoristas = [];
      // Cria um Mock do body da Requisição 
      const mockMotoristaData = {
        cpf: "11122233344",
        placa: "DEF5678",
        nome: "Lucas Ferreira",
        telefone: "(31) 7777-7777",
        email: "lucas.ferreira@email.com",
        data_registro: "2023-06-16T15:12:34.000Z"
      };

      // Cria um Mock do objeto `req` 
      const req = {
        params: { cpf: "11122233344" },
        body: mockMotoristaData
      };

      // Cria um Mock do objeto `res`
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Define o comportamento esperado do mock da camada Service da entidade motoristas
      mockMotoristaService.updateMotorista.mockRejectedValue(mockMotoristas);

      // Executa a chamada do Controller 
      await motoristaController.updateMotorista(req, res);

      // Verifica se o resultado está correto
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        status: {
          code: 500,
          error: undefined
        }
      });


    });


  });
  describe('Testes para o método deleteMotorista()', () => {
    test('Deve invocar o método deleteMotorista da camada de serviço e deletar um motorista', async () => {

      mockMotorista = 1
      // Cria um Mock do objeto `req` 
      const req = { params: { cpf: "11122233344" } }; // Define offset e limit como strings

      // Cria um Mock do objeto `res`
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Define o comportamento esperado do mock da camada Service da entidade motoristas
      mockMotoristaService.deleteMotorista.mockResolvedValue(mockMotorista);

      // Executa a chamada do Controller 
      await motoristaController.deleteMotorista(req, res);

      // Verifica se a resposta do status HTTP está correto
      expect(res.status).toHaveBeenCalledWith(200);
      // Verifica se o resultado JSON passado no corpo da resposta está correto
      expect(res.json).toHaveBeenCalledWith({
        status:
        {
          code: 200,
          message: 'Motorista excluído com sucesso.'
        }
      });

    });
    test('Deve retornar um HTTP Status Code 404 e um Json com descrição do erro caso não encontre Motoristas', async () => {

      // Cria um Mock do objeto `req` 
      const req = { params: { cpf: "11122233344" } }; // Define offset e limit como strings

      // Cria um Mock do objeto `res`
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Define o comportamento esperado do mock da camada Service da entidade motoristas
      mockMotoristaService.deleteMotorista.mockRejectedValue(new NotFound('Motorista não encontrado.'));

      // Executa a chamada do Controller 
      await motoristaController.deleteMotorista(req, res);

      // Verifica se a resposta do status HTTP está correto
      expect(res.status).toHaveBeenCalledWith(404);
      // Verifica se o resultado JSON passado no corpo da resposta está correto
      expect(res.json).toHaveBeenCalledWith({
        status:
        {
          code: 404,
          error: 'Motorista não encontrado.'
        }
      });


    });
    test('Deve retornar um HTTP Status Code 500 e um Json com descrição do erro para erros desconhecidos', async () => {
      // Cria um Mock do objeto `req` 
      const req = { params: { cpf: "11122233344" } }; // Define offset e limit como strings

      // Cria um Mock do objeto `res`
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Define o comportamento esperado do mock da camada Service da entidade motoristas
      mockMotoristaService.deleteMotorista.mockRejectedValue(new InternalServerError('Não foi possível atualizar o motorista.'));

      // Executa a chamada do Controller 
      await motoristaController.deleteMotorista(req, res);

      // Verifica se a resposta do status HTTP está correto
      expect(res.status).toHaveBeenCalledWith(500);
      // Verifica se o resultado JSON passado no corpo da resposta está correto
      expect(res.json).toHaveBeenCalledWith({
        status:
        {
          code: 500,
          error: 'Não foi possível atualizar o motorista.'
        }
      });

    });

  });


});