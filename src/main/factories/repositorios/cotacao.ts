import { CotacaoRepositorio } from '../../../infra/db/mongodb/cotacao-repositorio/cotacao-repositorio';
import { mongoUtilFactory } from '../database';

export const cotacaoRepositorioFactory = (): CotacaoRepositorio => {
  return new CotacaoRepositorio(mongoUtilFactory);
};
