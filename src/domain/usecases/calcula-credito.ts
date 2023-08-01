import { type EntradaCalculaCreditoDTO } from '../../data/dtos';

export interface CalculaCredito {
  calcula: (dados: EntradaCalculaCreditoDTO) => number
}
