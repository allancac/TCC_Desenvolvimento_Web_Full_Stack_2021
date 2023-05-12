const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Cliente = require('./clienteModel');

// Definição dos modelo Endereco (tabela ENDERECOS)
const Endereco = sequelize.define('ENDERECOS', {
  ID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    comment: 'Um número inteiro que identifica exclusivamente cada endereço.'
  },
  ID_CLIENTE: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: 'Um número inteiro que se refere ao ID do cliente ao qual o endereço pertence.'
  },
  LOGRADOURO: {
    type: DataTypes.STRING(50),
    allowNull: false,
    comment: 'Uma string de até 50 caracteres que contém o nome e número do logradouro do endereço.'
  },
  CIDADE: {
    type: DataTypes.STRING(50),
    allowNull: false,
    comment: 'Uma string de até 50 caracteres que contém o nome da cidade do endereço.'
  },
  ESTADO: {
    type: DataTypes.STRING(2),
    allowNull: false,
    comment: 'Uma string de 2 caracteres que contém a sigla do estado do endereço.'
  },
  CEP: {
    type: DataTypes.STRING(10),
    allowNull: false,
    comment: 'Uma string de até 10 caracteres que contém o CEP do endereço.'
  },
  TIPO: {
    type: DataTypes.STRING(20),
    allowNull: false,
    comment: 'Uma string de até 20 caracteres que indica o tipo de endereço (ex: "Entrega", "Comercial").'
  },
  DATA_REGISTRO: {
    type: DataTypes.DATE,
    allowNull: false,
    comment: 'Uma data que representa a data em que o endereço foi registrado no sistema.'
  }
}, {
  tableName: 'ENDERECOS',
  engine: 'InnoDB',
  charset: 'utf8mb4',
  collate: 'utf8mb4_0900_ai_ci'
});

// Definindo a relação entre as tabelas CLIENTES e ENDERECOS
Endereco.belongsTo(Cliente, {
  foreignKey: 'ID_CLIENTE',
  onDelete: 'CASCADE',
  as: 'cliente'
});


module.exports = Endereco;