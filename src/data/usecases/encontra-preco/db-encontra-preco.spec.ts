import { DbEncontraPrecoRepositorioStub, mockModeloEstado } from '../../test';
import { DbEncontraPreco } from './db-encontra-preco';

describe('DbEncontraPreco', () => {
  test('deve chamar DbEncontraPrecoRepositorio com os valores corretos', async () => {
    const dbEncontraPrecoRepositorio = new DbEncontraPrecoRepositorioStub();
    const sut = new DbEncontraPreco(dbEncontraPrecoRepositorio);
    const encontraSpy = jest.spyOn(dbEncontraPrecoRepositorio, 'encontra');

    await sut.encontra(mockModeloEstado);

    expect(encontraSpy).toHaveBeenCalledWith({
      uf: mockModeloEstado.uf
    });
  });
});
