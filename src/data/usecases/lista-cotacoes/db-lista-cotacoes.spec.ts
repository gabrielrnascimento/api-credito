import { DbListaCotacoesRepositorioStub, mockModeloListaCotacoes } from '../../test';
import { DbListaCotacoes } from './db-lista-cotacoes';

type SutTypes = {
  sut: DbListaCotacoes
  dbListaCotacoesRepositorioStub: DbListaCotacoesRepositorioStub
};

const criaSut = (): SutTypes => {
  const dbListaCotacoesRepositorioStub = new DbListaCotacoesRepositorioStub();
  const sut = new DbListaCotacoes(dbListaCotacoesRepositorioStub);
  return {
    sut,
    dbListaCotacoesRepositorioStub
  };
};

describe('DbListaCotacoes', () => {
  test('deve chamar DbListaCotacoesRepositorio correamente', async () => {
    const { sut, dbListaCotacoesRepositorioStub } = criaSut();
    const listaSpy = jest.spyOn(dbListaCotacoesRepositorioStub, 'lista');

    await sut.lista();

    expect(listaSpy).toHaveBeenCalled();
  });

  test('deve lançar erro caso DbListaCotacoesRepositorio lance', async () => {
    const { sut, dbListaCotacoesRepositorioStub } = criaSut();
    const erro = new Error();
    jest.spyOn(dbListaCotacoesRepositorioStub, 'lista').mockRejectedValueOnce(erro);

    const promessa = sut.lista();

    await expect(promessa).rejects.toThrow(erro);
  });

  test('deve retornar lista de ModeloCotacao em caso de sucesso', async () => {
    const { sut } = criaSut();

    const resultado = await sut.lista();

    expect(resultado).toBe(mockModeloListaCotacoes);
  });
});
