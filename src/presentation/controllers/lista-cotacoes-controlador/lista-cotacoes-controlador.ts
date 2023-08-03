import { type SaidaListaCotacoesControladorDTO } from '../../../data/dtos';
import { type ModeloCotacao } from '../../../domain/models';
import { type ListaCotacoes } from '../../../domain/usecases';
import { type Controlador, type RespostaHttp } from '../../interfaces';
import { erroServidor, ok, semConteudo } from '../../utils';

export class ListaCotacoesControlador implements Controlador {
  constructor (private readonly listaCotacoes: ListaCotacoes) {
    this.listaCotacoes = listaCotacoes;
  }

  private formataResposta (requisicao: ModeloCotacao[]): SaidaListaCotacoesControladorDTO[] {
    const respostaFormatada: SaidaListaCotacoesControladorDTO[] = [];
    requisicao.forEach(cotacao => {
      const { nome, estado, quantidade, valor, dataVencimento } = cotacao;
      const dataVencimentoFormatada = new Date(dataVencimento).toISOString().split('T')[0];
      const cotacaoFormatada = {
        nome,
        estado,
        quantidade,
        valor,
        dataVencimento: dataVencimentoFormatada
      };
      respostaFormatada.push(cotacaoFormatada);
    });
    return respostaFormatada;
  }

  async trate (): Promise<RespostaHttp> {
    try {
      const cotacoes = await this.listaCotacoes.lista();
      return cotacoes.length ? ok(this.formataResposta(cotacoes)) : semConteudo();
    } catch (erro) {
      return erroServidor(erro);
    }
  }
}
