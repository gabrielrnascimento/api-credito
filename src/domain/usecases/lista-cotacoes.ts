import { type ModeloCotacao } from '../models';

export interface ListaCotacoes {
  lista: () => Promise<ModeloCotacao[]>
}
