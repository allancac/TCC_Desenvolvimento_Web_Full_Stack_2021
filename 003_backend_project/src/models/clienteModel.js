const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Cliente', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      comment: 'Um número inteiro que identifica exclusivamente cada cliente.'
    },
    nome: {
      type: DataTypes.STRING(50),
      allowNull: false,
      comment: 'Uma string de até 50 caracteres que contém o nome do cliente.'
    },
    telefone: {
      type: DataTypes.STRING(11),
      allowNull: false,
      comment: 'Uma string de até 10 caracteres que contém o número de telefone do cliente.'
    },
    email: {
      type: DataTypes.STRING(40),
      allowNull: true,
      comment: 'Uma string de até 40 caracteres que contém o endereço de e-mail do cliente.'
    },
    cnpj: {
      type: DataTypes.STRING(14),
      allowNull: false,
      unique: true,
      comment: 'Uma string de 14 caracteres que contém o CNPJ do cliente.'
    },

  }, {
    timestamps: true,
    engine: 'InnoDB',
    charset: 'utf8mb4',
    collate: 'utf8mb4_0900_ai_ci'
  });

}
