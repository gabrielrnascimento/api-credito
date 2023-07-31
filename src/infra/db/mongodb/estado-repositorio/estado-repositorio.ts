import { type DbEncontraPrecoRepositorio } from '../../../../data/interfaces';
import { type ModeloEstadoPreco } from '../../../../data/types';
import { type ModeloEstado } from '../../../../domain/models';
import { type MongoUtil } from '../util/mongo-util';

export class EstadoRepositorio implements DbEncontraPrecoRepositorio {
  constructor (private readonly mongoClient: MongoUtil) {
    this.mongoClient = mongoClient;
  }

  async encontraPreco (dados: ModeloEstado): Promise<ModeloEstadoPreco> {
    const collection = await this.mongoClient.pegaCollection('estados');
    const estado = await collection.findOne({ uf: dados.uf });
    return this.mongoClient.formata(estado);
  }
}
