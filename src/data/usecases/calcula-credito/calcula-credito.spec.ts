import { mockCalculoCredito, mockEntradaCalculaCreditoDTO } from '../../test/mock-calculo';
import { LocalCalculaCredito } from './calcula-credito';

jest.useFakeTimers({ now: new Date('2023-07-26') });

type SutTypes = {
  sut: LocalCalculaCredito
};

const criaSut = (): SutTypes => {
  const taxaJurosMensal = 0.02;
  const sut = new LocalCalculaCredito(taxaJurosMensal);
  return { sut };
};

describe('LocalCalculaCredito', () => {
  test('deve retornar o cálculo correto', () => {
    const { sut } = criaSut();

    const resultado = sut.calcula(mockEntradaCalculaCreditoDTO);

    expect(resultado).toEqual(mockCalculoCredito);
  });
});
