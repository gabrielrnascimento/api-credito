import { EstadoRepositorio } from '../../../infra/db/mongodb/estado-repositorio/estado-repositorio';
import { mongoUtil } from '../../server';

export const estadoRepositorioFactory = (): EstadoRepositorio => {
  return new EstadoRepositorio(mongoUtil);
};
