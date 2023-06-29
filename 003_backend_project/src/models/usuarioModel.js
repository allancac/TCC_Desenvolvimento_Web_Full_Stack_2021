const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Usuario', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    senha: {
      type: DataTypes.STRING(100),
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
    perfil: {
      type: DataTypes.ENUM('vendedor', 'gerente', 'administrador'),
      allowNull: false
    },

  }),
  {
    timestamps: true,
    engine: 'InnoDB',
    charset: 'utf8mb4',
    collate: 'utf8mb4_0900_ai_ci',
    instanceMethods: {
      async generateHash(senha) {
        return await bcrypt.hash(senha, bcrypt.genSaltSync(8));
      },
      validPassword(senha) {
        return bcrypt.compare(senha, this.password);
      }
    }
  }

};