// Configuração do banco de dados
const { Sequelize } = require('sequelize');
const schema = process.env.SCHEMA || 'EMASA'
const dbUser = process.env.DBUSER || 'DFEEMS001'
const password = process.env.PASSWORD || 'Ubuntu@20'

const configureDatabase = async () => {
  const sequelize = new Sequelize(schema, dbUser, password, {
    host: 'localhost',
    dialect: 'mysql',
    timezone: '+00:00',
    define: {
      timestamps: false
    },
    logging: false
  }
  );
  return sequelize
}

module.exports = configureDatabase;