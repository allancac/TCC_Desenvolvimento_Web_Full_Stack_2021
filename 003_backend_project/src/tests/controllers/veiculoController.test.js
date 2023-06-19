// importar as dependências usadas no Controller
const { NotFound, InternalServerError, Conflict } = require('../../services/serviceErrors');
VeiculoController = require('../../controllers/veiculoController')

describe('Testes da camada Controller da entidade Veiculos', () => {
  let mockVeiculoService;
  let veiculoController;

  beforeEach(() => {
    // Criação um mock para o a camada de Serviços da entidade veiculos
    mockVeiculoService = {
      getAllVeiculos: jest.fn(),
      getVeiculoByPlaca: jest.fn(),
      createVeiculo: jest.fn(),
      updateVeiculo: jest.fn(),
      deleteVeiculo: jest.fn(),
    };
    // Cria uma instância do Controller da entidade Veiculo. Também injeta a dependência mockada
    veiculoController = VeiculoController(mockVeiculoService)
  });

  describe('Testes para o método getAllVeiculos()', () => {
    test('Deve invocar o médoto getAllVeiculos da camada de serviços e retornar um array de veiculos', async () => {
      // Cria um Mock da lista de Veiculos
      const mockVeiculos = [
        {
          placa: "ABC1234",
          id_cliente: 1,
          marca: "Scania",
          modelo: "R440",
          altura_cacamba: 0.80,
          largura_cacamba: 2.60,
          comprimento_cacamba: 7.80,
          data_registro: "2023-06-16T15:11:06.000Z"
        },
        {
          placa: "BCD6780",
          id_cliente: 15,
          marca: "Mercedes-Benz",
          modelo: "Actros 2653",
          altura_cacamba: 2.80,
          largura_cacamba: 2.70,
          comprimento_cacamba: 8.20,
          data_registro: "2023-06-16T15:11:10.000Z"
        }
      ];

      // Cria um Mock do objeto `req` 
      const req = { query: { offset: '0', limit: '10' } }; // Define offset e limit como strings

      // Cria um Mock do objeto `res`
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Define o comportamento esperado do mock da camada Service da entidade veiculos
      mockVeiculoService.getAllVeiculos.mockResolvedValue(mockVeiculos);

      // Executa a chamada do Controller 
      await veiculoController.getAllVeiculos(req, res);

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
          count: mockVeiculos.length,
        },
        data: mockVeiculos,
      });

    });
    test('Deve retornar um HTTP Status Code 404 e um Json com descrição do erro caso não encontre Veiculos', async () => {
      // Cria um Mock para a retorno do método getAllVeiculos() da camada de serviços.
      const mockVeiculos = [];

      // Cria um Mock do objeto `req` 
      const req = { query: { offset: '0', limit: '10' } }; // Define offset e limit como strings

      // Cria um Mock do objeto `res`
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Define o comportamento esperado do mock da camada Service da entidade veiculos
      mockVeiculoService.getAllVeiculos.mockResolvedValue(mockVeiculos);

      // Executa a chamada do Controller 
      await veiculoController.getAllVeiculos(req, res);

      // Verifica se o resultado está correto
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        status: {
          code: 404,
          error: 'Nenhum veiculo foi encontrado.'
        }
      });

    });
    test('Deve retornar um HTTP Status Code 500 e um Json com descrição do erro para erros desconhecidos', async () => {
      // Cria um Mock para a retorno do método getAllVeiculos() da camada de serviços.
      const mockVeiculos = [];

      // Cria um Mock do objeto `req` 
      const req = { query: { offset: '0', limit: '10' } }; // Define offset e limit como strings

      // Cria um Mock do objeto `res`
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Define o comportamento esperado do mock da camada Service da entidade veiculos
      mockVeiculoService.getAllVeiculos.mockRejectedValue(mockVeiculos);

      // Executa a chamada do Controller 
      await veiculoController.getAllVeiculos(req, res);

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
  describe('Testes para o método getVeiculoByPlaca()', () => {
    test('Deve invocar o método getVeiculoByPlaca da camada de serviço e retornar um array com o veiculo procurado', async () => {
      // Cria um Mock para a retorno do método getAllVeiculos() da camada de serviços.
      const mockVeiculo = [
        {
          placa: "ABC1234",
          id_cliente: 1,
          marca: "Scania",
          modelo: "R440",
          altura_cacamba: 0.80,
          largura_cacamba: 2.60,
          comprimento_cacamba: 7.80,
          data_registro: "2023-06-16T15:11:06.000Z"
        }
      ];

      // Cria um Mock do objeto `req` 
      const req = { params: { placa: "ABC1234" } };

      // Cria um Mock do objeto `res`
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Define o comportamento esperado do mock da camada Service da entidade veiculos
      mockVeiculoService.getVeiculoByPlaca.mockResolvedValue(mockVeiculo);

      // Executa a chamada do Controller 
      await veiculoController.getVeiculoByPlaca(req, res);

      // Verifica se a resposta do status HTTP está correto
      expect(res.status).toHaveBeenCalledWith(200);
      // Verifica se o resultado JSON passado no corpo da resposta está correto
      expect(res.json).toHaveBeenCalledWith({
        status:
        {
          code: 200,
          message: 'OK'
        },
        data: [mockVeiculo],
      });

    });
    test('Deve retornar um HTTP Status Code 404 e um Json com descrição do erro caso não encontre um Veiculo', async () => {

      // Cria um Mock do objeto `req` 
      const req = { params: { placa: "ABC1234" } }; // Define offset e limit como strings

      // Cria um Mock do objeto `res`
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Define o comportamento esperado do mock da camada Service da entidade veiculos
      mockVeiculoService.getVeiculoByPlaca.mockRejectedValue(new NotFound('Veiculo não encontrado.'));

      // Executa a chamada do Controller 
      await veiculoController.getVeiculoByPlaca(req, res);

      // Verifica se o resultado está correto
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        status: {
          code: 404,
          error: 'Veiculo não encontrado.'
        }
      });

    });
    test('Deve retornar um HTTP Status Code 500 e um Json com descrição do erro para erros desconhecidos', async () => {
      // Cria um Mock para a retorno do método getAllVeiculos() da camada de serviços.
      const mockVeiculo = [];

      // Cria um Mock do objeto `req` 
      const req = { params: { placa: "ABC1234" } }; // Define offset e limit como strings

      // Cria um Mock do objeto `res`
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Define o comportamento esperado do mock da camada Service da entidade veiculos
      mockVeiculoService.getVeiculoByPlaca.mockRejectedValue(mockVeiculo);

      // Executa a chamada do Controller 
      await veiculoController.getVeiculoByPlaca(req, res);

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
  describe('Testes para o método createVeiculo()', () => {
    test('Deve invocar o método createVeiculo da camada de serviço e criar um veiculo', async () => {
      // Cria um Mock para a retorno do método createVeiculo() da camada de serviços.
      const mockVeiculo = [
        {
          placa: "ABC1234",
          id_cliente: 1,
          marca: "Scania",
          modelo: "R440",
          altura_cacamba: 0.80,
          largura_cacamba: 2.60,
          comprimento_cacamba: 7.80,
          data_registro: "2023-06-16T15:11:06.000Z"
        }
      ];
      const mockVeiculoData = {
        placa: "ABC1234",
        id_cliente: 1,
        marca: "Scania",
        modelo: "R440",
        altura_cacamba: 0.80,
        largura_cacamba: 2.60,
        comprimento_cacamba: 7.80
      };

      // Cria um Mock do objeto `req` 
      const req = { body: mockVeiculoData }; // Define o conteúdo do body passado no corpo da requisição

      // Cria um Mock do objeto `res`
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Define o comportamento esperado do mock da camada Service da entidade veiculos
      mockVeiculoService.createVeiculo.mockResolvedValue(mockVeiculo);

      // Executa a chamada do Controller 
      await veiculoController.createVeiculo(req, res);

      // Verifica se a resposta do status HTTP está correto 
      expect(res.status).toHaveBeenCalledWith(200);
      // Verifica se o resultado está correto
      expect(res.json).toHaveBeenCalledWith({
        status: {
          code: 200,
          message: 'OK',
        },
        data: [mockVeiculo],
      });

    });
    test('Deve retornar um HTTP Status Code 409 e um Json com descrição do erro caso encontre um Veiculo já cadastrado', async () => {
      // Cria um Mock para a retorno do método createVeiculo() da camada de serviços.
      const mockVeiculoData = {
        placa: "ABC1234",
        id_cliente: 1,
        marca: "Scania",
        modelo: "R440",
        altura_cacamba: 0.80,
        largura_cacamba: 2.60,
        comprimento_cacamba: 7.80
      };
      // Cria um Mock do objeto `req` 
      const req = { body: mockVeiculoData }; // Define o conteúdo do body passado no corpo da requisição

      // Cria um Mock do objeto `res`
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Define o comportamento esperado do mock da camada Service da entidade veiculos
      mockVeiculoService.createVeiculo.mockRejectedValue(new Conflict('Veiculo já é cadastrado no sistema.'));

      // Executa a chamada do Controller 

      // Verifica se a resposta do status HTTP está correto 
      await veiculoController.createVeiculo(req, res)
      expect(res.status).toHaveBeenCalledWith(409);
      // Verifica se o resultado está correto
      expect(res.json).toHaveBeenCalledWith({
        status: {
          code: 409,
          error: 'Veiculo já é cadastrado no sistema.'
        },
      });

    });
    test('Deve retornar um HTTP Status Code 500 e um Json com descrição do erro para erros desconhecidos', async () => {
      const mockVeiculoData = {
        placa: "ABC1234",
        id_cliente: 1,
        marca: "Scania",
        modelo: "R440",
        altura_cacamba: 0.80,
        largura_cacamba: 2.60,
        comprimento_cacamba: 7.80
      };

      // Cria um Mock do objeto `req` 
      const req = { body: mockVeiculoData }; // Define o conteúdo do body passado no corpo da requisição

      // Cria um Mock do objeto `res`
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Define o comportamento esperado do mock da camada Service da entidade veiculos
      mockVeiculoService.createVeiculo.mockRejectedValue(new InternalServerError('Não foi possível criar o veiculo.'));

      // Verifica se a resposta do status HTTP está correto 
      await veiculoController.createVeiculo(req, res)
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        status: {
          code: 500,
          error: 'Não foi possível criar o veiculo.'
        },
      });

    });


  });
  describe('Testes para o método updateVeiculo()', () => {
    test('Deve invocar o método updataVeiculo da camada de serviço e atualizar um veiculo', async () => {
      // Cria um Mock para a retorno do método getAllVeiculos() da camada de serviços.
      const mockVeiculoData = {
        placa: "ABC1234",
        id_cliente: 1,
        marca: "Scania",
        modelo: "R440",
        altura_cacamba: 0.80,
        largura_cacamba: 2.60,
        comprimento_cacamba: 7.80,
      };


      const mockVeiculo = [
        {
          placa: "ABC1234",
          id_cliente: 1,
          marca: "Scania",
          modelo: "R440",
          altura_cacamba: 0.80,
          largura_cacamba: 2.60,
          comprimento_cacamba: 7.80,
          data_registro: "2023-06-16T15:11:06.000Z"
        }];

      // Cria um Mock do objeto `req` 
      const req = {
        params: { placa: "ABC1234" },
        body: mockVeiculoData
      };

      // Cria um Mock do objeto `res`
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Define o comportamento esperado do mock da camada Service da entidade veiculos
      mockVeiculoService.updateVeiculo.mockResolvedValue(mockVeiculo);

      // Executa a chamada do Controller 
      await veiculoController.updateVeiculo(req, res);

      // Verifica se a resposta do status HTTP está correto 
      expect(res.status).toHaveBeenCalledWith(200);
      // Verifica se o resultado está correto
      expect(res.json).toHaveBeenCalledWith({
        status: {
          code: 200,
          message: 'OK',
        },
        data: [mockVeiculo],
      });


    });
    test('Deve retornar um HTTP Status Code 404 e um Json com descrição do erro caso não encontre Veiculos', async () => {
      // Cria um Mock do body da Requisição 
      const mockVeiculoData = {
        placa: "ABC1234",
        id_cliente: 1,
        marca: "Scania",
        modelo: "R440",
        altura_cacamba: 0.80,
        largura_cacamba: 2.60,
        comprimento_cacamba: 7.80,
      };

      // Cria um Mock do objeto `req`
      const req = {
        params: { placa: "ABC1234" },
        body: mockVeiculoData
      };

      // Cria um Mock do objeto `res`
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Define o comportamento esperado do mock da camada Service da entidade veiculos
      mockVeiculoService.getVeiculoByPlaca.mockRejectedValue(new NotFound('Veiculo não encontrado.'));

      // Executa a chamada do Controller 
      await veiculoController.getVeiculoByPlaca(req, res);

      // Verifica se o resultado está correto
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        status: {
          code: 404,
          error: 'Veiculo não encontrado.'
        }
      });
    });
    test('Deve retornar um HTTP Status Code 500 e um Json com descrição do erro para erros desconhecidos', async () => {

      // Cria um Mock para a retorno do método getAllVeiculos() da camada de serviços.
      const mockVeiculos = [];
      // Cria um Mock do body da Requisição 
      const mockVeiculoData = {
        placa: "ABC1234",
        id_cliente: 1,
        marca: "Scania",
        modelo: "R440",
        altura_cacamba: 0.80,
        largura_cacamba: 2.60,
        comprimento_cacamba: 7.80,
      };

      // Cria um Mock do objeto `req` 
      const req = {
        params: { placa: "ABC1234" },
        body: mockVeiculoData
      };

      // Cria um Mock do objeto `res`
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Define o comportamento esperado do mock da camada Service da entidade veiculos
      mockVeiculoService.updateVeiculo.mockRejectedValue(mockVeiculos);

      // Executa a chamada do Controller 
      await veiculoController.updateVeiculo(req, res);

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
  describe('Testes para o método deleteVeiculo()', () => {
    test('Deve invocar o método deleteVeiculo da camada de serviço e deletar um veiculo', async () => {

      mockVeiculo = 1
      // Cria um Mock do objeto `req` 
      const req = { params: { placa: "ABC1234" } }; // Define offset e limit como strings

      // Cria um Mock do objeto `res`
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Define o comportamento esperado do mock da camada Service da entidade veiculos
      mockVeiculoService.deleteVeiculo.mockResolvedValue(mockVeiculo);

      // Executa a chamada do Controller 
      await veiculoController.deleteVeiculo(req, res);

      // Verifica se a resposta do status HTTP está correto
      expect(res.status).toHaveBeenCalledWith(200);
      // Verifica se o resultado JSON passado no corpo da resposta está correto
      expect(res.json).toHaveBeenCalledWith({
        status:
        {
          code: 200,
          message: 'Veiculo excluído com sucesso.'
        }
      });

    });
    test('Deve retornar um HTTP Status Code 404 e um Json com descrição do erro caso não encontre Veiculos', async () => {

      // Cria um Mock do objeto `req` 
      const req = { params: { placa: "ABC1234" } }; // Define offset e limit como strings

      // Cria um Mock do objeto `res`
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Define o comportamento esperado do mock da camada Service da entidade veiculos
      mockVeiculoService.deleteVeiculo.mockRejectedValue(new NotFound('Veiculo não encontrado.'));

      // Executa a chamada do Controller 
      await veiculoController.deleteVeiculo(req, res);

      // Verifica se a resposta do status HTTP está correto
      expect(res.status).toHaveBeenCalledWith(404);
      // Verifica se o resultado JSON passado no corpo da resposta está correto
      expect(res.json).toHaveBeenCalledWith({
        status:
        {
          code: 404,
          error: 'Veiculo não encontrado.'
        }
      });


    });
    test('Deve retornar um HTTP Status Code 500 e um Json com descrição do erro para erros desconhecidos', async () => {
      // Cria um Mock do objeto `req` 
      const req = { params: { placa: "ABC1234" } }; // Define offset e limit como strings

      // Cria um Mock do objeto `res`
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Define o comportamento esperado do mock da camada Service da entidade veiculos
      mockVeiculoService.deleteVeiculo.mockRejectedValue(new InternalServerError('Não foi possível atualizar o veiculo.'));

      // Executa a chamada do Controller 
      await veiculoController.deleteVeiculo(req, res);

      // Verifica se a resposta do status HTTP está correto
      expect(res.status).toHaveBeenCalledWith(500);
      // Verifica se o resultado JSON passado no corpo da resposta está correto
      expect(res.json).toHaveBeenCalledWith({
        status:
        {
          code: 500,
          error: 'Não foi possível atualizar o veiculo.'
        }
      });

    });

  });


});