import { type Collection, MongoClient } from 'mongodb';

export class MongoUtil {
  private cliente: MongoClient;
  private uri: string;

  constructor () {
    this.cliente = null;
    this.uri = null;
  }

  async conecta (uri: string): Promise<void> {
    this.cliente = await MongoClient.connect(uri);
    this.uri = uri;
  }

  async desconecta (): Promise<void> {
    await this.cliente.close();
    this.cliente = null;
  }

  async pegaCollection (name: string): Promise<Collection> {
    if (!this.cliente) this.cliente = await MongoClient.connect(this.uri);
    return this.cliente.db(process.env.NOME_DATABASE).collection(name);
  }

  async popula (nomeCollection: string, seed: any[]): Promise<void> {
    const estadosColecao = await this.pegaCollection(nomeCollection);
    await estadosColecao.insertMany(seed);
  }

  async limpa (collectionName: string): Promise<void> {
    const colecao = await this.pegaCollection(collectionName);
    await colecao.deleteMany({});
  }

  formata (collection: any): any {
    const { _id, ...colecaoSemId } = collection;
    return Object.assign({}, colecaoSemId, { id: _id });
  }
}
