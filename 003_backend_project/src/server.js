const express = require('express');
const sequelize = require('./config/database');
const clienteRoutes = require('./routes/clienteRoutes');
const enderecoRoutes = require('./routes/enderecoRoutes');
const veiculoRoutes = require('./routes/veiculoRoutes');
const motoristaRoutes = require('./routes/motoristaRoutes');
const serviceResponseMiddleware = require('./middlewares/serviceResponseMiddleware');
// Definição das rotas da API
const app = express();

// Configuração do body parser para receber dados no formato JSON
app.use(express.json());

// Middleware para tratar respostas da camada Service
app.use(serviceResponseMiddleware);

// Configuração das rotas
app.use(clienteRoutes);
app.use(enderecoRoutes);
app.use(veiculoRoutes);
app.use(motoristaRoutes);

// Inicialização do servidor
const PORT = process.env.Port || 5500;


// Sincronização do modelo com o banco de dados
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão estabelecida com sucesso.');
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
    await sequelize.sync();
    console.log('As tabelas "CLIENTES", "VEICULOS", "MOTORISTAS" E "ENDERECOS" foram sincronizadas com o banco de dados.');
  } catch (error) {
    console.error('Erro ao conectar e sincronizar:', error);
  }
})();