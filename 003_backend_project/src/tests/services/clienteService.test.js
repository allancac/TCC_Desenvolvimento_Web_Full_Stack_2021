const createclienteService = require('../../services/clienteService')
const {
  BadRequest,           //400
  Conflict,             //409
  NotFound,             //404
  InternalServerError,  //500
} = require('../../services/serviceErrors');

describe('Testes da camada de Serviço de clientes', () => {
  let mockClienteModel;
  let clienteService;
  beforeEach(() => {
    // Criação um mock para o Model de clientes
    mockClienteModel = {
      findAll: jest.fn(),
      findByPk: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      destroy: jest.fn(),
    };

    // Criação uma nova instância do serviço de clientes com o mock do Model
    clienteService = createclienteService(mockClienteModel);
  });

  describe('Testes para o método getAllClientes()', () => {

    test('Deve retornar todos os veículo', async () => {
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
        },
      ];

      // Defina o comportamento esperado do mock do Model de clientes
      mockClienteModel.findAll.mockResolvedValue(mockClientes);

      // Executa a chamada de serviço
      const clientes = await clienteService.getAllClientes();

      // Verifica se o resultado está correto
      expect(clientes).toEqual(mockClientes);
    });
    test('Deve retornar um erro BadRequest caso receba um valor inválido para o parâmetro offset', async () => {
      const mockClientes = [];
      // Defina o comportamento esperado do mock do Model de clientes
      mockClienteModel.findAll.mockResolvedValue(mockClientes);
      const offset = -10;
      await expect(clienteService.getAllClientes(offset)).rejects.toThrowError(BadRequest);

    });
    test('Deve retornar um erro BadRequest caso receba um valor inválido para o parâmetro limit', async () => {
      const mockClientes = [];
      // Defina o comportamento esperado do mock do Model de clientes
      mockClienteModel.findAll.mockResolvedValue(mockClientes);
      const limit = -10;
      await expect(clienteService.getAllClientes(0, limit)).rejects.toThrowError(BadRequest);
    });
    test('Deve lançar um erro genérico "404" no try, caso não encontre clientes no Banco de Dados', async () => {
      const mockClientes = null;
      // Defina o comportamento esperado do mock do Model de clientes
      mockClienteModel.findAll.mockResolvedValue(mockClientes);
      await expect(clienteService.getAllClientes()).rejects.toThrowError(NotFound);
    });
    test('Deve lançar um erro "InternalServerError" no caso de um erro desconhecido', async () => {
      const mockClientes = [];
      // Defina o comportamento esperado do mock do Model de clientes
      mockClienteModel.findAll.mockRejectedValue(mockClientes);
      await expect(clienteService.getAllClientes()).rejects.toThrowError(InternalServerError);
    });
  });

  describe('Testes para o método getClienteById()', () => {
    test('Deve retornar um cliente pela id', async () => {
      const mockCliente = {
        id: 1,
        nome_cliente: "Construtora Alpha",
        telefone: "2198765432",
        email: "contato@construtoraalpha.com.br",
        cnpj: "12345678901234",
        data_registro: "2023-06-16T15:10:48.000Z"
      };
      const id = '1';

      // Defina o comportamento esperado do mock do Model de clientes
      mockClienteModel.findByPk.mockResolvedValue(mockCliente);

      // Executa a chamada de serviço
      const cliente = await clienteService.getClienteById(id);

      // Verifica se o resultado está correto
      expect(cliente).toEqual(mockCliente);
    });
    test('Deve lançar um erro genérico "404" no try, caso não encontre clientes no Banco de Dados', async () => {
      const mockCliente = null;
      const id = '1';
      // Defina o comportamento esperado do mock do Model de clientes
      mockClienteModel.findByPk.mockResolvedValue(mockCliente);
      await expect(clienteService.getClienteById(id)).rejects.toThrowError(NotFound);

    });
    test('Deve lançar um erro "InternalServerError" no caso de um erro desconhecido', async () => {
      const mockCliente = {};
      const id = '1';
      // Defina o comportamento esperado do mock do Model de clientes
      mockClienteModel.findByPk.mockRejectedValue(mockCliente);
      await expect(clienteService.getClienteById(id)).rejects.toThrowError(InternalServerError);
    });
  });

  describe('Testes para o método createCliente()', () => {
    test('Deve criar um novo cliente.', async () => {
      const clienteData = {
        id: 1,
        nome_cliente: "Construtora Alpha",
        telefone: "2198765432",
        email: "contato@construtoraalpha.com.br",
        cnpj: "12345678901234"
      };
      const mockClienteCriado = {
        id: 1,
        nome_cliente: "Construtora Alpha",
        telefone: "2198765432",
        email: "contato@construtoraalpha.com.br",
        cnpj: "12345678901234",
        data_registro: "2023-06-16T15:10:48.000Z"
      };

      // Defina o comportamento esperado do mock do Model de clientes
      mockClienteModel.findByPk.mockResolvedValue(null); // Simula idExiste = false
      mockClienteModel.create.mockResolvedValue(mockClienteCriado);

      // Executa a chamada de serviço
      const cliente = await clienteService.createCliente(clienteData);

      // Verifica se o resultado está correto
      expect(cliente).toEqual(mockClienteCriado);
    });
    test('Deve lançar um erro "Conflict" caso o cliente já exista', async () => {
      const clienteData = {
        id: 1,
        nome_cliente: "Construtora Alpha",
        telefone: "2198765432",
        email: "contato@construtoraalpha.com.br",
        cnpj: "12345678901234"
      };

      // Defina o comportamento esperado do mock do Model de clientes
      mockClienteModel.findByPk.mockResolvedValue(true);  // Simula idExiste = true

      // Chama a função createCliente e verifica se lança uma exceção Conflict
      expect(() => clienteService.createCliente(clienteData)).rejects.toThrowError(Conflict);

      // Verifica se a função do mock foi chamada corretamente
      expect(mockClienteModel.findByPk).toHaveBeenCalledTimes(1);
      expect(mockClienteModel.findByPk).toHaveBeenCalledWith(clienteData.id);
    });
    test('Deve lançar um erro "InternalServerError" no caso de um erro desconhecido', async () => {
      const clienteData = {
        id: 1,
        nome_cliente: "Construtora Alpha",
        telefone: "2198765432",
        email: "contato@construtoraalpha.com.br",
        cnpj: "12345678901234"
      };
      const mockCliente = null;
      // Defina o comportamento esperado do mock do Model de clientes
      mockClienteModel.findByPk.mockRejectedValue(mockCliente);

      // Chama a função createCliente e verifica se lança uma exceção InternalServerError
      await expect(clienteService.createCliente(clienteData)).rejects.toThrowError(InternalServerError);

      // Verifica se a função do mock foi chamada corretamente
      expect(mockClienteModel.findByPk).toHaveBeenCalledTimes(1);
      expect(mockClienteModel.findByPk).toHaveBeenCalledWith(clienteData.id);
    });
  });

  describe('Testes para o método updateCliente', () => {
    test('Deve atualizar um cliente existente', async () => {
      const id = '1';
      const clienteData = {
        id: 1,
        nome_cliente: "Construtora Alpha",
        telefone: "2198765432",
        email: "contato@construtoraalpha.com.br",
        cnpj: "12345678901234"
      };

      const mockClienteAtualizado = {
        id: 1,
        nome_cliente: "Construtora Alpha",
        telefone: "2198765432",
        email: "contato@construtoraalpha.com.br",
        cnpj: "12345678901234",
        data_registro: "2023-06-16T15:10:48.000Z"
      };

      // Defina o comportamento esperado do mock do Model de clientes
      mockClienteModel.findByPk.mockResolvedValue(true);  // Simula idExiste = true
      mockClienteModel.update.mockResolvedValue(mockClienteAtualizado); // Simula que a atualização foi bem-sucedida

      // // Executa a chamada de serviço
      const resultado = await clienteService.updateCliente(id, clienteData)
      expect(resultado).toEqual(clienteData);


    });
    test('Deve lançar um erro "NotFound" caso o cliente não seja encontrado', async () => {
      const id = '1';
      const mockCliente = null;

      // Defina o comportamento esperado do mock do Model de clientes
      mockClienteModel.findByPk.mockResolvedValue(mockCliente);

      // Chama a função deleteCliente e verifica se lança uma exceção NotFound
      await expect(clienteService.updateCliente(id)).rejects.toThrowError(NotFound);

      // Verifica se a função do mock foi chamada corretamente
      expect(mockClienteModel.findByPk).toHaveBeenCalledTimes(1);
      expect(mockClienteModel.findByPk).toHaveBeenCalledWith(id);
    });
    test('Deve lançar um erro "InternalServerError" no caso de um erro desconhecido', async () => {
      const id = '1';
      const mockCliente = {};

      // Defina o comportamento esperado do mock do Model de clientes
      mockClienteModel.findByPk.mockRejectedValue(mockCliente);

      // Chama a função deleteCliente e verifica se lança uma exceção InternalServerError
      await expect(clienteService.updateCliente(id)).rejects.toThrowError(InternalServerError);

      // Verifica se a função do mock foi chamada corretamente
      expect(mockClienteModel.findByPk).toHaveBeenCalledTimes(1);
      expect(mockClienteModel.findByPk).toHaveBeenCalledWith(id);

    });
  });

  // Teste para deleteCliente
  describe('Testes para o método deleteCliente', () => {
    test('Deve excluir um cliente existente', async () => {
      const id = '1';
      // Definição do comportamento esperado do mock do Model de clientes
      const mockCliente = {
        id: 1,
        nome_cliente: "Construtora Alpha",
        telefone: "2198765432",
        email: "contato@construtoraalpha.com.br",
        cnpj: "12345678901234",
        data_registro: "2023-06-16T15:10:48.000Z"
      }
      mockClienteModel.findByPk.mockResolvedValueOnce(mockCliente);
      mockClienteModel.destroy.mockResolvedValue(1); // Simula que a exclusão foi bem-sucedida

      // Executa a chamada de serviço
      const resultado = await clienteService.deleteCliente(id);
      expect(resultado).toEqual(1);
    });
    test('Deve lançar um erro "NotFound', async () => {
      const id = '1';
      const mockCliente = null;

      // Defina o comportamento esperado do mock do Model de clientes
      mockClienteModel.findByPk.mockResolvedValue(mockCliente);

      // Chama a função deleteCliente e verifica se lança uma exceção NotFound
      await expect(clienteService.deleteCliente(id)).rejects.toThrowError(NotFound);

      // Verifica se a função do mock foi chamada corretamente
      expect(mockClienteModel.findByPk).toHaveBeenCalledTimes(1);
      expect(mockClienteModel.findByPk).toHaveBeenCalledWith(id);
    });
    test('Deve lançar um erro "InternalServerError" no caso de um erro desconhecido', async () => {
      const id = '1';
      const mockCliente = {};

      // Defina o comportamento esperado do mock do Model de clientes
      mockClienteModel.findByPk.mockRejectedValue(mockCliente);

      // Chama a função deleteCliente e verifica se lança uma exceção InternalServerError
      await expect(clienteService.deleteCliente(id)).rejects.toThrowError(InternalServerError);

      // Verifica se a função do mock foi chamada corretamente
      expect(mockClienteModel.findByPk).toHaveBeenCalledTimes(1);
      expect(mockClienteModel.findByPk).toHaveBeenCalledWith(id);

    });
  });

});