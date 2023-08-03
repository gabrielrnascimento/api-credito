import 'dotenv/config';
import request from 'supertest';
import { setupApp } from '../config/app';
import { type Express } from 'express';
import { seedEstados } from '../../infra/db/mongodb/util/seeds';
import { type Collection } from 'mongodb';
import { mongoUtilFactory } from '../factories/database';

let app: Express;
let cotacoesCollection: Collection;
const mongoUtil = mongoUtilFactory;

describe('CotacaoRoutes', () => {
  beforeAll(async () => {
    app = setupApp();
    await mongoUtil.conecta(process.env.MONGO_URL);
    await mongoUtil.popula('estados', seedEstados);
  });

  afterAll(async () => {
    await mongoUtil.desconecta();
  });

  beforeEach(async () => {
    cotacoesCollection = await mongoUtil.pegaCollection('cotacoes');
    await cotacoesCollection.deleteMany({});
  });

  test('deve retornar 201 com os valores corretos', async () => {
    const resposta = await request(app)
      .post('/api/cotacao')
      .send({
        nome: 'qualquer nome',
        cep: '12401-410',
        quantidade: 10,
        dataPagamento: '2023-10-02'
      });

    expect(resposta.status).toBe(201);
    expect(resposta.body).toEqual({
      id: expect.any(String),
      nome: 'qualquer nome',
      estado: 'SP',
      quantidade: 10,
      valor: 10924.2,
      dataVencimento: '2023-10-02'
    });
  });
});
