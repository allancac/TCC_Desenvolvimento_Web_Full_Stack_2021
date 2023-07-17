
// Configuração do banco de dados
const { Sequelize } = require('sequelize');
const schema = process.env.DBSCHEMA
const dbUser = process.env.DBUSER
const password = process.env.DBPASSWORD
const dbHost = process.env.DBHOST

//  BUG: TimeZone com erro
const configureDatabase = async () => {
  const sequelize = new Sequelize(schema, dbUser, password, {
    host: dbHost,
    dialect: 'mysql',
    timezone: "-03:00",
    logging: false
  }
  );
  return sequelize
}

module.exports = configureDatabase;