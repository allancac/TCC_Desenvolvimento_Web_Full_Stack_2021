class Models {
  //  FIXME: Inserir as relações entre os modelos dentro de cada Model
  //  FIXME: Alterar cada função de definição dos Models para Class
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

    // Venda (1,1) - (1,1)Produto
    this.Venda.belongsTo(this.Produto, {
      foreignKey: 'id_produto',
      as: 'produto'
    });
    this.Produto.hasOne(this.Venda, {
      foreignKey: 'id_produto',
      as: 'produto'
    });

    //   Venda (1,1) - (1,1)Estoque
    this.Venda.belongsTo(this.Estoque, {
      foreignKey: 'id_estoque',
      as: 'estoque'
    });
    this.Estoque.hasOne(this.Venda, {
      foreignKey: 'id_estoque',
      as: 'estoque'
    });

    //   Venda (1,1) - (1,1)Cliente
    this.Venda.belongsTo(this.Cliente, {
      foreignKey: 'id_cliente',
      as: 'cliente'
    });
    this.Cliente.hasOne(this.Venda, {
      foreignKey: 'id_cliente',
      as: 'cliente'
    });

    //   Venda (1,1) - (1,1)Endereço
    this.Venda.belongsTo(this.Endereco, {
      foreignKey: 'id_endereco',
      as: 'endereco'
    });
    this.Endereco.hasOne(this.Venda, {
      foreignKey: 'id_endereco',
      as: 'endereco'
    });

      // Venda (1,1) - (1,1)Usuário
    this.Venda.belongsTo(this.Usuario, {
      foreignKey: 'id_usuario',
      as: 'usuario'
    });
    this.Endereco.hasOne(this.Venda, {
      foreignKey: 'id_usuario',
      as: 'usuario'
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