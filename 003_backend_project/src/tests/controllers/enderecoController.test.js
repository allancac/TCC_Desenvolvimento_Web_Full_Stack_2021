// importar as dependências usadas no Controller
const { NotFound, InternalServerError, Conflict } = require('../../services/serviceErrors');
EnderecoController = require('../../controllers/enderecoController')

describe('Testes da camada Controller da entidade Enderecos', () => {
  let mockEnderecoService;
  let enderecoController;

  beforeEach(() => {
    // Criação um mock para o a camada de Serviços da entidade enderecos
    mockEnderecoService = {
      getAllEnderecos: jest.fn(),
      getEnderecoById: jest.fn(),
      createEndereco: jest.fn(),
      updateEndereco: jest.fn(),
      deleteEndereco: jest.fn(),
    };
    // Cria uma instância do Controller da entidade Endereco. Também injeta a dependência mockada
    enderecoController = EnderecoController(mockEnderecoService)
  });

  describe('Testes para o método getAllEnderecos()', () => {
    test('Deve invocar o médoto getAllEnderecos da camada de serviços e retornar um array de enderecos', async () => {
      // Cria um Mock da lista de Enderecos
      const mockEnderecos = [
        {
          id: 1,
          id_cliente: 1,
          logradouro: "Rua A, 123",
          cidade: "Rio de Janeiro",
          estado: "RJ",
          cep: "20000-000",
          tipo: "Comercial",
          data_registro: "2023-06-16T15:10:57.000Z"
        },
        {
          id: 2,
          id_cliente: 2,
          logradouro: "Avenida B, 456",
          cidade: "Niterói",
          estado: "RJ",
          cep: "24000-000",
          tipo: "Entrega",
          data_registro: "2023-06-16T15:10:57.000Z"
        },

      ];

      // Cria um Mock do objeto `req` 
      const req = { query: { offset: '0', limit: '10' } }; // Define offset e limit como strings

      // Cria um Mock do objeto `res`
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Define o comportamento esperado do mock da camada Service da entidade enderecos
      mockEnderecoService.getAllEnderecos.mockResolvedValue(mockEnderecos);

      // Executa a chamada do Controller 
      await enderecoController.getAllEnderecos(req, res);

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
          count: mockEnderecos.length,
        },
        data: mockEnderecos,
      });

    });
    test('Deve retornar um HTTP Status Code 404 e um Json com descrição do erro caso não encontre Enderecos', async () => {
      // Cria um Mock para a retorno do método getAllEnderecos() da camada de serviços.
      const mockEnderecos = [];

      // Cria um Mock do objeto `req` 
      const req = { query: { offset: '0', limit: '10' } }; // Define offset e limit como strings

      // Cria um Mock do objeto `res`
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Define o comportamento esperado do mock da camada Service da entidade enderecos
      mockEnderecoService.getAllEnderecos.mockResolvedValue(mockEnderecos);

      // Executa a chamada do Controller 
      await enderecoController.getAllEnderecos(req, res);

      // Verifica se o resultado está correto
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        status: {
          code: 404,
          error: 'Nenhum endereço foi encontrado.'
        }
      });

    });
    test('Deve retornar um HTTP Status Code 500 e um Json com descrição do erro para erros desconhecidos', async () => {
      // Cria um Mock para a retorno do método getAllEnderecos() da camada de serviços.
      const mockEnderecos = [];

      // Cria um Mock do objeto `req` 
      const req = { query: { offset: '0', limit: '10' } }; // Define offset e limit como strings

      // Cria um Mock do objeto `res`
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Define o comportamento esperado do mock da camada Service da entidade enderecos
      mockEnderecoService.getAllEnderecos.mockRejectedValue(mockEnderecos);

      // Executa a chamada do Controller 
      await enderecoController.getAllEnderecos(req, res);

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
  describe('Testes para o método getEnderecoById()', () => {
    test('Deve invocar o método getEnderecoById da camada de serviço e retornar um array com o endereco procurado', async () => {
      // Cria um Mock para a retorno do método getAllEnderecos() da camada de serviços.
      const mockEndereco = [
        {
          id: 1,
          id_cliente: 1,
          logradouro: "Rua A, 123",
          cidade: "Rio de Janeiro",
          estado: "RJ",
          cep: "20000-000",
          tipo: "Comercial",
          data_registro: "2023-06-16T15:10:57.000Z"
        }
      ];

      // Cria um Mock do objeto `req` 
      const req = { params: { id: 1 } }; // Define offset e limit como strings

      // Cria um Mock do objeto `res`
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Define o comportamento esperado do mock da camada Service da entidade enderecos
      mockEnderecoService.getEnderecoById.mockResolvedValue(mockEndereco);

      // Executa a chamada do Controller 
      await enderecoController.getEnderecoById(req, res);

      // Verifica se a resposta do status HTTP está correto
      expect(res.status).toHaveBeenCalledWith(200);
      // Verifica se o resultado JSON passado no corpo da resposta está correto
      expect(res.json).toHaveBeenCalledWith({
        status:
        {
          code: 200,
          message: 'OK'
        },
        data: [mockEndereco],
      });

    });
    test('Deve retornar um HTTP Status Code 404 e um Json com descrição do erro caso não encontre um Endereco', async () => {

      // Cria um Mock do objeto `req` 
      const req = { params: { id: 1 } }; // Define offset e limit como strings

      // Cria um Mock do objeto `res`
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Define o comportamento esperado do mock da camada Service da entidade enderecos
      mockEnderecoService.getEnderecoById.mockRejectedValue(new NotFound('Endereco não encontrado.'));

      // Executa a chamada do Controller 
      await enderecoController.getEnderecoById(req, res);

      // Verifica se o resultado está correto
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        status: {
          code: 404,
          error: 'Endereco não encontrado.'
        }
      });

    });
    test('Deve retornar um HTTP Status Code 500 e um Json com descrição do erro para erros desconhecidos', async () => {
      // Cria um Mock para a retorno do método getAllEnderecos() da camada de serviços.
      const mockEndereco = [];

      // Cria um Mock do objeto `req` 
      const req = { params: { id: 1 } }; // Define offset e limit como strings

      // Cria um Mock do objeto `res`
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Define o comportamento esperado do mock da camada Service da entidade enderecos
      mockEnderecoService.getEnderecoById.mockRejectedValue(mockEndereco);

      // Executa a chamada do Controller 
      await enderecoController.getEnderecoById(req, res);

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
  describe('Testes para o método createEndereco()', () => {
    test('Deve invocar o método createEndereco da camada de serviço e criar um endereco', async () => {
      // Cria um Mock para a retorno do método createEndereco() da camada de serviços.
      const mockEndereco = [
        {
          id: 1,
          id_cliente: 1,
          logradouro: "Rua A, 123",
          cidade: "Rio de Janeiro",
          estado: "RJ",
          cep: "20000-000",
          tipo: "Comercial",
          data_registro: "2023-06-16T15:10:57.000Z"
        }];
      const mockEnderecoData = {
        id: 1,
        id_cliente: 1,
        logradouro: "Rua A, 123",
        cidade: "Rio de Janeiro",
        estado: "RJ",
        cep: "20000-000",
        tipo: "Comercial",
      };

      // Cria um Mock do objeto `req` 
      const req = { body: mockEnderecoData }; // Define o conteúdo do body passado no corpo da requisição

      // Cria um Mock do objeto `res`
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Define o comportamento esperado do mock da camada Service da entidade enderecos
      mockEnderecoService.createEndereco.mockResolvedValue(mockEndereco);

      // Executa a chamada do Controller 
      await enderecoController.createEndereco(req, res);

      // Verifica se a resposta do status HTTP está correto 
      expect(res.status).toHaveBeenCalledWith(200);
      // Verifica se o resultado está correto
      expect(res.json).toHaveBeenCalledWith({
        status: {
          code: 200,
          message: 'OK',
        },
        data: [mockEndereco],
      });

    });
    test('Deve retornar um HTTP Status Code 409 e um Json com descrição do erro caso encontre um Endereco já cadastrado', async () => {
      // Cria um Mock para a retorno do método createEndereco() da camada de serviços.

      const mockEnderecoData = {
        id: 1,
        id_cliente: 1,
        logradouro: "Rua A, 123",
        cidade: "Rio de Janeiro",
        estado: "RJ",
        cep: "20000-000",
        tipo: "Comercial",
      };

      // Cria um Mock do objeto `req` 
      const req = { body: mockEnderecoData }; // Define o conteúdo do body passado no corpo da requisição

      // Cria um Mock do objeto `res`
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Define o comportamento esperado do mock da camada Service da entidade enderecos
      mockEnderecoService.createEndereco.mockRejectedValue(new Conflict('Endereco já é cadastrado no sistema.'));

      // Executa a chamada do Controller 

      // Verifica se a resposta do status HTTP está correto 
      await enderecoController.createEndereco(req, res)
      expect(res.status).toHaveBeenCalledWith(409);
      // Verifica se o resultado está correto
      expect(res.json).toHaveBeenCalledWith({
        status: {
          code: 409,
          error: 'Endereco já é cadastrado no sistema.'
        },
      });

    });
    test('Deve retornar um HTTP Status Code 500 e um Json com descrição do erro para erros desconhecidos', async () => {
      const mockEnderecoData = {
        id: 1,
        id_cliente: 1,
        logradouro: "Rua A, 123",
        cidade: "Rio de Janeiro",
        estado: "RJ",
        cep: "20000-000",
        tipo: "Comercial",
      };

      // Cria um Mock do objeto `req` 
      const req = { body: mockEnderecoData }; // Define o conteúdo do body passado no corpo da requisição

      // Cria um Mock do objeto `res`
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Define o comportamento esperado do mock da camada Service da entidade enderecos
      mockEnderecoService.createEndereco.mockRejectedValue(new InternalServerError('Não foi possível criar o endereco.'));

      // Verifica se a resposta do status HTTP está correto 
      await enderecoController.createEndereco(req, res)
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        status: {
          code: 500,
          error: 'Não foi possível criar o endereco.'
        },
      });

    });


  });
  describe('Testes para o método updateEndereco()', () => {
    test('Deve invocar o método updataEndereco da camada de serviço e atualizar um endereco', async () => {
      // Cria um Mock para a retorno do método getAllEnderecos() da camada de serviços.
      const mockEnderecoData = {
        id: 1,
        id_cliente: 1,
        logradouro: "Rua A, 123",
        cidade: "Rio de Janeiro",
        estado: "RJ",
        cep: "20000-000",
        tipo: "Comercial",
      };


      const mockEndereco = [
        {
          id: 1,
          id_cliente: 1,
          logradouro: "Rua A, 123",
          cidade: "Rio de Janeiro",
          estado: "RJ",
          cep: "20000-000",
          tipo: "Comercial",
          data_registro: "2023-06-16T15:10:57.000Z"
        }];

      // Cria um Mock do objeto `req` 
      const req = {
        params: { id: 1 },
        body: mockEnderecoData
      };

      // Cria um Mock do objeto `res`
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Define o comportamento esperado do mock da camada Service da entidade enderecos
      mockEnderecoService.updateEndereco.mockResolvedValue(mockEndereco);

      // Executa a chamada do Controller 
      await enderecoController.updateEndereco(req, res);

      // Verifica se a resposta do status HTTP está correto 
      expect(res.status).toHaveBeenCalledWith(200);
      // Verifica se o resultado está correto
      expect(res.json).toHaveBeenCalledWith({
        status: {
          code: 200,
          message: 'OK',
        },
        data: [mockEndereco],
      });


    });
    test('Deve retornar um HTTP Status Code 404 e um Json com descrição do erro caso não encontre Enderecos', async () => {
      // Cria um Mock do body da Requisição 
      const mockEnderecoData = {
        id: 1,
        id_cliente: 1,
        logradouro: "Rua A, 123",
        cidade: "Rio de Janeiro",
        estado: "RJ",
        cep: "20000-000",
        tipo: "Comercial",
      };

      // Cria um Mock do objeto `req`
      const req = {
        params: { id: 1 },
        body: mockEnderecoData
      };

      // Cria um Mock do objeto `res`
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Define o comportamento esperado do mock da camada Service da entidade enderecos
      mockEnderecoService.getEnderecoById.mockRejectedValue(new NotFound('Endereço não encontrado.'));

      // Executa a chamada do Controller 
      await enderecoController.getEnderecoById(req, res);

      // Verifica se o resultado está correto
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        status: {
          code: 404,
          error: 'Endereço não encontrado.'
        }
      });
    });
    test('Deve retornar um HTTP Status Code 500 e um Json com descrição do erro para erros desconhecidos', async () => {

      // Cria um Mock para a retorno do método getAllEnderecos() da camada de serviços.
      const mockEnderecos = [];
      // Cria um Mock do body da Requisição 
      const mockEnderecoData = {
        id: 1,
        id_cliente: 1,
        logradouro: "Rua A, 123",
        cidade: "Rio de Janeiro",
        estado: "RJ",
        cep: "20000-000",
        tipo: "Comercial",
      };

      // Cria um Mock do objeto `req` 
      const req = {
        params: { id: 1 },
        body: mockEnderecoData
      };

      // Cria um Mock do objeto `res`
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Define o comportamento esperado do mock da camada Service da entidade enderecos
      mockEnderecoService.updateEndereco.mockRejectedValue(mockEnderecos);

      // Executa a chamada do Controller 
      await enderecoController.updateEndereco(req, res);

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
  describe('Testes para o método deleteEndereco()', () => {
    test('Deve invocar o método deleteEndereco da camada de serviço e deletar um endereco', async () => {

      mockEndereco = 1
      // Cria um Mock do objeto `req` 
      const req = { params: { id: 1 } }; // Define offset e limit como strings

      // Cria um Mock do objeto `res`
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Define o comportamento esperado do mock da camada Service da entidade enderecos
      mockEnderecoService.deleteEndereco.mockResolvedValue(mockEndereco);

      // Executa a chamada do Controller 
      await enderecoController.deleteEndereco(req, res);

      // Verifica se a resposta do status HTTP está correto
      expect(res.status).toHaveBeenCalledWith(200);
      // Verifica se o resultado JSON passado no corpo da resposta está correto
      expect(res.json).toHaveBeenCalledWith({
        status:
        {
          code: 200,
          message: 'Endereço excluído com sucesso.'
        }
      });

    });
    test('Deve retornar um HTTP Status Code 404 e um Json com descrição do erro caso não encontre Enderecos', async () => {

      // Cria um Mock do objeto `req` 
      const req = { params: { id: 1 } }; // Define offset e limit como strings

      // Cria um Mock do objeto `res`
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Define o comportamento esperado do mock da camada Service da entidade enderecos
      mockEnderecoService.deleteEndereco.mockRejectedValue(new NotFound('Endereco não encontrado.'));

      // Executa a chamada do Controller 
      await enderecoController.deleteEndereco(req, res);

      // Verifica se a resposta do status HTTP está correto
      expect(res.status).toHaveBeenCalledWith(404);
      // Verifica se o resultado JSON passado no corpo da resposta está correto
      expect(res.json).toHaveBeenCalledWith({
        status:
        {
          code: 404,
          error: 'Endereco não encontrado.'
        }
      });


    });
    test('Deve retornar um HTTP Status Code 500 e um Json com descrição do erro para erros desconhecidos', async () => {
      // Cria um Mock do objeto `req` 
      const req = { params: { id: 1 } }; // Define offset e limit como strings

      // Cria um Mock do objeto `res`
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Define o comportamento esperado do mock da camada Service da entidade enderecos
      mockEnderecoService.deleteEndereco.mockRejectedValue(new InternalServerError('Não foi possível atualizar o endereco.'));

      // Executa a chamada do Controller 
      await enderecoController.deleteEndereco(req, res);

      // Verifica se a resposta do status HTTP está correto
      expect(res.status).toHaveBeenCalledWith(500);
      // Verifica se o resultado JSON passado no corpo da resposta está correto
      expect(res.json).toHaveBeenCalledWith({
        status:
        {
          code: 500,
          error: 'Não foi possível atualizar o endereco.'
        }
      });

    });

  });


});