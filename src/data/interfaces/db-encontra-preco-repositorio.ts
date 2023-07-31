import { type EntradaEncontraPrecoDTO } from '../dtos';
import { type ModeloEstadoPreco } from '../types/encontra-preco';

export interface DbEncontraPrecoRepositorio {
  encontraPreco: (dados: EntradaEncontraPrecoDTO) => Promise<ModeloEstadoPreco>
}
