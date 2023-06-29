const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Produto', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      comment: 'um número inteiro que identifica exclusivamente cada produto. Este campo é autoincrementado.'
    },
    nome: {
      type: DataTypes.STRING(30),
      allowNull: false,
      comment: 'Uma string de até 30 caracteres que contém o nome do produto.'
    },
    tipo: {
      type: DataTypes.STRING(30),
      allowNull: true,
      comment: 'Uma string de até 10 caracteres que contém o tipo de estoque.'
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: 'Uma string de texto que contém a descrição do produto. Este campo é opcional.'
    },
    preco: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      comment: 'Um número decimal que indica o preço do produto.'
    }
  },
    {
      timestamps: true,
      engine: 'InnoDB',
      charset: 'utf8mb4',
      collate: 'utf8mb4_0900_ai_ci'
    });
}
