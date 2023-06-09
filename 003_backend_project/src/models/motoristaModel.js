const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Veiculo = require('./veiculoModel');

// Definição do modelo Motorista (tabela MOTORISTAS)
const Motorista = sequelize.define('MOTORISTAS', {
  cpf: {
    type: DataTypes.STRING(11),
    allowNull: false,
    primaryKey: true,
    comment: 'CPF - Cadastro de Pessoa Fìsica do motorista.'
  },
  placa: {
    type: DataTypes.STRING(10),
    allowNull: false,
    comment: 'Uma string de até 10 caracteres que se refere à placa do veículo atribuído ao motorista. Este campo é opcional, pois um motorista pode não estar vinculado a um veículo.'
  },
  nome: {
    type: DataTypes.STRING(50),
    allowNull: false,
    comment: 'Uma string de até 50 caracteres que contém o nome do motorista.'
  },
  telefone: {
    type: DataTypes.STRING(15),
    allowNull: true,
    comment: 'Uma string de até 15 caracteres que contém o número de telefone do motorista.'
  },
  email: {
    type: DataTypes.STRING(50),
    allowNull: true,
    comment: 'Uma string de até 50 caracteres que contém o endereço de e-mail do motorista.'
  },
  dataRegistro: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    comment: 'Data de registro do motorista'
  }
}, {
  tableName: 'MOTORISTAS',
  engine: 'InnoDB',
  charset: 'utf8mb4',
  collate: 'utf8mb4_0900_ai_ci'
});

// Definindo a relação entre as tabelas MOTORISTAS e VEICULOS
Motorista.belongsTo(Veiculo, {
  foreignKey: 'placa',
  onDelete: 'CASCADE',
  as: 'veiculo'
});


module.exports = Motorista;