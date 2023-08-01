import { type ModeloCotacao } from '../../../domain/models';
import { type CriaCotacao } from '../../../domain/usecases';
import { type EntradaCriaCotacaoDTO } from '../../dtos';
import { type DbCriaCotacaoRepositorio } from '../../interfaces';

export class DbCriaCotacao implements CriaCotacao {
  constructor (private readonly dbCriaCotacaoRepositorio: DbCriaCotacaoRepositorio) {
    this.dbCriaCotacaoRepositorio = dbCriaCotacaoRepositorio;
  }

  async cria (dados: EntradaCriaCotacaoDTO): Promise<ModeloCotacao> {
    await this.dbCriaCotacaoRepositorio.cria(dados);
    return null;
  }
}
