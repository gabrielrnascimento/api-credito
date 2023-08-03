import { type ModeloCotacao } from '../../domain/models';

export interface DbListaCotacoesRepositorio {
  lista: () => Promise<ModeloCotacao[]>
}
