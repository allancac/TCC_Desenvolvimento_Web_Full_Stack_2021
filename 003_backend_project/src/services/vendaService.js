const {
  BadRequest,           //400
  // Unauthorized,         //401
  // Forbidden,            //403
  Conflict,             //409
  NotFound,             //404
  InternalServerError,  //500
} = require('./serviceErrors');
const { Op } = require('sequelize');

const createVendaService = (Venda) => {
  // Função para obter todas os vendas
  const getAllVendas = async (offset = 0, limit = 10) => {
    try {
      if (offset >= 0 && limit >= 0) {
        const { count, rows } = await Venda.findAndCountAll(
          {
            include: ['produto', 'cliente'],
            offset: parseInt(offset),
            limit: parseInt(limit),
          }

        );
        if (rows) return { count, rows };
        throw new NotFound('Nenhuma venda encontrada.');
      }
      throw new BadRequest('Parâmetros inválidos.');
    } catch (error) {
      if (error instanceof NotFound || error instanceof BadRequest) throw error;
      throw new InternalServerError('Não foi possível listar as vendas.');
    }
  }

  // Buscar vendas por filtros (cliente, período, produto)
  const getVendaByFilter = async (cliente, periodo, produto) => {
    try {
      const filtros = {};
      if (cliente) {
        filtros.id_cliente = { [Op.eq]: `${cliente}` };
      }
      if (periodo !== "") {
        filtros.createdAt = { [Op.gt]: `%${periodo}%` };
      }
      if (produto !== "") {
        filtros.id_produto = { [Op.like]: `%${produto}%` };
      }
      const vendas = await Venda.findAll({
        include: ['usuario', 'produto', 'estoque', 'cliente', 'endereco'],
        where: filtros,
      });
      return vendas;
    } catch (error) {
      throw new InternalServerError('Não foi possível buscar as vendas.');
    }
  };

  // Obtém uma Venda pelo id
  const getVendaById = async (id) => {
    try {
      if (id !== null || id !== undefined) {
        const venda = await Venda.findByPk(id,
          {
            include: ['usuario', 'produto', 'estoque', 'cliente', 'endereco'],
          }
        );
        if (venda) return venda;
        throw new NotFound('Venda não encontrada.');
      }
      throw new BadRequest('Parâmetros inválidos.');
    } catch (error) {
      console.log(error)
      if (error instanceof NotFound || error instanceof BadRequest) throw error;
      throw new InternalServerError('Não foi possível buscar a Venda.');
    }
  }
  // Cria um novo Venda
  const createVenda = async (vendaData) => {
    try {
      const idExiste = await Venda.findByPk(vendaData.id);
      if (idExiste) throw new Conflict();
      const venda = await Venda.create(vendaData);
      if (venda) return venda;
      throw new Error();
    } catch (error) {
      if (error instanceof Conflict)
        throw new Conflict('Venda já cadastrado no sistema.');
      throw new InternalServerError('Não foi possível criar a Venda.')
    }
  }

  // Deleta um Venda pelo id
  const deleteVenda = async (id) => {
    try {
      const idExiste = await Venda.findByPk(id);
      if (idExiste) {
        const vendaApagada = await Venda.destroy({ where: { id } });
        if (vendaApagada) {
          return vendaApagada;
        } else {
          throw new Error();
        }
      } else {
        throw new NotFound('Venda não encontrada.');
      }
    } catch (error) {
      if (error instanceof NotFound) {
        throw error;
      } else {
        throw new InternalServerError('Não foi possível atualizar a Venda.');
      }
    }
  }

  return {
    getAllVendas,
    getVendaByFilter,
    getVendaById,
    createVenda,
    deleteVenda
  }

}

module.exports = createVendaService;
