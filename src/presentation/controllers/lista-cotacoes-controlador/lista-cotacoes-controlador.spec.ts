import { ListaCotacoesStub } from '../../test';
import { ListaCotacoesControlador } from './lista-cotacoes-controlador';

describe('ListaCotacoesControlador', () => {
  test('deve chamar ListaCotacoes corretamente', async () => {
    const listaCotacoesStub = new ListaCotacoesStub();
    const sut = new ListaCotacoesControlador(listaCotacoesStub);
    const listaSpy = jest.spyOn(listaCotacoesStub, 'lista');

    await sut.trate();

    expect(listaSpy).toHaveBeenCalled();
  });
});
