import { DbEncontraPrecoRepositorioStub, mockModeloEstado, mockModeloPreco } from '../../test';
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

  test('deve lançar erro se DbEncontraPrecoRepositorio lançar erro', async () => {
    const { sut, dbEncontraPrecoRepositorio } = criaSut();
    jest.spyOn(dbEncontraPrecoRepositorio, 'encontra').mockRejectedValueOnce(new Error());

    const resposta = sut.encontra(mockModeloEstado);

    await expect(resposta).rejects.toThrow(new Error());
  });

  test('deve retornar ModeloPreco em caso de sucesso', async () => {
    const { sut } = criaSut();

    const resposta = await sut.encontra(mockModeloEstado);

    expect(resposta).toBe(mockModeloPreco);
  });
});
