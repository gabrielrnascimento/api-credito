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
    const encontraSpy = jest.spyOn(dbEncontraPrecoRepositorio, 'encontraPreco');

    await sut.encontraPreco(mockModeloEstado);

    expect(encontraSpy).toHaveBeenCalledWith({
      uf: mockModeloEstado.uf
    });
  });

  test('deve lançar erro se DbEncontraPrecoRepositorio lançar erro', async () => {
    const { sut, dbEncontraPrecoRepositorio } = criaSut();
    jest.spyOn(dbEncontraPrecoRepositorio, 'encontraPreco').mockRejectedValueOnce(new Error());

    const resposta = sut.encontraPreco(mockModeloEstado);

    await expect(resposta).rejects.toThrow(new Error());
  });

  test('deve retornar ModeloPreco em caso de sucesso', async () => {
    const { sut } = criaSut();

    const resposta = await sut.encontraPreco(mockModeloEstado);

    expect(resposta).toEqual(mockModeloPreco);
  });
});
