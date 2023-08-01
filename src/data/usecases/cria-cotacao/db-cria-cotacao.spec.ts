import { DbCriaCotacaoRepositorioStub, mockEntradaCriaCotacaoDTO } from '../../test/mock-cotacao';
import { DbCriaCotacao } from './db-cria-cotacao';

type SutTypes = {
  sut: DbCriaCotacao
  dbCriaCotacaoRepositorioStub: DbCriaCotacaoRepositorioStub
};

const criaSut = (): SutTypes => {
  const dbCriaCotacaoRepositorioStub = new DbCriaCotacaoRepositorioStub();
  const sut = new DbCriaCotacao(dbCriaCotacaoRepositorioStub);

  return {
    sut,
    dbCriaCotacaoRepositorioStub
  };
};

describe('DbCriaCotacao', () => {
  test('deve chamar DbCriaCotacaoRepositorioStub com os valores corretos', async () => {
    const { sut, dbCriaCotacaoRepositorioStub } = criaSut();
    const criaSpy = jest.spyOn(dbCriaCotacaoRepositorioStub, 'cria');
    await sut.cria(mockEntradaCriaCotacaoDTO);

    expect(criaSpy).toHaveBeenCalledWith(mockEntradaCriaCotacaoDTO);
  });
});
