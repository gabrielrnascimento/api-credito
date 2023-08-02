import { EncontraEstadoStub, mockRequisicaoHttpCriaCotacao } from '../test';
import { CotacaoControlador } from './cotacao-controlador';

type SutTypes = {
  sut: CotacaoControlador
  encontraEstadoStub: EncontraEstadoStub
};

const criaSut = (): SutTypes => {
  const encontraEstadoStub = new EncontraEstadoStub();
  const sut = new CotacaoControlador(encontraEstadoStub);
  return {
    sut,
    encontraEstadoStub
  };
};

describe('CotacaoControlador', () => {
  test('deve chamar EncontraEstado com os valores corretos', async () => {
    const { sut, encontraEstadoStub } = criaSut();
    const encontraEstadoSpy = jest.spyOn(encontraEstadoStub, 'encontraEstado');

    await sut.trate(mockRequisicaoHttpCriaCotacao);

    expect(encontraEstadoSpy).toHaveBeenCalledWith({
      cep: mockRequisicaoHttpCriaCotacao.body.cep
    });
  });
});
