import { type ListaCotacoes } from '../../../domain/usecases';
import { type Controlador, type RespostaHttp } from '../../interfaces';
import { erroServidor, ok, semConteudo } from '../../utils';

export class ListaCotacoesControlador implements Controlador {
  constructor (private readonly listaCotacoes: ListaCotacoes) {
    this.listaCotacoes = listaCotacoes;
  }

  async trate (): Promise<RespostaHttp> {
    try {
      const cotacoes = await this.listaCotacoes.lista();
      return cotacoes.length ? ok(cotacoes) : semConteudo();
    } catch (erro) {
      return erroServidor(erro);
    }
  }
}
