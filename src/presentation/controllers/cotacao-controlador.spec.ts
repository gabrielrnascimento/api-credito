import { type EntradaEncontraPrecoDTO } from '../../data/dtos';
import { mockEntradaEncontraPrecoDTO, mockModeloPreco } from '../../data/test';
import { ErroInesperado } from '../../domain/errors';
import { type ModeloPreco } from '../../domain/models';
import { type EncontraPreco } from '../../domain/usecases';
import { ErroNaoEncontrado, ErroRequisicaoInvalida } from '../errors';
import { EncontraEstadoStub, mockRequisicaoHttpCriaCotacao } from '../test';
import { erroServidor, naoEncontrado, requisicaoInvalida } from '../utils';
import { CotacaoControlador } from './cotacao-controlador';

class EncontraPrecoStub implements EncontraPreco {
  async encontraPreco (dados: EntradaEncontraPrecoDTO): Promise<ModeloPreco> {
    return mockModeloPreco;
  }
}

type SutTypes = {
  sut: CotacaoControlador
  encontraEstadoStub: EncontraEstadoStub
  encontraPrecoStub: EncontraPrecoStub
};

const criaSut = (): SutTypes => {
  const encontraEstadoStub = new EncontraEstadoStub();
  const encontraPrecoStub = new EncontraPrecoStub();
  const sut = new CotacaoControlador(encontraEstadoStub, encontraPrecoStub);
  return {
    sut,
    encontraEstadoStub,
    encontraPrecoStub
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
});
