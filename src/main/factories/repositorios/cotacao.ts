import { CotacaoRepositorio } from '../../../infra/db/mongodb/cotacao-repositorio/cotacao-repositorio';
import { mongoUtil } from '../../server';

export const cotacaoRepositorioFactory = (): CotacaoRepositorio => {
  return new CotacaoRepositorio(mongoUtil);
};
