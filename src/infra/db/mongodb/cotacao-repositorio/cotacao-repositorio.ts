import { type EntradaDbCriaCotacaoRepositorioDTO } from '../../../../data/dtos';
import { type DbListaCotacoesRepositorio, type DbCriaCotacaoRepositorio } from '../../../../data/interfaces';
import { type ModeloCotacao } from '../../../../domain/models';
import { type MongoUtil } from '../util/mongo-util';

export class CotacaoRepositorio implements DbCriaCotacaoRepositorio, DbListaCotacoesRepositorio {
  constructor (private readonly mongoClient: MongoUtil) {
    this.mongoClient = mongoClient;
  }

  async cria (dados: EntradaDbCriaCotacaoRepositorioDTO): Promise<ModeloCotacao> {
    const collection = await this.mongoClient.pegaCollection('cotacoes');
    await collection.insertOne(dados);
    return this.mongoClient.formata(dados);
  }

  async lista (): Promise<ModeloCotacao[]> {
    const collection = await this.mongoClient.pegaCollection('cotacoes');
    const cotacoesPorDataCriacaoDecrescente = await collection.find()
      .sort({ dataCriacao: -1 })
      .limit(10)
      .toArray();

    const cotacoesPorDataVencimentoCrescente = cotacoesPorDataCriacaoDecrescente.sort((a, b) => a.dataVencimento - b.dataVencimento);
    const resposta = cotacoesPorDataVencimentoCrescente.map(cotacao => this.mongoClient.formata(cotacao));
    return resposta;
  }
}
