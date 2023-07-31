import { type ModeloPreco } from '../../domain/models';
import { type EntradaEncontraPrecoDTO } from '../dtos';

export interface DbEncontraPrecoRepositorio {
  encontra: (data: EntradaEncontraPrecoDTO) => Promise<ModeloPreco>
}
