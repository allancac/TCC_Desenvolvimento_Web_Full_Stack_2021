// Configuração das rotas
const clienteRoutes = require('../routes/clienteRoutes');
const enderecoRoutes = require('../routes/enderecoRoutes');
const veiculoRoutes = require('../routes/veiculoRoutes');
const motoristaRoutes = require('../routes/motoristaRoutes');

const configureApp = async (app) => {
  // Configuração das rotas
  app.use(clienteRoutes);
  app.use(enderecoRoutes);
  app.use(veiculoRoutes);
  app.use(motoristaRoutes);
}

module.exports = { configureApp }
