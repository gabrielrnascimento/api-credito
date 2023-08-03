import { RemotoEncontraEstado } from '../../../data/usecases/encontra-estado/remoto-encontra-estado';
import { axiosClienteHttpFactory } from '../http-client/axios-client';

export const remotoEncontraEstadoFactory = (): RemotoEncontraEstado => {
  return new RemotoEncontraEstado(process.env.VIA_CEP_API_URL, axiosClienteHttpFactory());
};
