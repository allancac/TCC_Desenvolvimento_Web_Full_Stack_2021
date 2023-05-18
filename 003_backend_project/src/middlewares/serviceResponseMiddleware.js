const serviceErrors = require('../services/serviceErrors');

// Middleware para manipular a resposta da API
const serviceResponseMiddleware = (req, res, next) => {
  const originalJson = res.json;

  // Substitui a função json da resposta para modificar os dados de saída
  res.json = function (data) {
    const getStatusMessage = code => {
      switch (code) {
        case 200:
          return "ok";
        case 201:
          return "ok";
        case 204:
          return "ok";
        default:
          return "Error";
      }
    };

    const modifiedData = {
      code: res.statusCode || 200, // Código de status HTTP
      status: getStatusMessage(res.statusCode), // Mensagem de status
      data: {
        offset: parseInt(req.query.offset), // Offset de registros
        limit: parseInt(req.query.limit) || 0, // Limite total de registros
        count: data.length || 0, // Total de registros retornados na requisição atual
        results: data, // Resultados da requisição
      },
    };

    // Captura de erros personalizados
    res.sendError = function (error) {
      let code = 500;
      let status = 'Error';
      let message = 'Erro interno do servidor';

      // Verifica o tipo de erro personalizado para definir o código de status, mensagem e dados modificados
      if (error instanceof serviceErrors.BadRequest) {
        code = 400;
        message = error.message;
      } else if (error instanceof serviceErrors.Unauthorized) {
        code = 401;
        message = error.message;
      } else if (error instanceof serviceErrors.Forbidden) {
        code = 403;
        message = error.message;
      } else if (error instanceof serviceErrors.NotFound) {
        code = 404;
        message = error.message;
      } else if (error instanceof serviceErrors.Conflict) {
        code = 409;
        message = error.message;
      }

      const modifiedData = {
        code,
        status,
        error: message,
      };

      // Envia a resposta com os dados modificados do erro
      originalJson.call(res, modifiedData);
    };

    next();
  };
};

module.exports = serviceResponseMiddleware;
