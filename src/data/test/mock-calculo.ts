import { type EntradaCalculaCreditoDTO } from '../dtos';

export const mockCalculoCredito: number = 10924.20;

export const mockEntradaCalculaCreditoDTO: EntradaCalculaCreditoDTO = {
  valorUnitario: 1050,
  quantidade: 10,
  dataPagamento: new Date(2023, 8, 26)
};
