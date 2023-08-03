import { DbListaCotacoes } from '../../../data/usecases/lista-cotacoes/db-lista-cotacoes';
import { cotacaoRepositorioFactory } from '../repositorios/cotacao';

export const dbListaCotacoesFactory = (): DbListaCotacoes => {
  return new DbListaCotacoes(cotacaoRepositorioFactory());
};
