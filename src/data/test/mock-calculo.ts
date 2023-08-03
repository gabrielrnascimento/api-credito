import { type EntradaCalculaCreditoDTO } from '../dtos';
import { mockModeloPreco } from './mock-preco';

export const mockCalculoCredito: number = 10924.20;

export const mockEntradaCalculaCreditoDTO: EntradaCalculaCreditoDTO = {
  valorUnitario: mockModeloPreco.preco,
  quantidade: 10,
  dataPagamento: new Date(2023, 8, 26)
};
