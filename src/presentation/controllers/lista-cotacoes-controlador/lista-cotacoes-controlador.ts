import { type ListaCotacoes } from '../../../domain/usecases';
import { type Controlador, type RespostaHttp } from '../../interfaces';
import { erroServidor, semConteudo } from '../../utils';

export class ListaCotacoesControlador implements Controlador {
  constructor (private readonly listaCotacoes: ListaCotacoes) {
    this.listaCotacoes = listaCotacoes;
  }

  async trate (): Promise<RespostaHttp> {
    try {
      const resposta = await this.listaCotacoes.lista();
      return resposta.length ? null : semConteudo();
    } catch (erro) {
      return erroServidor(erro);
    }
  }
}
