const express = require('express');
const app = express();
const Models = require('../models/index');

const configureApp = async (database) => {

  // Definição de todos os modelos do sistema
  const Modelos = new Models(database)
  const clienteModel = Modelos.getClienteModel();
  const enderecoModel = Modelos.getEnderecoModel();
  const veiculoModel = Modelos.getVeiculoModel();
  const motoristaModel = Modelos.getMotoristaModel();

  // Injeção das dependências nas camadas da API
  const motoristaService = require('../services/motoristaService')(motoristaModel);
  const motoristaController = require('../controllers/motoristaController')(motoristaService)
  const motoristaRoutes = require('../routes/motoristaRoutes')(motoristaController);

  const clienteService = require('../services/clienteService')(clienteModel);
  const clienteController = require('../controllers/clienteController')(clienteService)
  const clienteRoutes = require('../routes/clienteRoutes')(clienteController);

  const enderecoService = require('../services/enderecoService')(enderecoModel);
  const enderecoController = require('../controllers/enderecoController')(enderecoService)
  const enderecoRoutes = require('../routes/enderecoRoutes')(enderecoController);

  const veiculoService = require('../services/veiculosService')(veiculoModel);
  const veiculoController = require('../controllers/veiculoController')(veiculoService)
  const veiculoRoutes = require('../routes/veiculoRoutes')(veiculoController);



  // Configuração do body parser de Express para receber dados no formato JSON
  app.use(express.json());

  // Configuração das rotas
  app.use(
    [
      motoristaRoutes,
      clienteRoutes,
      enderecoRoutes,
      veiculoRoutes,
    ]
  )
  // Retorna uma instância do Express com os Routers 
  return app;
}

module.exports = { configureApp }
