export type EntradaCriaCotacaoDTO = {
  nome: string
  uf: string
  quantidade: number
  valor: number
  dataPagamento: Date
};

export type EntradaDbCriaCotacaoRepositorioDTO = EntradaCriaCotacaoDTO;
