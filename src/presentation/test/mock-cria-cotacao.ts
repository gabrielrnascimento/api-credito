import { type EntradaCriaCotacaoDTO } from '../../data/dtos';
import { mockModeloCotacao } from '../../data/test';
import { type ModeloCotacao } from '../../domain/models';
import { type CriaCotacao } from '../../domain/usecases';

export class CriaCotacaoStub implements CriaCotacao {
  async cria (dados: EntradaCriaCotacaoDTO): Promise<ModeloCotacao> {
    return mockModeloCotacao;
  }
}
