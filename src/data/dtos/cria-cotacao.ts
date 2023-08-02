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

export type EntradaControladorCriaCotacaoDTO = {
  nome: string
  cep: string
  quantidade: number
  dataPagamento: Date
};

export type SaidaControladorCriaCotacaoDTO = {
  id: string
  nome: string
  estado: string
  quantidade: number
  valor: number
  dataVencimento: string
};
