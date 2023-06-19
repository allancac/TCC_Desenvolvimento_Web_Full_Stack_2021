// importar as dependências usadas no Controller
const { NotFound, InternalServerError, Conflict } = require('../../services/serviceErrors');
ClienteController = require('../../controllers/clienteController')

describe('Testes da camada Controller da entidade Clientes', () => {
  let mockClienteService;
  let clienteController;

  beforeEach(() => {
    // Criação um mock para o a camada de Serviços da entidade clientes
    mockClienteService = {
      getAllClientes: jest.fn(),
      getClienteById: jest.fn(),
      createCliente: jest.fn(),
      updateCliente: jest.fn(),
      deleteCliente: jest.fn(),
    };
    // Cria uma instância do Controller da entidade Cliente. Também injeta a dependência mockada
    clienteController = ClienteController(mockClienteService)
  });

  describe('Testes para o método getAllClientes()', () => {
    test('Deve invocar o médoto getAllClientes da camada de serviços e retornar um array de clientes', async () => {
      // Cria um Mock da lista de Clientes
      const mockClientes = [
        {
          id: 1,
          nome_cliente: "Construtora Alpha",
          telefone: "2198765432",
          email: "contato@construtoraalpha.com.br",
          cnpj: "12345678901234",
          data_registro: "2023-06-16T15:10:48.000Z"
        },
        {
          id: 2,
          nome_cliente: "Loja de Materiais Beta",
          telefone: "2134567890",
          email: "contato@lojademateriaisbeta.com.br",
          cnpj: "23456789012345",
          data_registro: "2023-06-16T15:10:48.000Z"
        }

      ];

      // Cria um Mock do objeto `req` 
      const req = { query: { offset: '0', limit: '10' } }; // Define offset e limit como strings

      // Cria um Mock do objeto `res`
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Define o comportamento esperado do mock da camada Service da entidade clientes
      mockClienteService.getAllClientes.mockResolvedValue(mockClientes);

      // Executa a chamada do Controller 
      await clienteController.getAllClientes(req, res);

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
          count: mockClientes.length,
        },
        data: mockClientes,
      });

    });
    test('Deve retornar um HTTP Status Code 404 e um Json com descrição do erro caso não encontre Clientes', async () => {
      // Cria um Mock para a retorno do método getAllClientes() da camada de serviços.
      const mockClientes = [];

      // Cria um Mock do objeto `req` 
      const req = { query: { offset: '0', limit: '10' } }; // Define offset e limit como strings

      // Cria um Mock do objeto `res`
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Define o comportamento esperado do mock da camada Service da entidade clientes
      mockClienteService.getAllClientes.mockResolvedValue(mockClientes);

      // Executa a chamada do Controller 
      await clienteController.getAllClientes(req, res);

      // Verifica se o resultado está correto
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        status: {
          code: 404,
          error: 'Nenhum cliente foi encontrado.'
        }
      });

    });
    test('Deve retornar um HTTP Status Code 500 e um Json com descrição do erro para erros desconhecidos', async () => {
      // Cria um Mock para a retorno do método getAllClientes() da camada de serviços.
      const mockClientes = [];

      // Cria um Mock do objeto `req` 
      const req = { query: { offset: '0', limit: '10' } }; // Define offset e limit como strings

      // Cria um Mock do objeto `res`
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Define o comportamento esperado do mock da camada Service da entidade clientes
      mockClienteService.getAllClientes.mockRejectedValue(mockClientes);

      // Executa a chamada do Controller 
      await clienteController.getAllClientes(req, res);

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

  describe('Testes para o método getClienteById()', () => {
    test('Deve invocar o método getClienteById da camada de serviço e retornar um array com o cliente procurado', async () => {
      // Cria um Mock para a retorno do método getAllClientes() da camada de serviços.
      const mockCliente = [
        {
          id: 1,
          nome_cliente: "Construtora Alpha",
          telefone: "2198765432",
          email: "contato@construtoraalpha.com.br",
          cnpj: "12345678901234",
          data_registro: "2023-06-16T15:10:48.000Z"
        }
      ];

      // Cria um Mock do objeto `req` 
      const req = { params: { id: 1 } }; // Define offset e limit como strings

      // Cria um Mock do objeto `res`
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Define o comportamento esperado do mock da camada Service da entidade clientes
      mockClienteService.getClienteById.mockResolvedValue(mockCliente);

      // Executa a chamada do Controller 
      await clienteController.getClienteById(req, res);

      // Verifica se a resposta do status HTTP está correto
      expect(res.status).toHaveBeenCalledWith(200);
      // Verifica se o resultado JSON passado no corpo da resposta está correto
      expect(res.json).toHaveBeenCalledWith({
        status:
        {
          code: 200,
          message: 'OK'
        },
        data: [mockCliente],
      });

    });
    test('Deve retornar um HTTP Status Code 404 e um Json com descrição do erro caso não encontre um Cliente', async () => {

      // Cria um Mock do objeto `req` 
      const req = { params: { id: 1 } }; // Define offset e limit como strings

      // Cria um Mock do objeto `res`
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Define o comportamento esperado do mock da camada Service da entidade clientes
      mockClienteService.getClienteById.mockRejectedValue(new NotFound('Cliente não encontrado.'));

      // Executa a chamada do Controller 
      await clienteController.getClienteById(req, res);

      // Verifica se o resultado está correto
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        status: {
          code: 404,
          error: 'Cliente não encontrado.'
        }
      });

    });
    test('Deve retornar um HTTP Status Code 500 e um Json com descrição do erro para erros desconhecidos', async () => {
      // Cria um Mock para a retorno do método getAllClientes() da camada de serviços.
      const mockCliente = [];

      // Cria um Mock do objeto `req` 
      const req = { params: { id: 1 } }; // Define offset e limit como strings

      // Cria um Mock do objeto `res`
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Define o comportamento esperado do mock da camada Service da entidade clientes
      mockClienteService.getClienteById.mockRejectedValue(mockCliente);

      // Executa a chamada do Controller 
      await clienteController.getClienteById(req, res);

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

  describe('Testes para o método createCliente()', () => {
    test('Deve invocar o método createCliente da camada de serviço e criar um cliente', async () => {
      // Cria um Mock para a retorno do método createCliente() da camada de serviços.
      const mockCliente = [
        {
          id: 1,
          nome_cliente: "Construtora Alpha",
          telefone: "2198765432",
          email: "contato@construtoraalpha.com.br",
          cnpj: "12345678901234",
          data_registro: "2023-06-16T15:10:48.000Z"
        }];
      const mockClienteData = {
        id: 1,
        nome_cliente: "Construtora Alpha",
        telefone: "2198765432",
        email: "contato@construtoraalpha.com.br",
        cnpj: "12345678901234"
      };

      // Cria um Mock do objeto `req` 
      const req = { body: mockClienteData }; // Define o conteúdo do body passado no corpo da requisição

      // Cria um Mock do objeto `res`
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Define o comportamento esperado do mock da camada Service da entidade clientes
      mockClienteService.createCliente.mockResolvedValue(mockCliente);

      // Executa a chamada do Controller 
      await clienteController.createCliente(req, res);

      // Verifica se a resposta do status HTTP está correto 
      expect(res.status).toHaveBeenCalledWith(200);
      // Verifica se o resultado está correto
      expect(res.json).toHaveBeenCalledWith({
        status: {
          code: 200,
          message: 'OK',
        },
        data: [mockCliente],
      });

    });
    test('Deve retornar um HTTP Status Code 409 e um Json com descrição do erro caso encontre um Cliente já cadastrado', async () => {
      // Cria um Mock para a retorno do método createCliente() da camada de serviços.

      const mockClienteData = {
        id: 1,
        nome_cliente: "Construtora Alpha",
        telefone: "2198765432",
        email: "contato@construtoraalpha.com.br",
        cnpj: "12345678901234"
      };

      // Cria um Mock do objeto `req` 
      const req = { body: mockClienteData }; // Define o conteúdo do body passado no corpo da requisição

      // Cria um Mock do objeto `res`
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Define o comportamento esperado do mock da camada Service da entidade clientes
      mockClienteService.createCliente.mockRejectedValue(new Conflict('Cliente já é cadastrado no sistema.'));

      // Executa a chamada do Controller 

      // Verifica se a resposta do status HTTP está correto 
      await clienteController.createCliente(req, res)
      expect(res.status).toHaveBeenCalledWith(409);
      // Verifica se o resultado está correto
      expect(res.json).toHaveBeenCalledWith({
        status: {
          code: 409,
          error: 'Cliente já é cadastrado no sistema.'
        },
      });

    });
    test('Deve retornar um HTTP Status Code 500 e um Json com descrição do erro para erros desconhecidos', async () => {
      const mockClienteData = {
        id: 1,
        nome_cliente: "Construtora Alpha",
        telefone: "2198765432",
        email: "contato@construtoraalpha.com.br",
        cnpj: "12345678901234"
      };

      // Cria um Mock do objeto `req` 
      const req = { body: mockClienteData }; // Define o conteúdo do body passado no corpo da requisição

      // Cria um Mock do objeto `res`
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Define o comportamento esperado do mock da camada Service da entidade clientes
      mockClienteService.createCliente.mockRejectedValue(new InternalServerError('Não foi possível criar o cliente.'));

      // Verifica se a resposta do status HTTP está correto 
      await clienteController.createCliente(req, res)
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        status: {
          code: 500,
          error: 'Não foi possível criar o cliente.'
        },
      });

    });


  });
  describe('Testes para o método updateCliente()', () => {
    test('Deve invocar o método updataCliente da camada de serviço e atualizar um cliente', async () => {
      // Cria um Mock para a retorno do método getAllClientes() da camada de serviços.
      const mockClienteData = {
        nome_cliente: "Construtora Alpha",
        telefone: "2198765432",
        email: "contato@construtoraalpha.com.br",
        cnpj: "12345678901234",
      };


      const mockCliente = {
        nome_cliente: "Construtora Alpha",
        telefone: "2198765432",
        email: "contato@construtoraalpha.com.br",
        cnpj: "12345678901234",
        data_registro: "2023-06-16T15:10:48.000Z"
      };

      // Cria um Mock do objeto `req` 
      const req = {
        params: { id: 1 },
        body: mockClienteData
      };

      // Cria um Mock do objeto `res`
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Define o comportamento esperado do mock da camada Service da entidade clientes
      mockClienteService.updateCliente.mockResolvedValue(mockCliente);

      // Executa a chamada do Controller 
      await clienteController.updateCliente(req, res);

      // Verifica se a resposta do status HTTP está correto 
      expect(res.status).toHaveBeenCalledWith(200);
      // Verifica se o resultado está correto
      expect(res.json).toHaveBeenCalledWith({
        status: {
          code: 200,
          message: 'OK',
        },
        data: [mockCliente],
      });


    });
    test('Deve retornar um HTTP Status Code 404 e um Json com descrição do erro caso não encontre Clientes', async () => {
      // Cria um Mock do body da Requisição 
      const mockClienteData = {
        nome_cliente: "Construtora Alpha",
        telefone: "2198765432",
        email: "contato@construtoraalpha.com.br",
        cnpj: "12345678901234",
        data_registro: "2023-06-16T15:10:48.000Z"
      };

      // Cria um Mock do objeto `req`
      const req = {
        params: { id: 1 },
        body: mockClienteData
      };

      // Cria um Mock do objeto `res`
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Define o comportamento esperado do mock da camada Service da entidade clientes
      mockClienteService.getClienteById.mockRejectedValue(new NotFound('Cliente não encontrado.'));

      // Executa a chamada do Controller 
      await clienteController.getClienteById(req, res);

      // Verifica se o resultado está correto
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        status: {
          code: 404,
          error: 'Cliente não encontrado.'
        }
      });
    });
    test('Deve retornar um HTTP Status Code 500 e um Json com descrição do erro para erros desconhecidos', async () => {

      // Cria um Mock para a retorno do método getAllClientes() da camada de serviços.
      const mockClientes = [];
      // Cria um Mock do body da Requisição 
      const mockClienteData = {
        nome_cliente: "Construtora Alpha",
        telefone: "2198765432",
        email: "contato@construtoraalpha.com.br",
        cnpj: "12345678901234",
        data_registro: "2023-06-16T15:10:48.000Z"
      };

      // Cria um Mock do objeto `req` 
      const req = {
        params: { id: 1 },
        body: mockClienteData
      };

      // Cria um Mock do objeto `res`
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Define o comportamento esperado do mock da camada Service da entidade clientes
      mockClienteService.updateCliente.mockRejectedValue(mockClientes);

      // Executa a chamada do Controller 
      await clienteController.updateCliente(req, res);

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
  describe('Testes para o método deleteCliente()', () => {
    test('Deve invocar o método deleteCliente da camada de serviço e deletar um cliente', async () => {

      mockCliente = 1
      // Cria um Mock do objeto `req` 
      const req = { params: { id: 1 } }; // Define offset e limit como strings

      // Cria um Mock do objeto `res`
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Define o comportamento esperado do mock da camada Service da entidade clientes
      mockClienteService.deleteCliente.mockResolvedValue(mockCliente);

      // Executa a chamada do Controller 
      await clienteController.deleteCliente(req, res);

      // Verifica se a resposta do status HTTP está correto
      expect(res.status).toHaveBeenCalledWith(200);
      // Verifica se o resultado JSON passado no corpo da resposta está correto
      expect(res.json).toHaveBeenCalledWith({
        status:
        {
          code: 200,
          message: 'Cliente excluído com sucesso.'
        }
      });

    });
    test('Deve retornar um HTTP Status Code 404 e um Json com descrição do erro caso não encontre Clientes', async () => {

      // Cria um Mock do objeto `req` 
      const req = { params: { id: 1 } }; // Define offset e limit como strings

      // Cria um Mock do objeto `res`
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Define o comportamento esperado do mock da camada Service da entidade clientes
      mockClienteService.deleteCliente.mockRejectedValue(new NotFound('Cliente não encontrado.'));

      // Executa a chamada do Controller 
      await clienteController.deleteCliente(req, res);

      // Verifica se a resposta do status HTTP está correto
      expect(res.status).toHaveBeenCalledWith(404);
      // Verifica se o resultado JSON passado no corpo da resposta está correto
      expect(res.json).toHaveBeenCalledWith({
        status:
        {
          code: 404,
          error: 'Cliente não encontrado.'
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

      // Define o comportamento esperado do mock da camada Service da entidade clientes
      mockClienteService.deleteCliente.mockRejectedValue(new InternalServerError('Não foi possível atualizar o cliente.'));

      // Executa a chamada do Controller 
      await clienteController.deleteCliente(req, res);

      // Verifica se a resposta do status HTTP está correto
      expect(res.status).toHaveBeenCalledWith(500);
      // Verifica se o resultado JSON passado no corpo da resposta está correto
      expect(res.json).toHaveBeenCalledWith({
        status:
        {
          code: 500,
          error: 'Não foi possível atualizar o cliente.'
        }
      });

    });

  });


});