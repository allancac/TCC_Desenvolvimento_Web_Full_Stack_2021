const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Venda', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      comment: 'Um número inteiro que identifica exclusivamente cada venda. Este campo é autoincrementado. Exemplo 2023001'
    },
    id_produto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: 'Um número inteiro que se refere ao ID do produto vendido na tabela "EMASA.PRODUTOS".'
    },
    id_estoque: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: 'Um número inteiro que se refere ao ID do registro no estoque da tabela "EMASA.ESTOQUE". Identifica a origem de retirada do produto.'
    },
    id_cliente: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: 'Um número inteiro que se refere ao ID do cliente que fez a compra na tabela "EMASA.CLIENTES".'
    },
    id_endereco: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: 'Um número inteiro que se refere ao ID do endereço de entrega na tabela "EMASA.ENDERECOS".'
    },
    cpf_motorista: {
      type: DataTypes.STRING(11),
      allowNull: false,
      comment: 'Um número inteiro que se refere ao ID do motorista responsável pela entrega na tabela "EMASA.MOTORISTAS".'
    },
    placa: {
      type: DataTypes.STRING(10),
      allowNull: false,
      comment: 'Uma string de até 10 caracteres que se refere à placa do veículo que transportará o Produto.'
    },
    quantidade: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      comment: 'Um número decimal que indica o volume vendido de produtos em metros cúbicos.'
    },
    preco_total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      comment: 'Um número decimal que indica o preço de venda do produto.'
    },

  },
    {
      timestamps: true,
      engine: 'InnoDB',
      charset: 'utf8mb4',
      collate: 'utf8mb4_0900_ai_ci',
      indexes: [
        {
          name: 'FK_VENDA_PRODUTO',
          using: 'BTREE',
          fields: ['id_produto']
        },
        {
          name: 'FK_VENDA_CLIENTES',
          using: 'BTREE',
          fields: ['id_cliente']
        },
        {
          name: 'FK_VENDAS_ESTOQUE',
          using: 'BTREE',
          fields: ['id_estoque']
        },
        {
          name: 'ID_UNIQUE',
          using: 'BTREE',
          fields: ['id'],
          unique: true
        },
        {
          name: 'FK_VENDAS_ENDERECO_idx',
          using: 'BTREE',
          fields: ['id_endereco']
        },
        {
          name: 'FK_VENDAS_MOTORISTA_idx',
          using: 'BTREE',
          fields: ['cpf_motorista']
        },
        {
          name: 'FK_VENDAS_VEICULO_idx',
          using: 'BTREE',
          fields: ['placa']
        }
      ]
    });
}
