import { type EntradaEncontraEstadoDTO } from '../../data/dtos';
import { type ModeloEstado } from '../models/modelo-estado';

export interface EncontraEstado {
  encontra: (data: EntradaEncontraEstadoDTO) => Promise<ModeloEstado>
}
