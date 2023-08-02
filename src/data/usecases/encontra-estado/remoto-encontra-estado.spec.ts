import { ErroInesperado } from '../../../domain/errors';
import { CodigoStatusHttp } from '../../../presentation/interfaces';
import { ClienteHttpSpy, mockEntradaEncontraEstadoDTO, mockModeloEstado } from '../../test';
import { RemotoEncontraEstado } from './remoto-encontra-estado';

type SutTypes = {
  sut: RemotoEncontraEstado
  clienteHttpSpy: ClienteHttpSpy
};

const criaSut = (url: string = 'qualquer_url'): SutTypes => {
  const clienteHttpSpy = new ClienteHttpSpy();
  clienteHttpSpy.resposta.body = mockModeloEstado;
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

    await sut.encontraEstado(mockEntradaEncontraEstadoDTO);

    expect(clienteHttpSpy.url).toBe(`${url}/${mockEntradaEncontraEstadoDTO.cep}/json`);
    expect(clienteHttpSpy.method).toBe('get');
  });

  test('deve lançar ErroInesperado se ClienteHttp retornar uma resposta de erro http', async () => {
    const { sut, clienteHttpSpy } = criaSut();
    clienteHttpSpy.resposta = {
      codigoStatus: CodigoStatusHttp.erroServidor
    };

    const promessa = sut.encontraEstado(mockEntradaEncontraEstadoDTO);

    await expect(promessa).rejects.toThrow(new ErroInesperado());
  });

  test('deve retornar ModeloEstado se ClienteHttp retornar 200', async () => {
    const { sut } = criaSut();

    const resposta = await sut.encontraEstado(mockEntradaEncontraEstadoDTO);

    expect(resposta).toEqual(mockModeloEstado);
  });
});
