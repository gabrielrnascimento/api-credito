import { type CalculaCredito } from '../../../domain/usecases';
import { type EntradaCalculaCreditoDTO } from '../../dtos';

export class LocalCalculaCredito implements CalculaCredito {
  constructor (private readonly taxaJurosMensal: number) {
    this.taxaJurosMensal = taxaJurosMensal;
  }

  private diferencaEmMeses (data: Date): number {
    const dataInicial = new Date();

    const mesInicial = dataInicial.getMonth();
    const anoInicial = dataInicial.getFullYear();
    const mesFinal = data.getMonth();
    const anoFinal = data.getFullYear();

    const anos = anoFinal - anoInicial;

    return (anos * 12) + (mesFinal - mesInicial);
  }

  calcula (dados: EntradaCalculaCreditoDTO): number {
    const meses = this.diferencaEmMeses(dados.dataPagamento);
    const valorTotal = dados.valorUnitario * dados.quantidade;
    const valorTotalComJuros = valorTotal * Math.pow(1 + this.taxaJurosMensal, meses);
    return valorTotalComJuros;
  }
}
