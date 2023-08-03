import { ListaCotacoesStub } from '../../test';
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
});
