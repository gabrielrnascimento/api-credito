import { type ModeloCotacao } from '../../domain/models';
import { type EntradaCriaCotacaoDTO } from '../dtos';
import { type DbCriaCotacaoRepositorio } from '../interfaces';
import { mockCalculoCredito } from './mock-calculo';
import { mockModeloEstado } from './mock-estado';

export class DbCriaCotacaoRepositorioStub implements DbCriaCotacaoRepositorio {
  async cria (dados: EntradaCriaCotacaoDTO): Promise<ModeloCotacao> {
    return mockModeloCotacao;
  }
}

export const mockEntradaCriaCotacaoDTO: EntradaCriaCotacaoDTO = {
  nome: 'qualquer nome',
  uf: mockModeloEstado.uf,
  valor: mockCalculoCredito,
  quantidade: 10,
  dataPagamento: new Date(2023, 8, 26)
};

export const mockModeloCotacao: ModeloCotacao = {
  id: 'qualquer_id',
  nome: mockEntradaCriaCotacaoDTO.nome,
  estado: mockModeloEstado.uf,
  quantidade: mockEntradaCriaCotacaoDTO.quantidade,
  valor: mockCalculoCredito,
  dataCriacao: new Date(),
  dataVencimento: mockEntradaCriaCotacaoDTO.dataPagamento
};
