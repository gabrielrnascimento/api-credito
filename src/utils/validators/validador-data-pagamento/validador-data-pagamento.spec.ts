import { ErroDataInvalida } from '../../errors';
import { ValidadorDataPagamento } from './validador.data-pagamento';

jest.useFakeTimers({ now: new Date(2023, 0, 1) });

describe('ValidadorDataPagamento', () => {
  test('deve retornar ErroDataInvalida caso validaçao falhe', () => {
    const campo = 'qualquerCampo';
    const data = '2022-01-01';
    const sut = new ValidadorDataPagamento(campo);

    const erro = sut.valida({ [campo]: data });

    expect(erro).toEqual(new ErroDataInvalida());
  });
});
