import { type ModeloCotacao } from '../../domain/models';
import { type EntradaDbCriaCotacaoRepositorioDTO } from '../dtos';

export interface DbCriaCotacaoRepositorio {
  cria: (dados: EntradaDbCriaCotacaoRepositorioDTO) => Promise<ModeloCotacao>
}
