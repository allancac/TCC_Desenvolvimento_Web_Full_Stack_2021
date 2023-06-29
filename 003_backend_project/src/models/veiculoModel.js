const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Veiculo', {
    placa: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: true,
      unique: true,
      comment: 'Uma string de até 10 caracteres que identifica exclusivamente cada veículo.'
    },
    id_cliente: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: 'Um número inteiro que se refere ao ID do cliente ao qual o veículo pertence. Este campo é opcional, pois um veículo pode não estar vinculado a um cliente.'
    },
    marca: {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: 'Uma string de até 50 caracteres que contém a marca do veículo.'
    },
    modelo: {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: 'Uma string de até 50 caracteres que contém o modelo do veículo.'
    },
    altura_cacamba: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      comment: 'Um número decimal que indica a altura da caçamba do veículo em metros.'
    },
    largura_cacamba: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      comment: 'Um número decimal que indica a largura da caçamba do veículo em metros.'
    },
    comprimento_cacamba: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      comment: 'Um número decimal que indica o comprimento da caçamba do veículo em metros.'
    },

  }, {
    timestamps: true,
    engine: 'InnoDB',
    charset: 'utf8mb4',
    collate: 'utf8mb4_0900_ai_ci'
  });
}
