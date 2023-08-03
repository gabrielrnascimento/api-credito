import { EstadoRepositorio } from '../../../infra/db/mongodb/estado-repositorio/estado-repositorio';
import { mongoUtilFactory } from '../database';

export const estadoRepositorioFactory = (): EstadoRepositorio => {
  return new EstadoRepositorio(mongoUtilFactory);
};
