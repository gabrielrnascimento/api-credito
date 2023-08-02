import { type EntradaEncontraEstadoDTO } from '../../data/dtos';
import { type ModeloEstado } from '../models';

export interface EncontraEstado {
  encontraEstado: (dados: EntradaEncontraEstadoDTO) => Promise<ModeloEstado>
}
