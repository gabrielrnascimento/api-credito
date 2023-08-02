import { type EntradaControladorCriaCotacaoDTO } from '../../../data/dtos';
import { ErroEstadoNaoEncontrado } from '../../../domain/errors';
import { type ModeloCotacao } from '../../../domain/models';
import { type EncontraPreco, type EncontraEstado, type CalculaCredito, type CriaCotacao } from '../../../domain/usecases';
import { ErroNaoEncontrado, ErroRequisicaoInvalida } from '../../errors';
import { type Controlador, type RequisicaoHttp, type RespostaHttp } from '../../interfaces';
import { criado, erroServidor, naoEncontrado, requisicaoInvalida } from '../../utils';

export class CriaCotacaoControlador implements Controlador {
  constructor (
    private readonly encontraEstado: EncontraEstado,
    private readonly encontraPreco: EncontraPreco,
    private readonly calculaCredito: CalculaCredito,
    private readonly criaCotacao: CriaCotacao
  ) {
    this.encontraEstado = encontraEstado;
    this.encontraPreco = encontraPreco;
  }

  private formataRequisicao (requisicao: RequisicaoHttp<EntradaControladorCriaCotacaoDTO>): EntradaControladorCriaCotacaoDTO {
    const { nome, cep, quantidade, dataPagamento }: EntradaControladorCriaCotacaoDTO = {
      nome: requisicao.body.nome,
      cep: requisicao.body.cep,
      quantidade: requisicao.body.quantidade,
      dataPagamento: new Date(requisicao.body.dataPagamento)
    };
    return {
      nome,
      cep,
      quantidade,
      dataPagamento
    };
  }

  async trate (requisicao: RequisicaoHttp<EntradaControladorCriaCotacaoDTO>): Promise<RespostaHttp> {
    const { nome, cep, quantidade, dataPagamento } = this.formataRequisicao(requisicao);
    let cotacao: ModeloCotacao;
    try {
      const { uf } = await this.encontraEstado.encontraEstado({ cep });
      const { preco } = await this.encontraPreco.encontraPreco({ uf });
      const valor = this.calculaCredito.calcula({
        valorUnitario: preco,
        quantidade,
        dataPagamento
      });
      cotacao = await this.criaCotacao.cria({
        nome,
        uf,
        quantidade,
        dataPagamento,
        valor
      });
    } catch (erro) {
      switch (true) {
        case erro instanceof ErroRequisicaoInvalida: return requisicaoInvalida(erro);
        case erro instanceof ErroNaoEncontrado: return naoEncontrado(erro);
        case erro instanceof ErroEstadoNaoEncontrado: return naoEncontrado(erro);
        default: return erroServidor(erro);
      }
    }
    return criado(cotacao);
  }
}
