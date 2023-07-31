import { type EntradaEncontraPrecoDTO } from '../../data/dtos';
import { type ModeloPreco } from '../models';

export interface EncontraPreco {
  encontraPreco: (dados: EntradaEncontraPrecoDTO) => Promise<ModeloPreco>
}
