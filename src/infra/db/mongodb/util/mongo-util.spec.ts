import { MongoUtil } from './mongo-util';

const nomeCollectionTeste = 'collectionTeste';

describe('MongoUtil', () => {
  let sut: MongoUtil;

  beforeAll(async () => {
    sut = new MongoUtil();
    await sut.conecta(process.env.MONGO_URL);
  });

  beforeEach(async () => {
    await sut.limpa(nomeCollectionTeste);
  });

  afterAll(async () => {
    await sut.desconecta();
  });

  test('deve reconectar se mongodb estiver desconectado', async () => {
    expect((sut as any).cliente).toBeTruthy();
    await sut.desconecta();
    await sut.pegaCollection('qualquer');
    expect((sut as any).cliente).toBeTruthy();
  });

  test('deve se conectar com o banco de dados', async () => {
    expect((sut as any).cliente).toBeTruthy();
  });

  test('deve popular a collection', async () => {
    const mockDados = [{ name: 'Item 1' }, { name: 'Item 2' }];

    await sut.popula(nomeCollectionTeste, mockDados);

    const collection = await sut.pegaCollection(nomeCollectionTeste);
    const items = await collection.find().toArray();
    expect(items).toHaveLength(2);
    expect(items[0].name).toBe('Item 1');
    expect(items[1].name).toBe('Item 2');
  });

  test('deve limpar a collection', async () => {
    const nomeCollection = 'collectionAleatoria';
    const mockDados = [{ name: 'Item 1' }, { name: 'Item 2' }];

    await sut.popula(nomeCollection, mockDados);
    let collection = await sut.pegaCollection(nomeCollection);
    let items = await collection.find().toArray();
    expect(items).toHaveLength(2);

    await sut.limpa(nomeCollection);
    collection = await sut.pegaCollection(nomeCollection);
    items = await collection.find().toArray();
    expect(items).toHaveLength(0);
  });

  test('deve formatar a collection', () => {
    const collectionEntrada = { _id: '123', nome: 'Item 1', valor: 42 };
    const collectionFormatada = sut.formata(collectionEntrada);

    expect(collectionFormatada).toEqual({ id: '123', nome: 'Item 1', valor: 42 });
  });
});
