import { type EntradaEncontraPrecoDTO } from '../dtos';
import { type ModeloEstadoPreco } from '../types';

export interface DbEncontraPrecoRepositorio {
  encontraPreco: (dados: EntradaEncontraPrecoDTO) => Promise<ModeloEstadoPreco>
}
