import { type ModeloEstado, type ModeloPreco } from '../../domain/models';
import { type DbEncontraPrecoRepositorio } from '../interfaces';

export const mockModeloPreco: ModeloPreco = {
  preco: 1040.20
};

export class DbEncontraPrecoRepositorioStub implements DbEncontraPrecoRepositorio {
  async encontra (data: ModeloEstado): Promise<ModeloPreco> {
    return mockModeloPreco;
  }
}
