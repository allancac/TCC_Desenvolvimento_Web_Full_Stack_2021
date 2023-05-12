const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Definição dos modelo Cliente (tabela CLIENTES)
const Cliente = sequelize.define('CLIENTES', {
  ID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    comment: 'Um número inteiro que identifica exclusivamente cada cliente.'
  },
  NOME_CLIENTE: {
    type: DataTypes.STRING(50),
    allowNull: false,
    comment: 'Uma string de até 50 caracteres que contém o nome do cliente.'
  },
  TELEFONE: {
    type: DataTypes.STRING(10),
    allowNull: false,
    comment: 'Uma string de até 10 caracteres que contém o número de telefone do cliente.'
  },
  EMAIL: {
    type: DataTypes.STRING(40),
    allowNull: false,
    comment: 'Uma string de até 40 caracteres que contém o endereço de e-mail do cliente.'
  },
  CNPJ: {
    type: DataTypes.STRING(14),
    allowNull: false,
    comment: 'Uma string de 14 caracteres que contém o CNPJ do cliente.'
  },
  DATA_REGISTRO: {
    type: DataTypes.DATE,
    allowNull: false,
    comment: 'Uma data que representa a data em que o cliente foi registrado no sistema.'
  },

}, {
  tableName: 'CLIENTES',
  engine: 'InnoDB',
  charset: 'utf8mb4',
  collate: 'utf8mb4_0900_ai_ci'
});

module.exports = Cliente;