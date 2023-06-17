const { param, query, body, validationResult } = require('express-validator');

const getAllEnderecosValidation = [
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
const getEnderecoByIdValidation = [
  param('id')
    .notEmpty().withMessage('O id é obrigatório.')
    .isInt().withMessage('O id deve conter apenas números.'),

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

const createEnderecoValidation = [
  body('id')
    .notEmpty().withMessage('O id é obrigatório.')
    .isInt().withMessage('O id deve conter apenas números.')
    .isLength({ min: 1, max: 6 }).withMessage('O id deve ter 11 dígitos.'),

  body('id_cliente')
    .notEmpty().withMessage('O id_cliente é obrigatório.')
    .isInt().withMessage('O id_cliente deve conter apenas números.'),

  body('logradouro')
    .notEmpty().withMessage('O logradouro é obrigatório.')
    .isLength({ min: 1, max: 50 }).withMessage('O logradouro deve ter no máximo 50 caracteres.'),

  body('cidade')
    .notEmpty().withMessage('A cidade é obrigatória.')
    .isLength({ min: 1, max: 50 }).withMessage('A cidade deve ter no máximo 50 caracteres.'),

  body('estado')
    .notEmpty().withMessage('O estado é obrigatório.')
    .isLength({ min: 2, max: 2 }).withMessage('O estado deve ter 2 caracteres.'),

  body('cep')
    .notEmpty().withMessage('O CEP é obrigatório.')
    .isLength({ min: 1, max: 10 }).withMessage('O CEP deve ter no máximo 10 caracteres.'),

  body('tipo')
    .notEmpty().withMessage('O tipo é obrigatório.')
    .isLength({ min: 1, max: 20 }).withMessage('O tipo deve ter no máximo 20 caracteres.'),


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

const updateEnderecoValidation = [
  param('id')
    .notEmpty().withMessage('O id é obrigatório.')
    .isInt().withMessage('O id deve conter apenas números.')
    .isLength({ min: 1, max: 6 }).withMessage('O id deve ter 11 dígitos.'),

  body('id_cliente')
    .optional()
    .isInt().withMessage('O id_cliente deve conter apenas números.'),

  body('logradouro')
    .optional()
    .isLength({ min: 1, max: 50 }).withMessage('O logradouro deve ter no máximo 50 caracteres.'),

  body('cidade')
    .optional()
    .isLength({ min: 1, max: 50 }).withMessage('A cidade deve ter no máximo 50 caracteres.'),

  body('estado')
    .optional()
    .isLength({ min: 2, max: 2 }).withMessage('O estado deve ter 2 caracteres.'),

  body('cep')
    .optional()
    .isLength({ min: 1, max: 10 }).withMessage('O CEP deve ter no máximo 10 caracteres.'),

  body('tipo')
    .optional()
    .isLength({ min: 1, max: 20 }).withMessage('O tipo deve ter no máximo 20 caracteres.'),


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


const deleteEnderecoValidation = [
  param('id')
    .notEmpty().withMessage('O id é obrigatório.')
    .isInt().withMessage('O id deve conter apenas números.'),

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
  getAllEnderecosValidation,
  getEnderecoByIdValidation,
  createEnderecoValidation,
  updateEnderecoValidation,
  deleteEnderecoValidation

};
