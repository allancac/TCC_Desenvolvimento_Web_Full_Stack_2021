// Configuração do banco de dados
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('EMASA', 'DFEEMS001', 'Ubuntu@20', {
  host: 'localhost',
  dialect: 'mysql',
  define: {
    timestamps: false
  }
}
);

module.exports = sequelize;