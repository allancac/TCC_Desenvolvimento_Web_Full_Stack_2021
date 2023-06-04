const Motorista = require('./motoristaModel')
const { DataTypes } = require('sequelize');

// Teste do model Motoristas
describe('Deve criar um modelo para a entidade Motorista', () => {

  describe('Deve Deve criar os definir os atributos da entidade Motorista', () => {
    describe('Deve criar um atributo do CPF', () => {
      const atributoCPF = Motorista.tableAttributes.cpf
      it('Deve ter o nome do campo "cpf"', () => {
        expect(atributoCPF.fieldName && atributoCPF.field).toBe('cpf');
      });
      it('Deve ser do Datatype String', () => {
        expect(atributoCPF.type instanceof DataTypes.STRING).toBe(true);
      });
      it('Deve ter um tamanho de 11 caracteres', () => {
        expect(atributoCPF.type.options).toEqual({ length: 11 });
      });
      it('Deve ser configurado para proibir valores nulos no campo CPF', () => {
        expect(atributoCPF.allowNull).toBe(false);
      });
      it('Deve ser configurado como chave primária', () => {
        expect(atributoCPF.primaryKey).toBe(true);
      });
      it('Deve ter um comentário descritivo do campo', () => {
        expect(typeof atributoCPF.comment === 'string').toBe(true);
      });

    });

    describe('Deve criar um atributo do placa', () => {
      const atributoPlaca = Motorista.tableAttributes.placa
      it('Deve ter o nome do campo "placa"', () => {
        expect(atributoPlaca.fieldName && atributoPlaca.field).toBe('placa');
      });
      it('Deve ser do Datatype String', () => {
        expect(atributoPlaca.type instanceof DataTypes.STRING).toBe(true);
      });
      it('Deve ter um tamanho de 10 caracteres', () => {
        expect(atributoPlaca.type.options).toEqual({ length: 10 });
      });
      it('Deve ser configurado para proibir valores nulos no campo placa', () => {
        expect(atributoPlaca.allowNull).toBe(false);
      });
      it('Deve ter um comentário descritivo do campo', () => {
        expect(typeof atributoPlaca.comment === 'string').toBe(true);
      });

    });

    describe('Deve criar um atributo do nome', () => {
      const atributoNome = Motorista.tableAttributes.nome
      it('Deve ter o nome do campo "nome"', () => {
        expect(atributoNome.fieldName && atributoNome.field).toBe('nome');
      });
      it('Deve ser do Datatype String', () => {
        expect(atributoNome.type instanceof DataTypes.STRING).toBe(true);
      });
      it('Deve ter um tamanho de 50 caracteres', () => {
        expect(atributoNome.type.options).toEqual({ length: 50 });
      });
      it('Deve ser configurado para proibir valores nulos no campo nome', () => {
        expect(atributoNome.allowNull).toBe(false);
      });
      it('Deve ter um comentário descritivo do campo', () => {
        expect(typeof atributoNome.comment === 'string').toBe(true);
      });

    });

    describe('Deve criar um atributo do telefone', () => {
      const atributoTelefone = Motorista.tableAttributes.telefone
      it('Deve ter o nome do campo "telefone"', () => {
        expect(atributoTelefone.fieldName && atributoTelefone.field).toBe('telefone');
      });
      it('Deve ser do Datatype String', () => {
        expect(atributoTelefone.type instanceof DataTypes.STRING).toBe(true);
      });
      it('Deve ter um tamanho de 15 caracteres', () => {
        expect(atributoTelefone.type.options).toEqual({ length: 15 });
      });
      it('Deve ser configurado para permitir valores nulos no campo telefone', () => {
        expect(atributoTelefone.allowNull).toBe(true);
      });
      it('Deve ter um comentário descritivo do campo', () => {
        expect(typeof atributoTelefone.comment === 'string').toBe(true);
      });

    });

    describe('Deve criar um atributo do email', () => {
      const atributoEmail = Motorista.tableAttributes.email
      it('Deve ter o nome do campo "email"', () => {
        expect(atributoEmail.fieldName && atributoEmail.field).toBe('email');
      });
      it('Deve ser do Datatype String', () => {
        expect(atributoEmail.type instanceof DataTypes.STRING).toBe(true);
      });
      it('Deve ter um tamanho de 50 caracteres', () => {
        expect(atributoEmail.type.options).toEqual({ length: 50 });
      });
      it('Deve ser configurado para permitir valores nulos no campo email', () => {
        expect(atributoEmail.allowNull).toBe(true);
      });
      it('Deve ter um comentário descritivo do campo', () => {
        expect(typeof atributoEmail.comment === 'string').toBe(true);
      });

    });

    describe('Deve criar um atributo da data de Registro', () => {
      const atributoDataRegistro = Motorista.tableAttributes.dataRegistro
      it('Deve ter o nome do campo "dataRegistro"', () => {
        expect(atributoDataRegistro.fieldName && atributoDataRegistro.field).toBe('dataRegistro');
      });
      it('Deve ser do Datatype Date', () => {
        expect(atributoDataRegistro.type instanceof DataTypes.DATE).toBe(true);
      });
      it('Deve ter o valor padrão Now', () => {
        expect(atributoDataRegistro.defaultValue instanceof DataTypes.NOW).toBe(true);
      });
      it('Deve ter um comentário descritivo do campo', () => {
        expect(typeof atributoDataRegistro.comment === 'string').toBe(true);
      });
    });

  });

  it('O nome da tabela definido deve ser "MOTORISTAS"', () => {
    const nomeTabela = Motorista.options.tableName;
    expect(nomeTabela).toBe('MOTORISTAS')
  });

  test('Deve ter uma associação do tipo "belongsTo" com a tabela veiculo', () => {
    const { associationType, foreignKey, as } = Motorista.associations.veiculo
    expect(associationType === 'BelongsTo').toBe(true)
    expect(foreignKey === 'placa').toBe(true)
    expect(as === 'veiculo').toBe(true)

  });

})
