import { type EntradaEncontraEstadoDTO } from '../../data/dtos';
import { type ModeloEstado } from '../models';

export interface EncontraEstado {
  encontra: (dados: EntradaEncontraEstadoDTO) => Promise<ModeloEstado>
}
