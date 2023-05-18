const serviceErrors = require('../services/serviceErrors');

const serviceResponseMiddleware = (req, res, next) => {
  const originalJson = res.json;
  res.json = function (data) {
    const getStatusMessage = code => {
      switch (code) {
        case 200:
          return "OK";
        case 201:
          return "Created";
        case 204:
          return "No Content";
        default:
          return "Error";
      }
    };

    const modifiedData = {
      code: res.statusCode || 200,
      status: getStatusMessage(res.statusCode),
      data: {
        offset: parseInt(req.query.offset), // Offset de registros
        limit: parseInt(req.query.limit) || 0, // Limite total de registros
        count: data.length || 0, // Total de registros retornados na requisição atual
        results: data,
      },
    };

    // Captura de erros personalizados
    res.sendError = function (error) {
      let code = 500;
      let status = 'Error';
      let message = 'Erro interno do servidor';

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

      originalJson.call(res, modifiedData);
    };

    // Chama a função originalJson para enviar a resposta
    originalJson.call(res, modifiedData);
  };

  // Chama o próximo middleware ou rota
  next();
};

module.exports = serviceResponseMiddleware;
