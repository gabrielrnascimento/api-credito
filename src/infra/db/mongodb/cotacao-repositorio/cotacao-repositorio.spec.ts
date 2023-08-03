import { ObjectId } from 'mongodb';
import { MongoUtil } from '../util/mongo-util';
import { mockEntradaDbCriaCotacaoRepositorioDTO, mockModeloCotacao } from '../../../../data/test';
import { CotacaoRepositorio } from './cotacao-repositorio';
import { seedCotacoes } from '../util/seeds';

type SutTypes = {
  sut: CotacaoRepositorio
};

const criaSut = (db: MongoUtil): SutTypes => {
  const sut = new CotacaoRepositorio(db);
  return { sut };
};

describe('CotacaoRepositorio', () => {
  let db: MongoUtil;

  beforeAll(async () => {
    db = new MongoUtil();
    await db.conecta(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await db.desconecta();
  });

  beforeEach(async () => {
    await db.limpa('cotacoes');
  });

  describe('cria()', () => {
    test('deve retornar ModeloCotacao em caso de sucesso', async () => {
      const { sut } = criaSut(db);

      const dataAtual = new Date();

      const resposta = await sut.cria(mockEntradaDbCriaCotacaoRepositorioDTO(dataAtual));

      const { nome, estado, quantidade, valor, dataVencimento } = mockModeloCotacao;

      expect(resposta).toEqual({
        id: expect.any(ObjectId),
        nome,
        estado,
        quantidade,
        valor,
        dataCriacao: dataAtual,
        dataVencimento
      });
    });
  });

  describe('lista()', () => {
    test('deve retornar lista de ModeloCotacao com as 10 últimas cotações ordenadas por data de vencimento em ordem crescente em caso de sucesso', async () => {
      await db.popula('cotacoes', seedCotacoes);
      const mockCotacoes = seedCotacoes
        .sort((a: any, b: any) => b.dataCriacao - a.dataCriacao)
        .slice(0, 10)
        .sort((a: any, b: any) => a.dataVencimento - b.dataVencimento);
      const { sut } = criaSut(db);

      const resposta = await sut.lista();

      expect(resposta).toHaveLength(10);
      resposta.forEach((cotacao, index) => {
        expect(cotacao).toEqual({
          id: expect.any(ObjectId),
          nome: mockCotacoes[index].nome,
          estado: mockCotacoes[index].estado,
          quantidade: mockCotacoes[index].quantidade,
          valor: mockCotacoes[index].valor,
          dataCriacao: mockCotacoes[index].dataCriacao,
          dataVencimento: mockCotacoes[index].dataVencimento
        });
      });
    });
  });
});
