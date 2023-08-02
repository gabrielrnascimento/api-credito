import { type SaidaCriaCotacaoControladorDTO } from '../../../data/dtos';
import { mockEntradaEncontraPrecoDTO, mockEntradaCalculaCreditoDTO, mockEntradaCriaCotacaoDTO } from '../../../data/test';
import { ErroInesperado, ErroEstadoNaoEncontrado } from '../../../domain/errors';
import { ErroRequisicaoInvalida, ErroNaoEncontrado } from '../../errors';
import { EncontraEstadoStub, EncontraPrecoStub, CalculaCreditoStub, CriaCotacaoStub, mockRequisicaoHttpCriaCotacao, ValidadorStub } from '../../test';
import { requisicaoInvalida, naoEncontrado, erroServidor, criado } from '../../utils';
import { CriaCotacaoControlador } from './cria-cotacao-controlador';

const mockRequisicaoHttp: any = {
  body: {
    nome: 'qualquer nome',
    cep: '12401-410',
    quantidade: 10,
    dataPagamento: '2023-09-26'
  }
};

const mockSaidaCriaCotacao: SaidaCriaCotacaoControladorDTO = {
  id: 'qualquer_id',
  nome: 'qualquer nome',
  estado: 'SP',
  quantidade: 10,
  valor: 10924.2,
  dataVencimento: '2023-09-26'
};

type SutTypes = {
  sut: CriaCotacaoControlador
  encontraEstadoStub: EncontraEstadoStub
  encontraPrecoStub: EncontraPrecoStub
  calculaCreditoStub: CalculaCreditoStub
  criaCotacaoStub: CriaCotacaoStub
  validadorStub: ValidadorStub
};

const criaSut = (): SutTypes => {
  const encontraEstadoStub = new EncontraEstadoStub();
  const encontraPrecoStub = new EncontraPrecoStub();
  const calculaCreditoStub = new CalculaCreditoStub();
  const criaCotacaoStub = new CriaCotacaoStub();
  const validadorStub = new ValidadorStub();
  const sut = new CriaCotacaoControlador(
    encontraEstadoStub,
    encontraPrecoStub,
    calculaCreditoStub,
    criaCotacaoStub,
    validadorStub
  );
  return {
    sut,
    encontraEstadoStub,
    encontraPrecoStub,
    calculaCreditoStub,
    criaCotacaoStub,
    validadorStub
  };
};

describe('CriaCotacaoControlador', () => {
  test('deve chamar formataRequisicao com os valores corretos', async () => {
    const { sut } = criaSut();
    const formataRequisicao = jest.spyOn((sut as any), 'formataRequisicao');

    await sut.trate(mockRequisicaoHttp);

    expect(formataRequisicao).toHaveBeenCalledWith(mockRequisicaoHttp);
  });

  test('deve formatar os campos recebidos corretamente', async () => {
    const { sut } = criaSut();

    const requisicaoFormatada = (sut as any).formataRequisicao(mockRequisicaoHttp);

    const { nome, cep, quantidade, dataPagamento } = mockRequisicaoHttp.body;

    expect(requisicaoFormatada).toEqual({
      nome,
      cep,
      quantidade,
      dataPagamento: new Date(dataPagamento)
    });
  });

  test('deve chamar Validador com os valores corretos', async () => {
    const { sut, validadorStub } = criaSut();
    const validaSpy = jest.spyOn(validadorStub, 'valida');

    await sut.trate(mockRequisicaoHttp);

    expect(validaSpy).toHaveBeenCalledWith(mockRequisicaoHttp);
  });

  test('deve retornar 400 caso Validador retorne erro', async () => {
    const { sut, validadorStub } = criaSut();
    const erro = new Error();
    jest.spyOn(validadorStub, 'valida').mockReturnValue(erro);

    const resposta = await sut.trate(mockRequisicaoHttpCriaCotacao);

    expect(resposta).toEqual(requisicaoInvalida(erro));
  });

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

  test('deve retornar 500 caso seja lançado ErroInesperado', async () => {
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

  test('deve chamar CriaCotacao com os valores corretos', async () => {
    const { sut, criaCotacaoStub } = criaSut();
    const criaSpy = jest.spyOn(criaCotacaoStub, 'cria');

    await sut.trate(mockRequisicaoHttpCriaCotacao);

    expect(criaSpy).toHaveBeenCalledWith(mockEntradaCriaCotacaoDTO);
  });

  test('deve retornar 201 em caso de sucesso', async () => {
    const { sut } = criaSut();

    const resposta = await sut.trate(mockRequisicaoHttpCriaCotacao);

    expect(resposta).toEqual(criado(mockSaidaCriaCotacao));
  });
});
