import { DbCriaCotacao } from '../../../data/usecases/cria-cotacao/db-cria-cotacao';
import { cotacaoRepositorioFactory } from '../repositorios/cotacao';

export const dbCriaCotacaoFactory = (): DbCriaCotacao => {
  return new DbCriaCotacao(cotacaoRepositorioFactory());
};
