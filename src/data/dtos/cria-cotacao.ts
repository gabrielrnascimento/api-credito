export type EntradaCriaCotacaoDTO = {
  nome: string
  uf: string
  quantidade: number
  valor: number
  dataPagamento: Date
};

export type EntradaDbCriaCotacaoRepositorioDTO = Pick<EntradaCriaCotacaoDTO, 'nome' | 'valor' | 'quantidade'> & {
  estado: string
  dataCriacao: Date
  dataVencimento: Date
};
