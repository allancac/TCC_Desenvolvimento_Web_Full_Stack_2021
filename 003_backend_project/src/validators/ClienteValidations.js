const { param, query, body, validationResult } = require('express-validator');

const getAllClientesValidation = [
  query('offset').optional().isInt({ min: 0 }).withMessage('Offset deve ser um número inteiro e maior que 0'),
  query('limit').optional().isInt({ min: 10 }).withMessage('Limit deve ser um número inteiro e maior que 10'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: {
          code: 400,
          errors: errors.array()
        }
      });
    }
    next();
  },
];

const getClienteByIdValidation = [
  param('id')
    .notEmpty().withMessage('O ID é obrigatório.')
    .isNumeric().withMessage('O ID deve conter apenas números.'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: {
          code: 400,
          errors: errors.array()
        }

      });
    }
    next();
  },
];

const createClienteValidation = [
  body('nome')
    .notEmpty().withMessage('O nome do cliente é obrigatório.')
    .isLength({ min: 3, max: 50 }).withMessage('O nome do cliente deve ter entre até 50 caracteres.'),
  body('telefone')
    .isNumeric().withMessage('O número de telefone deve conter apenas números.')
    .isLength({ min: 10, max: 11 }).withMessage('O número de telefone deve ter 11 dígitos.'),
  body('email')
    .isEmail().withMessage('O endereço de e-mail fornecido é inválido.'),
  body('cnpj')
    .notEmpty().withMessage('O CNPJ é obrigatório.')
    .matches(/^\d{14}$/).withMessage('O CNPJ deve conter exatamente 14 dígitos numéricos.'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: {
          code: 400,
          errors: errors.array()
        }
      });
    }
    next();
  }
];

const updateClienteValidation = [
  param('id')
    .notEmpty().withMessage('O id é obrigatório.')
    .isNumeric().withMessage('O id deve conter apenas números.'),
  body('nome_cliente')
    .notEmpty().withMessage('O nome do cliente é obrigatório.')
    .isLength({ min: 3, max: 50 }).withMessage('O nome do cliente deve ter entre até 50 caracteres.'),
  body('telefone')
    .isNumeric().withMessage('O número de telefone deve conter apenas números.')
    .isLength({ min: 10, max: 11 }).withMessage('O número de telefone deve ter 11 dígitos.'),
  body('email')
    .isEmail().withMessage('O endereço de e-mail fornecido é inválido.'),
  body('cnpj')
    .notEmpty().withMessage('O CNPJ é obrigatório.')
    .matches(/^\d{14}$/).withMessage('O CNPJ deve conter exatamente 14 dígitos numéricos.'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: {
          code: 400,
          errors: errors.array()
        }
      });
    }
    next();
  }
];
const deleteClienteValidation = [
  param('id')
    .notEmpty().withMessage('O id é obrigatório.')
    .isNumeric().withMessage('O id deve conter apenas números.'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: {
          code: 400,
          errors: errors.array()
        }
      });
    }
    next();
  }
]


module.exports = {
  getAllClientesValidation,
  getClienteByIdValidation,
  createClienteValidation,
  updateClienteValidation,
  deleteClienteValidation

}