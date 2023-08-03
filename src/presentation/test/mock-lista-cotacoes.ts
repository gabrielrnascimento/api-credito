import { mockModeloListaCotacoes } from '../../data/test';
import { type ModeloCotacao } from '../../domain/models';
import { type ListaCotacoes } from '../../domain/usecases';

export class ListaCotacoesStub implements ListaCotacoes {
  async lista (): Promise<ModeloCotacao[]> {
    return mockModeloListaCotacoes;
  }
}
