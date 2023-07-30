import { ClienteHttpSpy } from '../../test';
import { mockEntradaEncontraEstadoDTO } from '../../test/mock-estado';
import { RemotoEncontraEstado } from './remoto-encontra-estado';

describe('RemotoEncontraEstado', () => {
  test('deve chamar ClienteHttp com os valores corretos', async () => {
    const url = 'outra_url';
    const clienteHttpSpy = new ClienteHttpSpy();
    const sut = new RemotoEncontraEstado(url, clienteHttpSpy);

    await sut.encontra(mockEntradaEncontraEstadoDTO);

    expect(clienteHttpSpy.url).toBe(`${url}/${mockEntradaEncontraEstadoDTO.cep}/json`);
    expect(clienteHttpSpy.method).toBe('get');
  });
});
