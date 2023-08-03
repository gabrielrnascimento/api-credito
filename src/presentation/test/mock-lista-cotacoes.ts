import { type SaidaListaCotacoesControladorDTO } from '../../data/dtos';
import { mockModeloListaCotacoes } from '../../data/test';
import { type ModeloCotacao } from '../../domain/models';
import { type ListaCotacoes } from '../../domain/usecases';

export class ListaCotacoesStub implements ListaCotacoes {
  async lista (): Promise<ModeloCotacao[]> {
    return mockModeloListaCotacoes;
  }
}

const mockSaidaCotacao = {
  nome: 'qualquer nome',
  estado: 'SP',
  quantidade: 10,
  valor: 10924.2,
  dataVencimento: '2023-09-26'
};

export const mockSaidaListaCotacoes: SaidaListaCotacoesControladorDTO[] = [
  mockSaidaCotacao,
  mockSaidaCotacao,
  mockSaidaCotacao,
  mockSaidaCotacao,
  mockSaidaCotacao,
  mockSaidaCotacao,
  mockSaidaCotacao,
  mockSaidaCotacao,
  mockSaidaCotacao,
  mockSaidaCotacao
];
