const { param, query, body, validationResult } = require('express-validator');

const getAllVeiculosValidation = [
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
const getVeiculoByPlacaValidation = [
  param('placa')
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

const createVeiculoValidation = [
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

  body('altura_cacamba')
    .notEmpty().withMessage('A altura da caçamba é obrigatória.')
    .isNumeric().withMessage('A altura da caçamba deve conter um valor numérico.'),
  body('largura_cacamba')
    .notEmpty().withMessage('A largura da caçamba é obrigatória.')
    .isNumeric().withMessage('A largura da caçamba deve conter um valor numérico.'),
  body('comprimento_cacamba')
    .notEmpty().withMessage('O comprimento da caçamba é obrigatório.')
    .isNumeric().withMessage('O comprimento da caçamba deve conter um valor numérico.'),

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

const updateVeiculoValidation = [
  param('placa')
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


  body('altura_cacamba')
    .notEmpty().withMessage('A altura da caçamba é obrigatória.')
    .isNumeric().withMessage('A altura da caçamba deve conter um valor numérico.'),
  body('largura_cacamba')
    .notEmpty().withMessage('A largura da caçamba é obrigatória.')
    .isNumeric().withMessage('A largura da caçamba deve conter um valor numérico.'),
  body('comprimento_cacamba')
    .notEmpty().withMessage('O comprimento da caçamba é obrigatório.')
    .isNumeric().withMessage('O comprimento da caçamba deve conter um valor numérico.'),


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


const deleteVeiculoValidation = [
  param('placa')
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
  getAllVeiculosValidation,
  getVeiculoByPlacaValidation,
  createVeiculoValidation,
  updateVeiculoValidation,
  deleteVeiculoValidation

};
