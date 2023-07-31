import { type EntradaEncontraEstadoDTO } from '../../data/dtos';
import { type ModeloEstado } from '../models';

export interface EncontraEstado {
  encontra: (data: EntradaEncontraEstadoDTO) => Promise<ModeloEstado>
}
