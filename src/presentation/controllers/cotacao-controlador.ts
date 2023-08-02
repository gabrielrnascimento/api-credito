import { type EntradaControladorCriaCotacaoDTO } from '../../data/dtos';
import { ErroEstadoNaoEncontrado } from '../../domain/errors';
import { type EncontraPreco, type EncontraEstado, type CalculaCredito, type CriaCotacao } from '../../domain/usecases';
import { ErroNaoEncontrado, ErroRequisicaoInvalida } from '../errors';
import { type Controlador, type RequisicaoHttp, type RespostaHttp } from '../interfaces';
import { erroServidor, naoEncontrado, requisicaoInvalida } from '../utils';

export class CotacaoControlador implements Controlador {
  constructor (
    private readonly encontraEstado: EncontraEstado,
    private readonly encontraPreco: EncontraPreco,
    private readonly calculaCredito: CalculaCredito,
    private readonly criaCotacao: CriaCotacao
  ) {
    this.encontraEstado = encontraEstado;
    this.encontraPreco = encontraPreco;
  }

  async trate (requisicao: RequisicaoHttp<EntradaControladorCriaCotacaoDTO>): Promise<RespostaHttp> {
    const { nome, cep, dataPagamento, quantidade } = requisicao.body;
    try {
      const { uf } = await this.encontraEstado.encontraEstado({ cep });
      const { preco } = await this.encontraPreco.encontraPreco({ uf });
      const valor = this.calculaCredito.calcula({
        valorUnitario: preco,
        quantidade,
        dataPagamento
      });
      await this.criaCotacao.cria({
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
    return null;
  }
}
