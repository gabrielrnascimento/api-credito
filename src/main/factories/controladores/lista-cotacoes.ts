import { ListaCotacoesControlador } from '../../../presentation/controllers/lista-cotacoes-controlador/lista-cotacoes-controlador';
import { dbListaCotacoesFactory } from '../usecases/lista-cotacoes';

export const listaCotacoesControladorFactory = (): ListaCotacoesControlador => {
  return new ListaCotacoesControlador(dbListaCotacoesFactory());
};
