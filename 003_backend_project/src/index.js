const express = require('express');
const app = express();

const { configureApp } = require('./config/app')
const { configureServer } = require('./config/server')
const { configureDatabase } = require('./config/database')

// Inicialização do servidor
const PORT = process.env.PORT || 5500;

// Sincronização do modelo com o banco de dados
const startServer = async () => {
  try {
    await configureServer(app)
    await configureApp(app);
    await configureDatabase()

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error('Erro ao conectar e sincronizar:', error);
  }
};

startServer();