const request = require('supertest');
const app = require('../tests/utils');

describe('Testes das rotas de Motoristas', () => {
  // Teste para a rota GET /motoristas
  it('Deve retornar a lista de motoristas', async () => {
    const res = await request(app).get('/api/motoristas');
    expect(res.statusCode).toEqual(200);
    expect(typeof res.body === 'object').toBe(true);
    // expect(Array.isArray(res.body)).toBe(true);
  });

  // Teste para a rota GET /motoristas/:CPF
  it('Deve retornar um motorista específico', async () => {
    const res = await request(app).get('/api/motoristas/09447813739');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('nome');
    expect(res.body).toHaveProperty('cpf', '09447813739');
  });

  // Teste para a rota POST /motoristas
  it('Deve criar um novo motorista', async () => {
    const novoMotorista = {
      cpf: "00011122233",
      placa: "DEF5678",
      nome: "Novo Usuario",
      telefone: "21999888777",
      email: "novo@gmail.com"

    };
    const res = await request(app).post('/api/motoristas').send(novoMotorista);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('cpf', '00011122233');
    expect(res.body).toHaveProperty('placa', 'DEF5678');
    expect(res.body).toHaveProperty('nome', 'Novo Usuario');
    expect(res.body).toHaveProperty('telefone', '21999888777');
    expect(res.body).toHaveProperty('email', 'novo@gmail.com');
    expect(res.body).toHaveProperty('dataRegistro');
  });

  // Teste para a rota PUT /motoristas/:CPF
  it('Deve atualizar um motorista existente', async () => {
    const motoristaAtualizado = {
      nome: 'Usuário Novo Alterado',
      // outros dados atualizados do motorista
    };
    const res = await request(app).put('/api/motoristas/00011122233').send(motoristaAtualizado);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('nome', 'Usuário Novo Alterado');
  });

  // Teste para a rota DELETE /motoristas/:CPF
  it('Deve excluir um motorista existente', async () => {
    const res = await request(app).delete('/api/motoristas/00011122233');
    expect(res.statusCode).toEqual(204);
  });
});
