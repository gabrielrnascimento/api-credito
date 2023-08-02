import { EncontraEstadoStub, mockRequisicaoHttpCriaCotacao } from '../test';
import { CotacaoControlador } from './cotacao-controlador';

describe('CotacaoControlador', () => {
  test('deve chamar EncontraEstado com os valores corretos', async () => {
    const encontraEstadoStub = new EncontraEstadoStub();
    const encontraEstadoSpy = jest.spyOn(encontraEstadoStub, 'encontraEstado');
    const sut = new CotacaoControlador(encontraEstadoStub);

    await sut.trate(mockRequisicaoHttpCriaCotacao);

    expect(encontraEstadoSpy).toHaveBeenCalledWith({
      cep: mockRequisicaoHttpCriaCotacao.body.cep
    });
  });
});
