// Configuração do banco de dados
const { Sequelize } = require('sequelize');

const SCHEMA = process.env.SCHEMA || 'EMASA'
const user = /*process.env.USER || */'DFEEMS001'
const password = process.env.PASSWORD || 'Ubuntu@20'

const sequelize = new Sequelize(SCHEMA, user, password, {
  host: 'localhost',
  dialect: 'mysql',
  define: {
    timestamps: false
  }
}
);

module.exports = sequelize;