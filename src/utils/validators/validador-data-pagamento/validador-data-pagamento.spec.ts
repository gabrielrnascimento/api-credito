import { ErroDataInvalida } from '../../errors';
import { ValidadorDataPagamento } from './validador.data-pagamento';

jest.useFakeTimers({ now: new Date(2023, 0, 1) });

type SutTypes = {
  sut: ValidadorDataPagamento
  campo: string
};

const criaSut = (): SutTypes => {
  const campo = 'qualquerCampo';
  const sut = new ValidadorDataPagamento(campo);
  return {
    sut,
    campo
  };
};

describe('ValidadorDataPagamento', () => {
  test('deve retornar ErroDataInvalida caso validaçao falhe', () => {
    const { sut, campo } = criaSut();
    const data = '2022-01-01';

    const erro = sut.valida({ [campo]: data });

    expect(erro).toEqual(new ErroDataInvalida());
  });
});
