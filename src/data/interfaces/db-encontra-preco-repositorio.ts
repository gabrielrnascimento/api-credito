import { type EntradaEncontraPrecoDTO } from '../dtos';
import { type ModeloEstadoPreco } from '../types/encontra-preco';

export interface DbEncontraPrecoRepositorio {
  encontraPreco: (data: EntradaEncontraPrecoDTO) => Promise<ModeloEstadoPreco>
}
