class Models {
  constructor(sequelize) {
    // 1 - Definições do modelos
    this.Cliente = require('./clienteModel')(sequelize);
    this.Endereco = require('./enderecoModel')(sequelize);
    this.Veiculo = require('./veiculoModel')(sequelize);
    this.Motorista = require('./motoristaModel')(sequelize)
    this.Produto = require('./produtoModel')(sequelize);
    this.Estoque = require('./estoqueModel')(sequelize);
    this.Usuario = require('./usuarioModel')(sequelize);
    this.Venda = require('./vendaModel')(sequelize);

    // 2- Relações entre os modelos
    //   Cliente (1,1) - (1,n)Endereco
    this.Cliente.hasMany(this.Endereco, {
      foreignKey: 'id_cliente',
      as: 'enderecos'
    });
    this.Endereco.belongsTo(this.Cliente, {
      foreignKey: 'id_cliente',
      onDelete: 'CASCADE',
      as: 'clientes'
    });

    //   Cliente (0,1) - (1,n)Veículo
    this.Cliente.hasMany(this.Veiculo, {
      foreignKey: 'id_cliente',
      as: 'veiculos'
    });
    this.Veiculo.belongsTo(this.Cliente, {
      foreignKey: 'id_cliente',
      onDelete: 'SET NULL',
      as: 'clientes'
    });

    //   Veículo (1,1) - (1,n)Motorista
    this.Veiculo.hasMany(this.Motorista, {
      foreignKey: 'placa',
      as: 'motoristas'
    });
    this.Motorista.belongsTo(this.Veiculo, {
      foreignKey: 'placa',
      onDelete: 'CASCADE',
      as: 'veiculos'
    });

    this.Venda.belongsTo(this.Produto, {
      foreignKey: 'id_produto',
      as: 'produtos'
    });
    this.Venda.belongsTo(this.Estoque, {
      foreignKey: 'id_estoque',
      as: 'estoques'
    });

    this.Produto.hasMany(this.Venda, {
      foreignKey: 'id_produto',
      as: 'vendas'
    });
    this.Estoque.hasMany(this.Venda, {
      foreignKey: 'id_estoque',
      as: 'vendas'
    });

  }

  getMotoristaModel = () => this.Motorista
  getClienteModel = () => this.Cliente
  getEnderecoModel = () => this.Endereco
  getVeiculoModel = () => this.Veiculo
  getVendaModel = () => this.Venda;
  getProdutoModel = () => this.Produto;
  getEstoqueModel = () => this.Estoque;
  getUsuarioModel = () => this.Usuario;

}




module.exports = Models;