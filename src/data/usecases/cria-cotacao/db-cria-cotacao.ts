import { type ModeloCotacao } from '../../../domain/models';
import { type CriaCotacao } from '../../../domain/usecases';
import { type EntradaDbCriaCotacaoRepositorioDTO, type EntradaCriaCotacaoDTO } from '../../dtos';
import { type DbCriaCotacaoRepositorio } from '../../interfaces';

export class DbCriaCotacao implements CriaCotacao {
  constructor (private readonly dbCriaCotacaoRepositorio: DbCriaCotacaoRepositorio) {
    this.dbCriaCotacaoRepositorio = dbCriaCotacaoRepositorio;
  }

  async cria (dados: EntradaCriaCotacaoDTO): Promise<ModeloCotacao> {
    const repositorioDTO: EntradaDbCriaCotacaoRepositorioDTO = {
      nome: dados.nome,
      estado: dados.uf,
      quantidade: dados.quantidade,
      valor: dados.valor,
      dataVencimento: dados.dataPagamento,
      dataCriacao: new Date()
    };
    await this.dbCriaCotacaoRepositorio.cria(repositorioDTO);
    return null;
  }
}
