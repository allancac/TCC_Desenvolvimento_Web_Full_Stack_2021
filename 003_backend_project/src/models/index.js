class Models {
  constructor(sequelize) {
    // Definições do modelos
    this.Motorista = require('./motoristaModel')(sequelize)
    this.Endereco = require('./enderecoModel')(sequelize);
    this.Cliente = require('./clienteModel')(sequelize);
    this.Veiculo = require('./veiculoModel')(sequelize);

    // Relações entre os modelos
    this.Motorista.belongsTo(this.Veiculo, {
      foreignKey: 'placa',
      onDelete: 'CASCADE',
      as: 'veiculo'
    });
    this.Cliente.hasMany(this.Endereco, {
      foreignKey: 'id_cliente',
      as: 'enderecos'
    });
    this.Endereco.belongsTo(this.Cliente, {
      foreignKey: 'id_cliente',
      onDelete: 'CASCADE',
      as: 'cliente'
    });
    this.Veiculo.belongsTo(this.Cliente, {
      foreignKey: 'id_cliente',
      onDelete: 'SET NULL',
      as: 'cliente'
    });
  }
  getMotoristaModel = () => this.Motorista
  getClienteModel = () => this.Cliente
  getEnderecoModel = () => this.Endereco
  getVeiculoModel = () => this.Veiculo

}




module.exports = Models;