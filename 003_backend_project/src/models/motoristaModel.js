const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Motorista', {
    cpf: {
      type: DataTypes.STRING(11),
      unique: true,
      allowNull: false,
      primaryKey: true,
      comment: 'CPF - Cadastro de Pessoa Fìsica do motorista.'
    },
    placa: {
      type: DataTypes.STRING(10),
      allowNull: false,
      comment: 'Uma string de até 10 caracteres que se refere à placa do veículo atribuído ao motorista. Este campo é opcional, pois um motorista pode não estar vinculado a um veículo.'
    },
    nome: {
      type: DataTypes.STRING(50),
      allowNull: false,
      comment: 'Uma string de até 50 caracteres que contém o nome do motorista.'
    },
    telefone: {
      type: DataTypes.STRING(15),
      allowNull: true,
      comment: 'Uma string de até 15 caracteres que contém o número de telefone do motorista.'
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: 'Uma string de até 50 caracteres que contém o endereço de e-mail do motorista.'
    }
  },
    {
      timestamps: true,
      engine: 'InnoDB',
      charset: 'utf8mb4',
      collate: 'utf8mb4_0900_ai_ci',
    });
}