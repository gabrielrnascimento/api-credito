import { mockEntradaCalculaCreditoDTO, mockEntradaEncontraPrecoDTO } from '../../data/test';
import { ErroEstadoNaoEncontrado, ErroInesperado } from '../../domain/errors';
import { ErroNaoEncontrado, ErroRequisicaoInvalida } from '../errors';
import { CalculaCreditoStub, EncontraEstadoStub, EncontraPrecoStub, mockRequisicaoHttpCriaCotacao } from '../test';
import { erroServidor, naoEncontrado, requisicaoInvalida } from '../utils';
import { CotacaoControlador } from './cotacao-controlador';

type SutTypes = {
  sut: CotacaoControlador
  encontraEstadoStub: EncontraEstadoStub
  encontraPrecoStub: EncontraPrecoStub
  calculaCreditoStub: CalculaCreditoStub
};

const criaSut = (): SutTypes => {
  const encontraEstadoStub = new EncontraEstadoStub();
  const encontraPrecoStub = new EncontraPrecoStub();
  const calculaCreditoStub = new CalculaCreditoStub();
  const sut = new CotacaoControlador(encontraEstadoStub, encontraPrecoStub, calculaCreditoStub);
  return {
    sut,
    encontraEstadoStub,
    encontraPrecoStub,
    calculaCreditoStub
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

  test('deve chamar EncontraPreco com os valores corretos', async () => {
    const { sut, encontraPrecoStub } = criaSut();
    const encontraPrecoSpy = jest.spyOn(encontraPrecoStub, 'encontraPreco');

    await sut.trate(mockRequisicaoHttpCriaCotacao);

    expect(encontraPrecoSpy).toHaveBeenCalledWith({
      uf: mockEntradaEncontraPrecoDTO.uf
    });
  });

  test('deve retornar 404 caso EncontraPreco lance ErroEstadoNaoEncontrado', async () => {
    const { sut, encontraPrecoStub } = criaSut();
    const erro = new ErroEstadoNaoEncontrado();
    jest.spyOn(encontraPrecoStub, 'encontraPreco').mockRejectedValueOnce(erro);

    const resposta = await sut.trate(mockRequisicaoHttpCriaCotacao);

    expect(resposta).toEqual(naoEncontrado(erro));
  });

  test('deve chamar CalculaCredito com os valores corretos', async () => {
    const { sut, calculaCreditoStub } = criaSut();
    const calculaSpy = jest.spyOn(calculaCreditoStub, 'calcula');

    await sut.trate(mockRequisicaoHttpCriaCotacao);

    expect(calculaSpy).toHaveBeenCalledWith(mockEntradaCalculaCreditoDTO);
  });
});
