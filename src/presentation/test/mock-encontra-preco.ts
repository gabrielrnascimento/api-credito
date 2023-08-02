import { type EntradaEncontraPrecoDTO } from '../../data/dtos';
import { mockModeloPreco } from '../../data/test';
import { type ModeloPreco } from '../../domain/models';
import { type EncontraPreco } from '../../domain/usecases';

export class EncontraPrecoStub implements EncontraPreco {
  async encontraPreco (dados: EntradaEncontraPrecoDTO): Promise<ModeloPreco> {
    return mockModeloPreco;
  }
}
