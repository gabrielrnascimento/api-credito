import { DbCriaCotacaoRepositorioStub, mockEntradaCriaCotacaoDTO } from '../../test/mock-cotacao';
import { DbCriaCotacao } from './db-cria-cotacao';

describe('DbCriaCotacao', () => {
  test('deve chamar DbCriaCotacaoRepositorioStub com os valores corretos', async () => {
    const dbCriaCotacaoRepositorioStub = new DbCriaCotacaoRepositorioStub();
    const criaSpy = jest.spyOn(dbCriaCotacaoRepositorioStub, 'cria');
    const sut = new DbCriaCotacao(dbCriaCotacaoRepositorioStub);

    await sut.cria(mockEntradaCriaCotacaoDTO);

    expect(criaSpy).toHaveBeenCalledWith(mockEntradaCriaCotacaoDTO);
  });
});
