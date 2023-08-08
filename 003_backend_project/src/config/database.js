const config = require('config')
// Configuração do banco de dados
const { Sequelize } = require('sequelize');
const dbSchema = config.get('database.schema')
const dbUser = config.get('database.user')
const password = config.get('database.password')
const dbHost = config.get('database.host')

//  BUG: TimeZone com erro
const configureDatabase = async () => {
  const sequelize = new Sequelize(dbSchema, dbUser, password, {
    host: dbHost,
    dialect: 'mysql',
    timezone: "-03:00",
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false // You may need to set this to false if using a self-signed certificate
      }
    }
  }
  );
  return sequelize
}

module.exports = configureDatabase;