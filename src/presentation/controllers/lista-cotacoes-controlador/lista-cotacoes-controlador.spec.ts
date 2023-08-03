import { mockModeloCotacao, mockModeloListaCotacoes } from '../../../data/test';
import { type ModeloCotacao } from '../../../domain/models';
import { ListaCotacoesStub, mockSaidaListaCotacoes } from '../../test';
import { erroServidor, ok, semConteudo } from '../../utils';
import { ListaCotacoesControlador } from './lista-cotacoes-controlador';

type SutTypes = {
  sut: ListaCotacoesControlador
  listaCotacoesStub: ListaCotacoesStub
};

const criaSut = (): SutTypes => {
  const listaCotacoesStub = new ListaCotacoesStub();
  const sut = new ListaCotacoesControlador(listaCotacoesStub);
  return {
    sut,
    listaCotacoesStub
  };
};

describe('ListaCotacoesControlador', () => {
  test('deve chamar ListaCotacoes corretamente', async () => {
    const { sut, listaCotacoesStub } = criaSut();
    const listaSpy = jest.spyOn(listaCotacoesStub, 'lista');

    await sut.trate();

    expect(listaSpy).toHaveBeenCalled();
  });

  test('deve retornar 500 caso ListaCotacoes lance um erro', async () => {
    const { sut, listaCotacoesStub } = criaSut();
    const erro = new Error();
    jest.spyOn(listaCotacoesStub, 'lista').mockRejectedValueOnce(erro);

    const resposta = await sut.trate();

    expect(resposta).toEqual(erroServidor(erro));
  });

  test('deve retornar 204 caso ListaCotacoes retorne uma lista vazia', async () => {
    const { sut, listaCotacoesStub } = criaSut();
    jest.spyOn(listaCotacoesStub, 'lista').mockResolvedValueOnce([]);

    const resposta = await sut.trate();

    expect(resposta).toEqual(semConteudo());
  });

  test('deve chamar formataResposta com os valores corretos', async () => {
    const { sut } = criaSut();
    const formataResposta = jest.spyOn((sut as any), 'formataResposta');

    await sut.trate();

    expect(formataResposta).toHaveBeenCalledWith(mockModeloListaCotacoes);
  });

  test('deve formatar os campos recebidos corretamente', async () => {
    const { sut } = criaSut();

    const respostaFormatada = (sut as any).formataResposta(mockModeloListaCotacoes);

    const { nome, estado, quantidade, valor, dataVencimento } = mockModeloCotacao;

    respostaFormatada.forEach((cotacao: ModeloCotacao) => {
      expect(cotacao).toEqual({
        nome,
        estado,
        quantidade,
        valor,
        dataVencimento: new Date(dataVencimento).toISOString().split('T')[0]
      });
    });
  });

  test('deve retornar 200 em caso de sucesso', async () => {
    const { sut } = criaSut();

    const resposta = await sut.trate();

    expect(resposta).toEqual(ok(mockSaidaListaCotacoes));
  });
});
