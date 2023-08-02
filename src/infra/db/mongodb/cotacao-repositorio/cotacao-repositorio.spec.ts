import { ObjectId } from 'mongodb';
import { MongoUtil } from '../util/mongo-util';
import { mockEntradaDbCriaCotacaoRepositorioDTO, mockModeloCotacao } from '../../../../data/test';
import { CotacaoRepositorio } from './cotacao-repositorio';

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

  test('deve retornar ModeloCotacao em caso de sucesso', async () => {
    const sut = new CotacaoRepositorio(db);

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
