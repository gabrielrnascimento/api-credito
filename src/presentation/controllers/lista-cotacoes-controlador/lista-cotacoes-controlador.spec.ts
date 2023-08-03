import { ListaCotacoesStub } from '../../test';
import { erroServidor, semConteudo } from '../../utils';
import { ListaCotacoesControlador } from './lista-cotacoes-controlador';

type SutTypes = {
  sut: ListaCotacoesControlador
  listaCotacoesStub: ListaCotacoesStub
};

const criaSut = (): SutTypes => {
  const listaCotacoesStub = new ListaCotacoesStub();
  const sut = new ListaCotacoesControlador(listaCotacoesStub);
  return {
    sut,
    listaCotacoesStub
  };
};

describe('ListaCotacoesControlador', () => {
  test('deve chamar ListaCotacoes corretamente', async () => {
    const { sut, listaCotacoesStub } = criaSut();
    const listaSpy = jest.spyOn(listaCotacoesStub, 'lista');

    await sut.trate();

    expect(listaSpy).toHaveBeenCalled();
  });

  test('deve retornar 500 caso ListaCotacoes lance um erro', async () => {
    const { sut, listaCotacoesStub } = criaSut();
    const erro = new Error();
    jest.spyOn(listaCotacoesStub, 'lista').mockRejectedValueOnce(erro);

    const resposta = await sut.trate();

    expect(resposta).toEqual(erroServidor(erro));
  });

  test('deve retornar 204 caso ListaCotacoes retorne uma lista vazia', async () => {
    const { sut, listaCotacoesStub } = criaSut();
    jest.spyOn(listaCotacoesStub, 'lista').mockResolvedValueOnce([]);

    const resposta = await sut.trate();

    expect(resposta).toEqual(semConteudo());
  });
});
