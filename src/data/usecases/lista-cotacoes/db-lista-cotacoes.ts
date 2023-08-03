import { type ModeloCotacao } from '../../../domain/models';
import { type ListaCotacoes } from '../../../domain/usecases';
import { type DbListaCotacoesRepositorio } from '../../interfaces';

export class DbListaCotacoes implements ListaCotacoes {
  constructor (private readonly dbListaCotacoesRepositorio: DbListaCotacoesRepositorio) {
    this.dbListaCotacoesRepositorio = dbListaCotacoesRepositorio;
  }

  async lista (): Promise<ModeloCotacao[]> {
    return await this.dbListaCotacoesRepositorio.lista();
  }
}
