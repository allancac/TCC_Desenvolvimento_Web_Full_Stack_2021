//  FIXME: Alerar todas importações de módulos de require para o import(ES6)
require('dotenv').config(); // Carregar variáveis de ambiente
const os = require('os')
const { configureApp } = require('./config/app')
const configureDatabase = require('./config/database')

// Sincronização do modelo com o banco de dados
const startServer = async () => {
  try {
    // Configuração do banco de dados MYSQL com uso do Sequelize
    const connection = await configureDatabase();

    // Configuração das rotas utilizdas no aplicativo
    const app = await configureApp(connection);

        try {
      await connection.authenticate();
      console.log(`Conexão com o Banco de Dados ${connection.config.host}:${connection.config.port} estabelecida com sucesso.`);
      await connection.sync(
        {
          // alter: true,
          // force: true
        }
      );
      console.log('Os Modelos foram sincronizados com o Banco de Dados.');
    } catch (error) {
      console.error('Erro ao conectar e sincronizar:', error);
      process.exit(1);
    }
    // Inicialização do servidor
    const port = process.env.PORT || 5500;
    const hostname = os.hostname
    const networkInterfaces = os.networkInterfaces();
    app.listen(port, () => {
      console.log(`Servidor rodando em ambiente "${process.env.NODE_ENV}" no host ${hostname} - ${networkInterfaces['eth0'][0].address}:${port}`);
    });
  } catch (error) {
    console.error('Erro ao iniciar o servidor:', error);
    process.exit(1);
  }
};

startServer();