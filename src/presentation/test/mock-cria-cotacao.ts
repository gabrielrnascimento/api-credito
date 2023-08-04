import { type SaidaCriaCotacaoControladorDTO, type EntradaCriaCotacaoDTO } from '../../data/dtos';
import { mockModeloCotacao } from '../../data/test';
import { type ModeloCotacao } from '../../domain/models';
import { type CriaCotacao } from '../../domain/usecases';

export class CriaCotacaoStub implements CriaCotacao {
  async cria (dados: EntradaCriaCotacaoDTO): Promise<ModeloCotacao> {
    return mockModeloCotacao;
  }
}

export const mockSaidaCriaCotacao: SaidaCriaCotacaoControladorDTO = {
  nome: 'qualquer nome',
  estado: 'SP',
  quantidade: 10,
  valor: 10924.2,
  dataVencimento: '2023-09-26'
};
