import { type EntradaEncontraPrecoDTO } from '../../data/dtos';
import { type ModeloPreco } from '../models';

export interface EncontraPreco {
  encontra: (data: EntradaEncontraPrecoDTO) => Promise<ModeloPreco>
}
