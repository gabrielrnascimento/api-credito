import { type ListaCotacoes } from '../../../domain/usecases';
import { type Controlador, type RespostaHttp } from '../../interfaces';
import { erroServidor } from '../../utils';

export class ListaCotacoesControlador implements Controlador {
  constructor (private readonly listaCotacoes: ListaCotacoes) {
    this.listaCotacoes = listaCotacoes;
  }

  async trate (): Promise<RespostaHttp> {
    try {
      await this.listaCotacoes.lista();
    } catch (erro) {
      return erroServidor(erro);
    }
  }
}
