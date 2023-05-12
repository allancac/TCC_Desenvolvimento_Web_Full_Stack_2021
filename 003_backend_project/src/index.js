const express = require('express');
const sequelize = require('./config/database');
const clienteRoutes = require('./routes/clienteRoutes');




// Definição das rotas da API
const app = express();

// Configuração do body parser para receber dados no formato JSON
app.use(express.json());

// Configuração das rotas
app.use(clienteRoutes);


// Inicialização do servidor
const PORT = 5500;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

// Sincronização do modelo com o banco de dados
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão estabelecida com sucesso.');

    await sequelize.sync();
    console.log('As tabelas "CLIENTES", "VEICULOS", "MOTORISTAS" E "ENDERECOS" foram sincronizadas com o banco de dados.');
  } catch (error) {
    console.error('Erro ao conectar e sincronizar:', error);
  }
})();