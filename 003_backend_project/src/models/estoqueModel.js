const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Estoque', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      comment: 'Um número inteiro que identifica exclusivamente cada registro no estoque.  Este campo é autoincrementado.'
    },
    capacidade_maxima: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      comment: 'Um número decimal que indica a capacidade máxima de armazenamento do estoque em metros cúbicos.'
    },
    tipo_estoque: {
      type: DataTypes.STRING(45),
      comment: 'Define o tipo de estoque(pilha ou silo)'
    },
    localizacao: {
      type: DataTypes.STRING(45),
      allowNull: true,
      comment: 'Uma string de até 45 caracteres que indica a localização do estoque. Este campo é opcional.'
    },
    volume: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      comment: 'Um número decimal que indica o volume atual de produtos armazenados no estoque em metros cúbicos. Este campo é opcional.'
    },
    id_produto: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: 'Um número inteiro que se refere ao ID do produto na tabela "EMASA.PRODUTOS".'
    }

  },
    {
      timestamps: true,
      engine: 'InnoDB',
      charset: 'utf8mb4',
      collate: 'utf8mb4_0900_ai_ci',
      indexes: [
        {
          name: 'FK_ESTOQUE_PRODUTOS_idx',
          using: 'BTREE',
          fields: ['ID_PRODUTO']
        }
      ]
    });
}
