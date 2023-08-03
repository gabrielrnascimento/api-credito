import { type EntradaCalculaCreditoDTO } from '../../data/dtos';
import { mockCalculoCredito } from '../../data/test';
import { type CalculaCredito } from '../../domain/usecases';

export class CalculaCreditoStub implements CalculaCredito {
  calcula (dados: EntradaCalculaCreditoDTO): number {
    return mockCalculoCredito;
  }
}
