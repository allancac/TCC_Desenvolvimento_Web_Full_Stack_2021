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

    this.Cliente.hasMany(this.Endereco, {
      foreignKey: 'id_cliente',
      as: 'Endereco'
    });

    this.Endereco.belongsTo(this.Cliente, {
      foreignKey: 'id_cliente',
      onDelete: 'CASCADE',
      as: 'Cliente'
    });

    this.Veiculo.belongsTo(this.Cliente, {
      foreignKey: 'id_cliente',
      onDelete: 'SET NULL',
      as: 'Cliente'
    });

    this.Motorista.belongsTo(this.Veiculo, {
      foreignKey: 'placa',
      onDelete: 'CASCADE',
      as: 'Veiculo'
    });


    this.Venda.belongsTo(this.Produto, {
      foreignKey: 'id_produto',
      as: 'Produto'
    });
    this.Venda.belongsTo(this.Estoque, {
      foreignKey: 'id_estoque',
      as: 'Estoque'
    });

    this.Produto.hasMany(this.Venda, {
      foreignKey: 'id_produto',
      as: 'Venda'
    });
    this.Estoque.hasMany(this.Venda, {
      foreignKey: 'id_estoque',
      as: 'Venda'
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