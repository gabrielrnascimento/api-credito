import { DbCriaCotacaoRepositorioStub, mockEntradaCriaCotacaoDTO, mockEntradaDbCriaCotacaoRepositorioDTO, mockModeloCotacao } from '../../test';
import { DbCriaCotacao } from './db-cria-cotacao';

jest.useFakeTimers({ now: new Date('2023-07-26') });

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
  test('deve chamar DbCriaCotacaoRepositorio com os valores corretos', async () => {
    const { sut, dbCriaCotacaoRepositorioStub } = criaSut();
    const criaSpy = jest.spyOn(dbCriaCotacaoRepositorioStub, 'cria');
    await sut.cria(mockEntradaCriaCotacaoDTO);

    expect(criaSpy).toHaveBeenCalledWith(mockEntradaDbCriaCotacaoRepositorioDTO(new Date()));
  });

  test('deve lançar error caso DbCriaCotacaoRepositorio lance erro', async () => {
    const { sut, dbCriaCotacaoRepositorioStub } = criaSut();
    jest.spyOn(dbCriaCotacaoRepositorioStub, 'cria').mockRejectedValueOnce(new Error());
    const promessa = sut.cria(mockEntradaCriaCotacaoDTO);

    await expect(promessa).rejects.toThrow(new Error());
  });

  test('deve retornar ModeloCotacao em caso de sucesso', async () => {
    const { sut } = criaSut();

    const resposta = await sut.cria(mockEntradaCriaCotacaoDTO);

    expect(resposta).toBe(mockModeloCotacao);
  });
});
