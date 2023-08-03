import { DbListaCotacoesRepositorioStub } from '../../test';
import { DbListaCotacoes } from './db-lista-cotacoes';

describe('DbListaCotacoes', () => {
  test('deve chamar DbListaCotacoesRepositorio correamente', async () => {
    const dbListaCotacoesRepositorioStub = new DbListaCotacoesRepositorioStub();
    const sut = new DbListaCotacoes(dbListaCotacoesRepositorioStub);
    const listaSpy = jest.spyOn(dbListaCotacoesRepositorioStub, 'lista');

    await sut.lista();

    expect(listaSpy).toHaveBeenCalled();
  });
});
