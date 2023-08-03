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

const criaDataPagamento = (): string => {
  const dataAtual = new Date();
  const mesAtual = dataAtual.getMonth();
  const anoAtual = dataAtual.getFullYear();

  const mesPagamento = (mesAtual + 2) % 12;
  const anoPagamento = anoAtual + Math.floor((mesAtual + 2) / 12);

  const dataPagamento = new Date(dataAtual);
  dataPagamento.setMonth(mesPagamento);
  dataPagamento.setFullYear(anoPagamento);

  return dataPagamento.toISOString().split('T')[0];
};

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
        dataPagamento: criaDataPagamento()
      });

    expect(resposta.status).toBe(201);
    expect(resposta.body).toEqual({
      id: expect.any(String),
      nome: 'qualquer nome',
      estado: 'SP',
      quantidade: 10,
      valor: 10924.2,
      dataVencimento: criaDataPagamento()
    });
  });

  test('deve retornar 400 caso campo obrigatório não tenha sido fornecido (nome)', async () => {
    const resposta = await request(app)
      .post('/api/cotacao');

    expect(resposta.status).toBe(400);
    expect(resposta.body).toEqual({ erro: 'Faltando campo obrigatório: nome' });
  });

  test('deve retornar 400 caso campo obrigatório não tenha sido fornecido (cep)', async () => {
    const resposta = await request(app)
      .post('/api/cotacao')
      .send({
        nome: 'qualquer nome'
      });

    expect(resposta.status).toBe(400);
    expect(resposta.body).toEqual({ erro: 'Faltando campo obrigatório: cep' });
  });

  test('deve retornar 400 caso campo obrigatório não tenha sido fornecido (quantidade)', async () => {
    const resposta = await request(app)
      .post('/api/cotacao')
      .send({
        nome: 'qualquer nome',
        cep: '12401-410'
      });

    expect(resposta.status).toBe(400);
    expect(resposta.body).toEqual({ erro: 'Faltando campo obrigatório: quantidade' });
  });

  test('deve retornar 400 caso campo obrigatório não tenha sido fornecido (dataPagamento)', async () => {
    const resposta = await request(app)
      .post('/api/cotacao')
      .send({
        nome: 'qualquer nome',
        cep: '12401-410',
        quantidade: 10
      });

    expect(resposta.status).toBe(400);
    expect(resposta.body).toEqual({ erro: 'Faltando campo obrigatório: dataPagamento' });
  });

  test('deve retornar 400 caso data fornecida seja inválida', async () => {
    const resposta = await request(app)
      .post('/api/cotacao')
      .send({
        nome: 'qualquer nome',
        cep: '12401-410',
        quantidade: 10,
        dataPagamento: '2022-10-02'
      });

    expect(resposta.status).toBe(400);
    expect(resposta.body).toEqual({ erro: 'Data fornecida inválida' });
  });

  test('deve retornar 404 caso estado não esteja na base de dados', async () => {
    const resposta = await request(app)
      .post('/api/cotacao')
      .send({
        nome: 'qualquer nome',
        cep: '23898-810',
        quantidade: 10,
        dataPagamento: criaDataPagamento()
      });

    expect(resposta.status).toBe(404);
    expect(resposta.body).toEqual({ erro: 'Estado não encontrado na base de dados' });
  });
});
