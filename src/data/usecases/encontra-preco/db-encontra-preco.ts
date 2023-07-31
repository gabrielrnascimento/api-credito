import { type ModeloEstado, type ModeloPreco } from '../../../domain/models';
import { type EncontraPreco } from '../../../domain/usecases';
import { type DbEncontraPrecoRepositorio } from '../../interfaces';

export class DbEncontraPreco implements EncontraPreco {
  constructor (private readonly dbEncontraPrecoRepositorio: DbEncontraPrecoRepositorio) {
    this.dbEncontraPrecoRepositorio = dbEncontraPrecoRepositorio;
  }

  async encontraPreco (data: ModeloEstado): Promise<ModeloPreco> {
    const { preco } = await this.dbEncontraPrecoRepositorio.encontraPreco(data);
    return { preco };
  }
}
