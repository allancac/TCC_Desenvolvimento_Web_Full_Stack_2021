const { param, query, body, validationResult } = require('express-validator');

const getAllMotoristasValidation = [
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
const getMotoristaByCPFValidation = [
  param('cpf')
    .notEmpty().withMessage('O CPF é obrigatório.')
    .isNumeric().withMessage('O CPF deve conter apenas números.')
    .isLength({ min: 11, max: 11 }).withMessage('O CPF deve ter 11 dígitos.'),

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

const createMotoristaValidation = [
  body('cpf')
    .notEmpty().withMessage('O CPF é obrigatório.')
    .isNumeric().withMessage('O CPF deve conter apenas números.')
    .isLength({ min: 11, max: 11 }).withMessage('O CPF deve ter 11 dígitos.'),
  body('placa')
    .notEmpty().withMessage('A placa do veículo é obrigatória.')
    .isLength({ min: 7, max: 7 }).withMessage('A placa do veículo deve ter 7 caracteres.')
    .custom((value) => {
      const placa = value.toUpperCase(); // Converter para letras maiúsculas
      const regras = [
        /^[A-Z]{3}\d{4}$/, // Formato ABC1234
        /^[A-Z]{3}\d{1}[A-Z]{1}\d{2}$/, // Formato ABC1D34
      ];
      for (const regra of regras) {
        if (regra.test(placa)) {
          return true;
        }
      }
      return false;
    }).withMessage('A placa do veículo é inválida.'),

  body('nome')
    .notEmpty().withMessage('O nome do motorista é obrigatório.')
    .isLength({ min: 3 }).withMessage('O nome do motorista não é válido'),

  body('telefone')
    .isNumeric().withMessage('O número de telefone deve conter apenas números.')
    .isLength({ min: 9, max: 11 }).withMessage('O número de telefone deve ter entre 9 e 11 dígitos.'),

  body('email')
    .isEmail().withMessage('O endereço de e-mail fornecido é inválido.'),

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

const updateMotoristaValidation = [
  param('cpf')
    .notEmpty().withMessage('O CPF é obrigatório.')
    .isNumeric().withMessage('O CPF deve conter apenas números.')
    .isLength({ min: 11, max: 11 }).withMessage('O CPF deve ter 11 dígitos.'),
  body('placa')
    .notEmpty().withMessage('A placa do veículo é obrigatória.')
    .isLength({ min: 7, max: 7 }).withMessage('A placa do veículo deve ter 7 caracteres.')
    .custom((value) => {
      const placa = value.toUpperCase(); // Converter para letras maiúsculas
      const regras = [
        /^[A-Z]{3}\d{4}$/, // Formato ABC1234
        /^[A-Z]{3}\d{1}[A-Z]{1}\d{2}$/, // Formato ABC1D34
      ];
      for (const regra of regras) {
        if (regra.test(placa)) {
          return true;
        }
      }
      return false;
    }).withMessage('A placa do veículo é inválida.'),

  body('nome')
    .notEmpty().withMessage('O nome do motorista é obrigatório.')
    .isLength({ min: 3 }).withMessage('O nome do motorista não é válido'),

  body('telefone')
    .isNumeric().withMessage('O número de telefone deve conter apenas números.')
    .isLength({ min: 9, max: 11 }).withMessage('O número de telefone deve ter entre 9 e 11 dígitos.'),

  body('email')
    .isEmail().withMessage('O endereço de e-mail fornecido é inválido.'),

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


const deleteMotoristaValidation = [
  param('cpf')
    .notEmpty().withMessage('O CPF é obrigatório.')
    .isNumeric().withMessage('O CPF deve conter apenas números.')
    .isLength({ min: 11, max: 11 }).withMessage('O CPF deve ter 11 dígitos.'),

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
  getAllMotoristasValidation,
  getMotoristaByCPFValidation,
  createMotoristaValidation,
  updateMotoristaValidation,
  deleteMotoristaValidation

};
