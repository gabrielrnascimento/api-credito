import { ErroInesperado } from '../../domain/errors';
import { ErroNaoEncontrado, ErroRequisicaoInvalida } from '../errors';
import { EncontraEstadoStub, mockRequisicaoHttpCriaCotacao } from '../test';
import { erroServidor, naoEncontrado, requisicaoInvalida } from '../utils';
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

  test('deve retornar 400 caso EncontraEstado lance ErroRequisicaoInvalida', async () => {
    const { sut, encontraEstadoStub } = criaSut();
    const erro = new ErroRequisicaoInvalida();
    jest.spyOn(encontraEstadoStub, 'encontraEstado').mockRejectedValueOnce(erro);

    const resposta = await sut.trate(mockRequisicaoHttpCriaCotacao);

    expect(resposta).toEqual(requisicaoInvalida(erro));
  });

  test('deve retornar 404 caso EncontraEstado lance ErroNaoEncontrado', async () => {
    const { sut, encontraEstadoStub } = criaSut();
    const erro = new ErroNaoEncontrado();
    jest.spyOn(encontraEstadoStub, 'encontraEstado').mockRejectedValueOnce(erro);

    const resposta = await sut.trate(mockRequisicaoHttpCriaCotacao);

    expect(resposta).toEqual(naoEncontrado(erro));
  });

  test('deve retornar 500 caso EncontraEstado lance ErroInesperado', async () => {
    const { sut, encontraEstadoStub } = criaSut();
    const erro = new ErroInesperado();
    jest.spyOn(encontraEstadoStub, 'encontraEstado').mockRejectedValueOnce(erro);

    const resposta = await sut.trate(mockRequisicaoHttpCriaCotacao);

    expect(resposta).toEqual(erroServidor(erro));
  });
});
