import { ObjectId } from 'mongodb';
import { type EntradaEncontraPrecoDTO } from '../../../../data/dtos';
import { mockModeloEstado } from '../../../../data/test';
import { MongoUtil } from '../util/mongo-util';
import { seedEstados } from '../util/seeds';
import { EstadoRepositorio } from './estado-repositorio';
import { ErroEstadoNaoEncontrado } from '../../../../domain/errors';

type SutTypes = {
  sut: EstadoRepositorio
};

const criaSut = (db: MongoUtil): SutTypes => {
  const sut = new EstadoRepositorio(db);
  return { sut };
};

describe('EstadoRepositorio', () => {
  let db: MongoUtil;

  beforeAll(async () => {
    db = new MongoUtil();
    await db.conecta(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await db.desconecta();
  });

  beforeEach(async () => {
    await db.limpa('estados');
    await db.popula('estados', seedEstados);
  });

  test('deve retornar ModeloEstadoPreco em caso de sucesso', async () => {
    const { sut } = criaSut(db);

    const mockEntradaEncontraPrecoDTO: EntradaEncontraPrecoDTO = {
      uf: mockModeloEstado.uf
    };

    const resposta = await sut.encontraPreco(mockEntradaEncontraPrecoDTO);

    const { uf, preco } = seedEstados[0];

    expect(resposta).toEqual(expect.objectContaining({
      uf,
      preco,
      id: expect.any(ObjectId)
    }));
  });

  test('deve lançar ErroEstadoNaoEncontrado em caso de falha', async () => {
    const { sut } = criaSut(db);

    const mockEntradaEncontraPrecoDTO: EntradaEncontraPrecoDTO = {
      uf: 'RJ'
    };

    const promessa = sut.encontraPreco(mockEntradaEncontraPrecoDTO);

    await expect(promessa).rejects.toEqual(new ErroEstadoNaoEncontrado());
  });
});
