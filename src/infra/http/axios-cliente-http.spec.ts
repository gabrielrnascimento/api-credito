import type axios from 'axios';
import { mockRequisicaoHttp } from '../../data/test';
import { mockAxios } from '../test';
import { AxiosClienteHttp } from './axios-cliente-http';

jest.mock('axios');

type SutTypes = {
  sut: AxiosClienteHttp
  mockedAxios: jest.Mocked<typeof axios>
};

const criaSut = (): SutTypes => {
  const sut = new AxiosClienteHttp();
  const mockedAxios = mockAxios();

  return {
    sut,
    mockedAxios
  };
};

describe('AxiosClienteHttp', () => {
  test('deve chamar axios.request com os valores corretos', async () => {
    const { sut, mockedAxios } = criaSut();

    await sut.requisicao(mockRequisicaoHttp());

    expect(mockedAxios.request).toHaveBeenCalledWith(mockRequisicaoHttp());
  });

  test('deve retornar resposta correta', async () => {
    const { sut, mockedAxios } = criaSut();

    const resposta = await sut.requisicao(mockRequisicaoHttp());
    const respostaAxios = await mockedAxios.request.mock.results[0].value;

    expect(resposta).toEqual({
      codigoStatus: respostaAxios.status,
      body: respostaAxios.data
    });
  });

  test('deve retornar erro correto', async () => {
    const { sut, mockedAxios } = criaSut();
    mockedAxios.request.mockRejectedValueOnce({
      response: {
        status: 500,
        statusText: 'Server error'
      },
      stack: 'qualquer_mensagem'
    });

    const resposta = await sut.requisicao(mockRequisicaoHttp());

    expect(resposta).toEqual({
      codigoStatus: 500,
      body: {
        mensagem: 'Server error',
        stack: 'qualquer_mensagem'
      }
    });
  });
});
