const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Usuario', {
    id: {
      type: Sequelize.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    nomeUsuario: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    nome: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    sobrenome: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    foto: {
      type: DataTypes.STRING(200),
    },
    ativo: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },
    senha: {
      type: DataTypes.STRING(100),
    },
    perfil: {
      type: DataTypes.ENUM('vendedor', 'gerente', 'administrador'),

    }
  },
    {
      timestamps: true,
      engine: 'InnoDB',
      charset: 'utf8mb4',
      collate: 'utf8mb4_0900_ai_ci',
    }
  )
};