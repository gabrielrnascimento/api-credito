import axios from 'axios';

export const mockAxiosRespostaHttp = (): any => ({
  data: {
    campo: 'qualquer_valor'
  },
  status: 200
});

export const mockAxios = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  mockedAxios.request.mockClear().mockResolvedValue(mockAxiosRespostaHttp());
  return mockedAxios;
};
