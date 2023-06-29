const express = require('express');
const app = express();
const Models = require('../models/index');  //Classe criadora de modelos

const configureApp = async (database) => {
  // Definição de todos os modelos do sistema
  const Modelos = new Models(database)

  // Classes dos Modelos que representam as entidades do sistema.
  const ClienteModel = Modelos.getClienteModel();
  const EnderecoModel = Modelos.getEnderecoModel();
  const VeiculoModel = Modelos.getVeiculoModel();
  const MotoristaModel = Modelos.getMotoristaModel();
  const VendaModel = Modelos.getVendaModel();
  const ProdutoModel = Modelos.getProdutoModel();
  const EstoqueModel = Modelos.getEstoqueModel();
  const UsuarioModel = Modelos.getUsuarioModel();


  // Injeção das dependências nas camadas da API
  //  CLIENTE
  const clienteService = require('../services/clienteService')(ClienteModel);
  const clienteController = require('../controllers/clienteController')(clienteService)
  const clienteRoutes = require('../routes/clienteRoutes')(clienteController);

  //  ENDEREÇO
  const enderecoService = require('../services/enderecoService')(EnderecoModel);
  const enderecoController = require('../controllers/enderecoController')(enderecoService)
  const enderecoRoutes = require('../routes/enderecoRoutes')(enderecoController);

  //  MOTORISTA
  const motoristaService = require('../services/motoristaService')(MotoristaModel);
  const motoristaController = require('../controllers/motoristaController')(motoristaService)
  const motoristaRoutes = require('../routes/motoristaRoutes')(motoristaController);

  //  VEÍCULO
  const veiculoService = require('../services/veiculosService')(VeiculoModel);
  const veiculoController = require('../controllers/veiculoController')(veiculoService)
  const veiculoRoutes = require('../routes/veiculoRoutes')(veiculoController);

  
  // PRODUTO
  const produtoService = require('../services/produtoService')(ProdutoModel);
  const produtoController = require('../controllers/produtoController')(produtoService)
  const produtoRoutes = require('../routes/produtoRoutes')(produtoController);

  // ESTOQUE
  const estoqueService = require('../services/estoqueService')(EstoqueModel);
  const estoqueController = require('../controllers/estoqueController')(estoqueService)
  const estoqueRoutes = require('../routes/estoqueRoutes')(estoqueController);
  
  // USUÁRIO
  const usuarioService = require('../services/usuarioService')(UsuarioModel);
  const usuarioController = require('../controllers/usuarioController')(usuarioService)
  const usuarioRoutes = require('../routes/usuarioRoutes')(usuarioController);
  
    //  VENDA
    const vendaService = require('../services/vendaService')(VendaModel);
    const vendaController = require('../controllers/vendaController')(vendaService)
    const vendaRoutes = require('../routes/vendaRoutes')(vendaController);
  



  // Configuração do body parser de Express para receber dados no formato JSON
  app.use(express.json());
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
  // Configuração das rotas
  app.use(
    [
      motoristaRoutes,
      clienteRoutes,
      enderecoRoutes,
      veiculoRoutes,
      vendaRoutes,
      produtoRoutes,
      estoqueRoutes,
      usuarioRoutes
    ]
  )
  // Retorna uma instância do Express com os Routers 
  return app;
}

module.exports = { configureApp }
