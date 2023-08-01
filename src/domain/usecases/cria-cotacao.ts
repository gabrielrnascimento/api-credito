import { type EntradaCriaCotacaoDTO } from '../../data/dtos';
import { type ModeloCotacao } from '../models';

export interface CriaCotacao {
  cria: (dados: EntradaCriaCotacaoDTO) => Promise<ModeloCotacao>
}
