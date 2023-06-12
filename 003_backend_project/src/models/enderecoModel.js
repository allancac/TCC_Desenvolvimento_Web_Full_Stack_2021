const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('ENDERECOS', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      comment: 'Um número inteiro que identifica exclusivamente cada endereço.'
    },
    id_cliente: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: 'Um número inteiro que se refere ao ID do cliente ao qual o endereço pertence.'
    },
    logradouro: {
      type: DataTypes.STRING(50),
      allowNull: false,
      comment: 'Uma string de até 50 caracteres que contém o nome e número do logradouro do endereço.'
    },
    cidade: {
      type: DataTypes.STRING(50),
      allowNull: false,
      comment: 'Uma string de até 50 caracteres que contém o nome da cidade do endereço.'
    },
    estado: {
      type: DataTypes.STRING(2),
      allowNull: false,
      comment: 'Uma string de 2 caracteres que contém a sigla do estado do endereço.'
    },
    cep: {
      type: DataTypes.STRING(10),
      allowNull: false,
      comment: 'Uma string de até 10 caracteres que contém o CEP do endereço.'
    },
    tipo: {
      type: DataTypes.STRING(20),
      allowNull: false,
      comment: 'Uma string de até 20 caracteres que indica o tipo de endereço (ex: "Entrega", "Comercial").'
    },
    data_registro: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      comment: 'Uma data que representa a data em que o endereço foi registrado no sistema.'
    },
  }, {
    tableName: 'ENDERECOS',
    engine: 'InnoDB',
    charset: 'utf8mb4',
    collate: 'utf8mb4_0900_ai_ci'
  });
};
