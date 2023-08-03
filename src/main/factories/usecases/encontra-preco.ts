import { DbEncontraPreco } from '../../../data/usecases/encontra-preco/db-encontra-preco';
import { estadoRepositorioFactory } from '../repositorios/estado';

export const dbEncontraPrecoFactory = (): DbEncontraPreco => {
  return new DbEncontraPreco(estadoRepositorioFactory());
};
