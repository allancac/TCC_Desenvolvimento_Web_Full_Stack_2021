const express = require('express');
const app = express();

class Model  {
  constructor(){}
  findAll() { return {} };
  findByPk() { return {} };
  create() { return {} };
  update() { return {} };
  destroy() { return {} };
}

// Definição de todos os modelos do sistema
const ClienteModel = undefined;
const EnderecoModel = undefined;
const VeiculoModel = undefined;
const MotoristaModel = undefined;

// Injeção das dependências nas camadas da API
const motoristaService = require('../services/motoristaService')(MotoristaModel);
const motoristaController = require('../controllers/motoristaController')(motoristaService)
const motoristaRoutes = require('../routes/motoristaRoutes')(motoristaController);

const clienteService = require('../services/clienteService')(ClienteModel);
const clienteController = require('../controllers/clienteController')(clienteService)
const clienteRoutes = require('../routes/clienteRoutes')(clienteController);

const enderecoService = require('../services/enderecoService')(EnderecoModel);
const enderecoController = require('../controllers/enderecoController')(enderecoService)
const enderecoRoutes = require('../routes/enderecoRoutes')(enderecoController);

const veiculoService = require('../services/veiculosService')(VeiculoModel);
const veiculoController = require('../controllers/veiculoController')(veiculoService)
const veiculoRoutes = require('../routes/veiculoRoutes')(veiculoController);




app.use(express.json());
app.use('/api', motoristaRoutes);

module.exports = app;