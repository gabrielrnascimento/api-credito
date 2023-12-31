import { type ModeloCotacao } from '../../domain/models';
import { type EntradaDbCriaCotacaoRepositorioDTO, type EntradaCriaCotacaoDTO } from '../dtos';
import { type DbListaCotacoesRepositorio, type DbCriaCotacaoRepositorio } from '../interfaces';
import { mockCalculoCredito } from './mock-calculo';
import { mockModeloEstado } from './mock-estado';

export class DbCriaCotacaoRepositorioStub implements DbCriaCotacaoRepositorio {
  async cria (dados: EntradaDbCriaCotacaoRepositorioDTO): Promise<ModeloCotacao> {
    return mockModeloCotacao;
  }
}

export class DbListaCotacoesRepositorioStub implements DbListaCotacoesRepositorio {
  async lista (): Promise<ModeloCotacao[]> {
    return mockModeloListaCotacoes;
  }
}

export const mockEntradaCriaCotacaoDTO: EntradaCriaCotacaoDTO = {
  nome: 'qualquer nome',
  uf: mockModeloEstado.uf,
  valor: mockCalculoCredito,
  quantidade: 10,
  dataPagamento: new Date(2023, 8, 26)
};

export const mockEntradaDbCriaCotacaoRepositorioDTO = (data: Date): EntradaDbCriaCotacaoRepositorioDTO => ({
  nome: mockEntradaCriaCotacaoDTO.nome,
  estado: mockModeloEstado.uf,
  valor: mockCalculoCredito,
  quantidade: mockEntradaCriaCotacaoDTO.quantidade,
  dataCriacao: data,
  dataVencimento: mockEntradaCriaCotacaoDTO.dataPagamento
});

export const mockModeloCotacao: ModeloCotacao = {
  id: 'qualquer_id',
  nome: mockEntradaCriaCotacaoDTO.nome,
  estado: mockModeloEstado.uf,
  quantidade: mockEntradaCriaCotacaoDTO.quantidade,
  valor: mockCalculoCredito,
  dataCriacao: new Date(),
  dataVencimento: mockEntradaCriaCotacaoDTO.dataPagamento
};

export const mockModeloListaCotacoes: ModeloCotacao[] = [
  mockModeloCotacao,
  mockModeloCotacao,
  mockModeloCotacao,
  mockModeloCotacao,
  mockModeloCotacao,
  mockModeloCotacao,
  mockModeloCotacao,
  mockModeloCotacao,
  mockModeloCotacao,
  mockModeloCotacao
];
