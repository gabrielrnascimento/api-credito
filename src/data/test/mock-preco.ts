import { type ModeloEstado, type ModeloPreco } from '../../domain/models';
import { type DbEncontraPrecoRepositorio } from '../interfaces';
import { type ModeloEstadoPreco } from '../types';

export const mockModeloPreco: ModeloPreco = {
  preco: 1040.20
};

export const mockModeloEstadoPreco: ModeloEstadoPreco = {
  id: 'qualquer id',
  uf: 'SP',
  preco: mockModeloPreco.preco
};

export class DbEncontraPrecoRepositorioStub implements DbEncontraPrecoRepositorio {
  async encontraPreco (dados: ModeloEstado): Promise<ModeloEstadoPreco> {
    return mockModeloEstadoPreco;
  }
}
