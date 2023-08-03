import { type ModeloEstado, type ModeloPreco } from '../../domain/models';
import { type EntradaEncontraPrecoDTO } from '../dtos';
import { type DbEncontraPrecoRepositorio } from '../interfaces';
import { type ModeloEstadoPreco } from '../types';
import { mockModeloEstado } from './mock-estado';

export const mockModeloPreco: ModeloPreco = {
  preco: 1050
};

export const mockEntradaEncontraPrecoDTO: EntradaEncontraPrecoDTO = {
  uf: mockModeloEstado.uf
};

export const mockModeloEstadoPreco: ModeloEstadoPreco = {
  id: 'qualquer id',
  uf: mockModeloEstado.uf,
  preco: mockModeloPreco.preco
};

export class DbEncontraPrecoRepositorioStub implements DbEncontraPrecoRepositorio {
  async encontraPreco (dados: ModeloEstado): Promise<ModeloEstadoPreco> {
    return mockModeloEstadoPreco;
  }
}
