import { mockRequisicaoHttp } from '../../data/test';
import { mockAxios } from '../test';
import { AxiosClienteHttp } from './axios-cliente-http';

jest.mock('axios');

describe('AxiosClienteHttp', () => {
  test('deve chamar axios.request com os valores corretos', async () => {
    const sut = new AxiosClienteHttp();
    const mockedAxios = mockAxios();

    await sut.requisicao(mockRequisicaoHttp());

    expect(mockedAxios.request).toHaveBeenCalledWith(mockRequisicaoHttp());
  });
});
