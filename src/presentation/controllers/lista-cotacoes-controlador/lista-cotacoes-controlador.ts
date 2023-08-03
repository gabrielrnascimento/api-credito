import { type ListaCotacoes } from '../../../domain/usecases';
import { type Controlador, type RespostaHttp } from '../../interfaces';

export class ListaCotacoesControlador implements Controlador {
  constructor (private readonly listaCotacoes: ListaCotacoes) {
    this.listaCotacoes = listaCotacoes;
  }

  async trate (): Promise<RespostaHttp> {
    await this.listaCotacoes.lista();
    return null;
  }
}
