import { type EntradaCalculaCreditoDTO } from '../../dtos';
import { LocalCalculaCredito } from './calcula-credito';

jest.useFakeTimers({ now: new Date('2023-07-26') });

describe('LocalCalculaCredito', () => {
  test('deve retornar o cálculo correto', () => {
    const mockEntradaCalculaCreditoDTO: EntradaCalculaCreditoDTO = {
      valorUnitario: 1050,
      quantidade: 10,
      dataPagamento: new Date(2023, 8, 26)
    };

    const resultadoEsperado = 10924.20;

    const taxaJurosMensal = 0.02;
    const sut = new LocalCalculaCredito(taxaJurosMensal);

    const resultado = sut.calcula(mockEntradaCalculaCreditoDTO);

    expect(resultado).toEqual(resultadoEsperado);
  });
});
