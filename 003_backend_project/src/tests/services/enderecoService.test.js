const createEnderecoService = require('../../services/enderecoService')
const {
  BadRequest,           //400
  Conflict,             //409
  NotFound,             //404
  InternalServerError,  //500
} = require('../../services/serviceErrors');

describe('Testes da camada de Serviço de enderecos', () => {
  let mockEnderecoModel;
  let enderecoService;
  beforeEach(() => {
    // Criação um mock para o Model de enderecos
    mockEnderecoModel = {
      findAll: jest.fn(),
      findByPk: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      destroy: jest.fn(),
    };

    // Criação uma nova instância do serviço de enderecos com a dependência do mock do Model
    enderecoService = createEnderecoService(mockEnderecoModel);
  });

  describe('Testes para o método getAllEnderecos()', () => {

    test('Deve retornar todos os endereço', async () => {
      // Dados mockados dos endereços
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
        }];
      // Comportamento esperado do método Mockado findAll()do Model de Endereços
      mockEnderecoModel.findAll.mockResolvedValue(mockEnderecos);

      // Chamada do Método
      const offset = 0;
      const limit = 10;

      // Verificação do resultado esperado
      await expect(enderecoService.getAllEnderecos(offset, limit)).resolves.toEqual(mockEnderecos)
      // Verificação da chamada do método findAll e seus parâmetros.
      expect(mockEnderecoModel.findAll).toHaveBeenCalledTimes(1);
      expect(mockEnderecoModel.findAll).toHaveBeenCalledWith({ "offset": 0, "limit": 10 });


    });
    test('Deve retornar um erro BadRequest caso receba um valor inválido para o parâmetro offset', async () => {
      // Dados mockados dos endereços
      const mockEnderecos = [];
      // Comportamento esperado do método Mockado findAll()do Model de Endereços
      mockEnderecoModel.findAll.mockResolvedValue(mockEnderecos);
      // Chamada do Método
      const offset = -10;
      const limit = 10;
      // Verificação do resultado de erro esperado
      await expect(enderecoService.getAllEnderecos(offset, limit)).rejects.toThrowError(BadRequest);

    });
    test('Deve retornar um erro BadRequest caso receba um valor inválido para o parâmetro limit', async () => {
      // Dados mockados dos endereços
      const mockEnderecos = [];
      // Comportamento esperado do método Mockado findAll()do Model de Endereços
      mockEnderecoModel.findAll.mockResolvedValue(mockEnderecos);
      // Chamada do Método
      const offset = 0;
      const limit = -10;
      // Verificação do resultado de erro esperado
      await expect(enderecoService.getAllEnderecos(offset, limit)).rejects.toThrowError(BadRequest);
    });
    test('Deve lançar um erro genérico "404" no try, caso não encontre enderecos no Banco de Dados', async () => {
      // Dados mockados dos endereços
      const mockEnderecos = null;
      // Comportamento esperado do método Mockado findAll()do Model de Endereços
      mockEnderecoModel.findAll.mockResolvedValue(mockEnderecos);
      // Chamada do Método e verificação do resultado de erro esperado
      await expect(enderecoService.getAllEnderecos()).rejects.toThrowError(NotFound);
    })
    test('Deve lançar um erro "InternalServerError" no caso de um erro desconhecido', async () => {
      // Dados mockados dos endereços
      const mockEnderecos = [];
      // Comportamento esperado do método Mockado findAll()do Model de Endereços
      mockEnderecoModel.findAll.mockRejectedValue(mockEnderecos);
      // Chamada do Método e verificação do resultado de erro esperado
      await expect(enderecoService.getAllEnderecos()).rejects.toThrowError(InternalServerError);
    });
  });

  describe('Testes para o método getEnderecoById()', () => {
    test('Deve retornar um endereco pelo id', async () => {
      const mockEndereco = {
        id: 1,
        id_cliente: 1,
        logradouro: "Rua A, 123",
        cidade: "Rio de Janeiro",
        estado: "RJ",
        cep: "20000-000",
        tipo: "Comercial",
        data_registro: "2023-06-16T15:10:57.000Z"
      };
      const id = '1';

      // Defina o comportamento esperado do mock do Model de enderecos
      mockEnderecoModel.findByPk.mockResolvedValue(mockEndereco);

      // Executa a chamada de serviço
      const endereco = await enderecoService.getEnderecoById(id);

      // Verifica se o resultado está correto
      expect(endereco).toEqual(mockEndereco);
    });
    test('Deve lançar um erro genérico "404" no try, caso não encontre enderecos no Banco de Dados', async () => {
      const mockEndereco = null;
      const id = '1';
      // Defina o comportamento esperado do mock do Model de enderecos
      mockEnderecoModel.findByPk.mockResolvedValue(mockEndereco);
      await expect(enderecoService.getEnderecoById(id)).rejects.toThrowError(NotFound);

    });
    test('Deve lançar um erro "InternalServerError" no caso de um erro desconhecido', async () => {
      const mockEndereco = {};
      const id = '1';
      // Defina o comportamento esperado do mock do Model de enderecos
      mockEnderecoModel.findByPk.mockRejectedValue(mockEndereco);
      await expect(enderecoService.getEnderecoById(id)).rejects.toThrowError(InternalServerError);
    });
  });

  describe('Testes para o método createEndereco()', () => {
    test('Deve criar um novo endereco.', async () => {
      const enderecoData = {
        id: 1,
        id_cliente: 1,
        logradouro: "Rua A, 123",
        cidade: "Rio de Janeiro",
        estado: "RJ",
        cep: "20000-000",
        tipo: "Comercial",
      };
      const mockEnderecoCriado = {
        id: 1,
        id_cliente: 1,
        logradouro: "Rua A, 123",
        cidade: "Rio de Janeiro",
        estado: "RJ",
        cep: "20000-000",
        tipo: "Comercial",
        data_registro: "2023-06-17T08:56:13.000Z"
      };

      // Defina o comportamento esperado do mock do Model de enderecos
      mockEnderecoModel.findByPk.mockResolvedValue(null); // Simula idExiste = false
      mockEnderecoModel.create.mockResolvedValue(mockEnderecoCriado);

      // Executa a chamada de serviço
      const endereco = await enderecoService.createEndereco(enderecoData);

      // Verifica se o resultado está correto
      expect(endereco).toEqual(mockEnderecoCriado);
    });
    test('Deve lançar um erro "Conflict" caso o endereco já exista', async () => {
      const enderecoData = {
        id: 1,
        id_cliente: 1,
        logradouro: "Rua A, 123",
        cidade: "Rio de Janeiro",
        estado: "RJ",
        cep: "20000-000",
        tipo: "Comercial",
      };

      // Defina o comportamento esperado do mock do Model de enderecos
      mockEnderecoModel.findByPk.mockResolvedValue(true);  // Simula idExiste = true

      // Chama a função createEndereco e verifica se lança uma exceção Conflict
      expect(() => enderecoService.createEndereco(enderecoData)).rejects.toThrowError(Conflict);

      // Verifica se a função do mock foi chamada corretamente
      expect(mockEnderecoModel.findByPk).toHaveBeenCalledTimes(1);
      expect(mockEnderecoModel.findByPk).toHaveBeenCalledWith(enderecoData.id);
    });
    test('Deve lançar um erro "InternalServerError" no caso de um erro desconhecido', async () => {
      const enderecoData = {
        id: 1,
        id_cliente: 1,
        logradouro: "Rua A, 123",
        cidade: "Rio de Janeiro",
        estado: "RJ",
        cep: "20000-000",
        tipo: "Comercial",
      };
      const mockEndereco = null;
      // Defina o comportamento esperado do mock do Model de enderecos
      mockEnderecoModel.findByPk.mockRejectedValue(mockEndereco);

      // Chama a função createEndereco e verifica se lança uma exceção InternalServerError
      await expect(enderecoService.createEndereco(enderecoData)).rejects.toThrowError(InternalServerError);

      // Verifica se a função do mock foi chamada corretamente
      expect(mockEnderecoModel.findByPk).toHaveBeenCalledTimes(1);
      expect(mockEnderecoModel.findByPk).toHaveBeenCalledWith(enderecoData.id);
    });
  });

  describe('Testes para o método updateEndereco', () => {
    test('Deve atualizar um endereco existente', async () => {
      const id = 1;
      const enderecoData = {
        id: 1,
        id_cliente: 1,
        logradouro: "Rua A, 123",
        cidade: "Rio de Janeiro",
        estado: "RJ",
        cep: "20000-000",
        tipo: "Comercial",
      };
      const mockEnderecoAtualizado = {
        id: 1,
        id_cliente: 1,
        logradouro: "Rua A, 123",
        cidade: "Rio de Janeiro",
        estado: "RJ",
        cep: "20000-000",
        tipo: "Comercial",
        data_registro: "2023-06-17T08:56:13.000Z"
      };

      // Defina o comportamento esperado do mock do Model de enderecos
      mockEnderecoModel.findByPk.mockResolvedValue(enderecoData);  // Simula idExiste = true
      mockEnderecoModel.update.mockResolvedValue(mockEnderecoAtualizado); // Simula que a atualização foi bem-sucedida

      // // Executa a chamada de serviço
      const resultado = await enderecoService.updateEndereco(id, enderecoData)
      expect(resultado).toEqual(enderecoData);


    });
    test('Deve lançar um erro "NotFound" caso o endereco não seja encontrado', async () => {
      const id = 1;
      const mockEndereco = null;

      // Defina o comportamento esperado do mock do Model de enderecos
      mockEnderecoModel.findByPk.mockResolvedValue(mockEndereco);

      // Chama a função deleteEndereco e verifica se lança uma exceção NotFound
      await expect(enderecoService.updateEndereco(id)).rejects.toThrowError(NotFound);

      // Verifica se a função do mock foi chamada corretamente
      expect(mockEnderecoModel.findByPk).toHaveBeenCalledTimes(1);
      expect(mockEnderecoModel.findByPk).toHaveBeenCalledWith(id);
    });
    test('Deve lançar um erro "InternalServerError" no caso de um erro desconhecido', async () => {
      const id = 1;
      const mockEndereco = {};

      // Defina o comportamento esperado do mock do Model de enderecos
      mockEnderecoModel.findByPk.mockRejectedValue(mockEndereco);

      // Chama a função deleteEndereco e verifica se lança uma exceção InternalServerError
      await expect(enderecoService.updateEndereco(id)).rejects.toThrowError(InternalServerError);

      // Verifica se a função do mock foi chamada corretamente
      expect(mockEnderecoModel.findByPk).toHaveBeenCalledTimes(1);
      expect(mockEnderecoModel.findByPk).toHaveBeenCalledWith(id);

    });
  });

  // Teste para deleteEndereco
  describe('Testes para o método deleteEndereco', () => {
    test('Deve excluir um endereco existente', async () => {
      const id = 1;
      // Definição do comportamento esperado do mock do Model de enderecos
      const mockEndereco = {
        id: 1,
        id_cliente: 1,
        logradouro: "Rua A, 123",
        cidade: "Rio de Janeiro",
        estado: "RJ",
        cep: "20000-000",
        tipo: "Comercial",
        data_registro: "2023-06-17T08:56:13.000Z"
      };
      mockEnderecoModel.findByPk.mockResolvedValueOnce(mockEndereco);
      mockEnderecoModel.destroy.mockResolvedValue(1); // Simula que a exclusão foi bem-sucedida

      // Executa a chamada de serviço
      const resultado = await enderecoService.deleteEndereco(id);
      expect(resultado).toEqual(1);
    });
    test('Deve lançar um erro "NotFound', async () => {
      const id = 1;
      const mockEndereco = null;

      // Defina o comportamento esperado do mock do Model de enderecos
      mockEnderecoModel.findByPk.mockResolvedValue(mockEndereco);

      // Chama a função deleteEndereco e verifica se lança uma exceção NotFound
      await expect(enderecoService.deleteEndereco(id)).rejects.toThrowError(NotFound);

      // Verifica se a função do mock foi chamada corretamente
      expect(mockEnderecoModel.findByPk).toHaveBeenCalledTimes(1);
      expect(mockEnderecoModel.findByPk).toHaveBeenCalledWith(id);
    });
    test('Deve lançar um erro "InternalServerError" no caso de um erro desconhecido', async () => {
      const id = 1;
      const mockEndereco = {};

      // Defina o comportamento esperado do mock do Model de enderecos
      mockEnderecoModel.findByPk.mockRejectedValue(mockEndereco);

      // Chama a função deleteEndereco e verifica se lança uma exceção InternalServerError
      await expect(enderecoService.deleteEndereco(id)).rejects.toThrowError(InternalServerError);

      // Verifica se a função do mock foi chamada corretamente
      expect(mockEnderecoModel.findByPk).toHaveBeenCalledTimes(1);
      expect(mockEnderecoModel.findByPk).toHaveBeenCalledWith(id);

    });
  });


});