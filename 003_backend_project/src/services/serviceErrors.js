// Respostas de erro HTTP personalizadas

// Classe para o erro 400 - Bad Request
class BadRequest extends Error {
  constructor(message) {
    super(message);
    this.name = 'BadRequest'; // Nome do erro
  }
}

// Classe para o erro 401 - Unauthorized
class Unauthorized extends Error {
  constructor(message) {
    super(message);
    this.name = 'Unauthorized'; // Nome do erro
  }
}

// Classe para o erro 403 - Forbidden
class Forbidden extends Error {
  constructor(message) {
    super(message);
    this.name = 'Forbidden'; // Nome do erro
  }
}

// Classe para o erro 404 - Not Found
class NotFound extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFound'; // Nome do erro
  }
}

// Classe para o erro 500 - Internal Server Error
class InternalServerError extends Error {
  constructor(message) {
    super(message);
    this.name = 'InternalServerError'; // Nome do erro
  }
}

// Classe para o erro 409 - Conflict
class Conflict extends Error {
  constructor(message) {
    super(message);
    this.name = 'Conflict'; // Nome do erro
  }
}

module.exports = {
  BadRequest,
  Unauthorized,
  Forbidden,
  NotFound,
  InternalServerError,
  Conflict
};
