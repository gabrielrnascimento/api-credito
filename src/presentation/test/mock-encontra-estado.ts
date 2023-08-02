import { type EntradaEncontraEstadoDTO } from '../../data/dtos';
import { mockModeloEstado } from '../../data/test';
import { type ModeloEstado } from '../../domain/models';
import { type EncontraEstado } from '../../domain/usecases';

export class EncontraEstadoStub implements EncontraEstado {
  async encontraEstado (dados: EntradaEncontraEstadoDTO): Promise<ModeloEstado> {
    return mockModeloEstado;
  }
}
