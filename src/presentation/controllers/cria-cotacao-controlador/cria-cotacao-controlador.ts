import { type EntradaCriaCotacaoControladorDTO, type SaidaCriaCotacaoControladorDTO } from '../../../data/dtos';
import { ErroEstadoNaoEncontrado } from '../../../domain/errors';
import { type EncontraPreco, type EncontraEstado, type CalculaCredito, type CriaCotacao } from '../../../domain/usecases';
import { type Validador } from '../../../utils/interface';
import { ErroNaoEncontrado, ErroRequisicaoInvalida } from '../../errors';
import { type Controlador, type RequisicaoHttp, type RespostaHttp } from '../../interfaces';
import { criado, erroServidor, naoEncontrado, requisicaoInvalida } from '../../utils';

export class CriaCotacaoControlador implements Controlador {
  constructor (
    private readonly encontraEstado: EncontraEstado,
    private readonly encontraPreco: EncontraPreco,
    private readonly calculaCredito: CalculaCredito,
    private readonly criaCotacao: CriaCotacao,
    private readonly validador: Validador
  ) {
    this.encontraEstado = encontraEstado;
    this.encontraPreco = encontraPreco;
    this.calculaCredito = calculaCredito;
    this.criaCotacao = criaCotacao;
    this.validador = validador;
  }

  private formataRequisicao (requisicao: RequisicaoHttp<EntradaCriaCotacaoControladorDTO>): EntradaCriaCotacaoControladorDTO {
    const { nome, cep, quantidade, dataPagamento }: EntradaCriaCotacaoControladorDTO = {
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

  async trate (requisicao: RequisicaoHttp<EntradaCriaCotacaoControladorDTO>): Promise<RespostaHttp> {
    const erro = this.validador.valida(requisicao.body);
    if (erro) return requisicaoInvalida(erro);
    const { nome, cep, quantidade, dataPagamento } = this.formataRequisicao(requisicao);
    let saida: SaidaCriaCotacaoControladorDTO;
    try {
      const { uf } = await this.encontraEstado.encontraEstado({ cep });
      const { preco } = await this.encontraPreco.encontraPreco({ uf });
      const valor = this.calculaCredito.calcula({
        valorUnitario: preco,
        quantidade,
        dataPagamento
      });
      const cotacao = await this.criaCotacao.cria({
        nome,
        uf,
        quantidade,
        dataPagamento,
        valor
      });
      saida = {
        nome: cotacao.nome,
        estado: cotacao.estado,
        quantidade: cotacao.quantidade,
        valor: cotacao.valor,
        dataVencimento: cotacao.dataVencimento.toISOString().split('T')[0]
      };
    } catch (erro) {
      switch (true) {
        case erro instanceof ErroRequisicaoInvalida: return requisicaoInvalida(erro);
        case erro instanceof ErroNaoEncontrado: return naoEncontrado(erro);
        case erro instanceof ErroEstadoNaoEncontrado: return naoEncontrado(erro);
        default: return erroServidor(erro);
      }
    }
    return criado(saida);
  }
}
