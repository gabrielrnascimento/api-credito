import { type EntradaDbCriaCotacaoRepositorioDTO } from '../../../../data/dtos';
import { type DbCriaCotacaoRepositorio } from '../../../../data/interfaces';
import { type ModeloCotacao } from '../../../../domain/models';
import { type MongoUtil } from '../util/mongo-util';

export class CotacaoRepositorio implements DbCriaCotacaoRepositorio {
  constructor (private readonly mongoClient: MongoUtil) {
    this.mongoClient = mongoClient;
  }

  async cria (dados: EntradaDbCriaCotacaoRepositorioDTO): Promise<ModeloCotacao> {
    const collection = await this.mongoClient.pegaCollection('cotacoes');
    await collection.insertOne(dados);
    return this.mongoClient.formata(dados);
  }
}
