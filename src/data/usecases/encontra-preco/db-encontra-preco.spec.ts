import { DbEncontraPrecoRepositorioStub, mockModeloEstado } from '../../test';
import { DbEncontraPreco } from './db-encontra-preco';

type SutTypes = {
  sut: DbEncontraPreco
  dbEncontraPrecoRepositorio: DbEncontraPrecoRepositorioStub
};

const criaSut = (): SutTypes => {
  const dbEncontraPrecoRepositorio = new DbEncontraPrecoRepositorioStub();
  const sut = new DbEncontraPreco(dbEncontraPrecoRepositorio);

  return {
    sut,
    dbEncontraPrecoRepositorio
  };
};

describe('DbEncontraPreco', () => {
  test('deve chamar DbEncontraPrecoRepositorio com os valores corretos', async () => {
    const { sut, dbEncontraPrecoRepositorio } = criaSut();
    const encontraSpy = jest.spyOn(dbEncontraPrecoRepositorio, 'encontra');

    await sut.encontra(mockModeloEstado);

    expect(encontraSpy).toHaveBeenCalledWith({
      uf: mockModeloEstado.uf
    });
  });
});
