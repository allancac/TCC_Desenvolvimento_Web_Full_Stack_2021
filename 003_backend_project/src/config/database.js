// Configuração do banco de dados
const { Sequelize } = require('sequelize');


const schema = process.env.SCHEMA || 'EMASA'
const user = /*process.env.USER || */'DFEEMS001'
const password = process.env.PASSWORD || 'Ubuntu@20'

const sequelize = new Sequelize(schema, user, password, {
  host: 'localhost',
  dialect: 'mysql',
  define: {
    timestamps: false
  },
  logging: false
}

);
const configureDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão estabelecida com sucesso.');
    console.log('As tabelas "CLIENTES", "VEICULOS", "MOTORISTAS" E "ENDERECOS" foram sincronizadas com o banco de dados.');
    await sequelize.sync();

  } catch (error) {

  }
}

module.exports = { sequelize, configureDatabase };