import { ClienteHttpSpy } from '../../test';
import { mockEntradaEncontraEstadoDTO } from '../../test/mock-estado';
import { RemotoEncontraEstado } from './remoto-encontra-estado';

type SutTypes = {
  sut: RemotoEncontraEstado
  clienteHttpSpy: ClienteHttpSpy
};

const criaSut = (url: string = 'qualquer_url'): SutTypes => {
  const clienteHttpSpy = new ClienteHttpSpy();
  const sut = new RemotoEncontraEstado(url, clienteHttpSpy);
  return {
    sut,
    clienteHttpSpy
  };
};

describe('RemotoEncontraEstado', () => {
  test('deve chamar ClienteHttp com os valores corretos', async () => {
    const url = 'outra_url';
    const { sut, clienteHttpSpy } = criaSut(url);

    await sut.encontra(mockEntradaEncontraEstadoDTO);

    expect(clienteHttpSpy.url).toBe(`${url}/${mockEntradaEncontraEstadoDTO.cep}/json`);
    expect(clienteHttpSpy.method).toBe('get');
  });
});
