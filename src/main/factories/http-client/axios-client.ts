import { AxiosClienteHttp } from '../../../infra/http/axios-cliente-http';

export const axiosClienteHttpFactory = (): AxiosClienteHttp => {
  return new AxiosClienteHttp();
};
