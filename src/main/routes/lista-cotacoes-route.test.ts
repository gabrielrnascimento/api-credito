import 'dotenv/config';
import request from 'supertest';
import { setupApp } from '../config/app';
import { type Express } from 'express';
import { seedCotacoes } from '../../infra/db/mongodb/util/seeds';
import { type Collection } from 'mongodb';
import { mongoUtilFactory } from '../factories/database';
import { mockSaidaListaCotacoes } from '../test';

let app: Express;
let cotacoesCollection: Collection;
const mongoUtil = mongoUtilFactory;

describe('ListaCotacoes', () => {
  beforeAll(async () => {
    app = setupApp();
    await mongoUtil.conecta(process.env.MONGO_URL);
    await mongoUtil.popula('cotacoes', seedCotacoes);
  });

  afterAll(async () => {
    cotacoesCollection = await mongoUtil.pegaCollection('cotacoes');
    await cotacoesCollection.deleteMany({});
    await mongoUtil.desconecta();
  });

  test('deve retornar 200 com os valores corretos', async () => {
    const resposta = await request(app)
      .get('/api/cotacoes');

    expect(resposta.status).toBe(200);
    expect(resposta.body).toEqual(mockSaidaListaCotacoes);
  });
});
