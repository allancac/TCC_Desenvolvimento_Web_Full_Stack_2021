const express = require('express');
const app = express();
const Models = require('../models/index');  //Classe criadora de modelos
const morgan = require('morgan');
const passport = require('passport')
const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const  {isAuthenticated}  = require('../middleware/ensureAuthenticated')

//  TODO:Reafatorar em uma classe
module.exports = configureApp = async (database) => {

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


  //  TODO: Implementar uma biblioteca de contêiner de injeção de dependências, como o "InversifyJS" ou "Awilix"

  /******************************************************************************/
  /**************** Injeção das dependências nas camadas da API *****************/
  /******************************************************************************/

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

  //  AUTH
  const authRoutes = require('../routes/authRoutes')();

  /******************************************************************************/
  /*********************************** MIDDLEWARES ******************************/
  /******************************************************************************/

  // Configuração do módulo de sessão com SequelizeStore
  const sessionStore = new SequelizeStore({
    db: database,
  });

  // Middleware de Configuração do body parser de Express para receber dados no formato JSON
  app.use(express.json());

  // Middleware de codificação da url
  app.use(express.urlencoded({ extended: true }));

  // Middleware de de configuração do CORS - Cross Origin Resource Sharing
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
  });

  // Morgan middleware - Logs das requisições para o ambiente "dev"
  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
  }

  // Middleware para gerenciar as sessões.
  app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: sessionStore,
    })
  );

  // Passport config
  const passportSetup = require('./passport')(passport, UsuarioModel)

  // Middleware que inicializa o Passport e permite que ele gerencie a sessão do usuário
  app.use(passport.initialize());
  app.use(passport.session());


  /******************************************************************************/
  /************************************ ROTAS ***********************************/
  /******************************************************************************/
  // Configuração das rotas públcas
  app.use('/auth',authRoutes)

  // Configuração das rotas privadas
  app.use(isAuthenticated);
  app.use('/motoristas', motoristaRoutes);
  app.use('/clientes', clienteRoutes);
  app.use('/enderecos', enderecoRoutes);
  app.use('/veiculos', veiculoRoutes);
  app.use('/vendas', vendaRoutes);
  app.use('/produtos', produtoRoutes);
  app.use('/estoques', estoqueRoutes);
  app.use('/usuarios', usuarioRoutes);

  return app;
}