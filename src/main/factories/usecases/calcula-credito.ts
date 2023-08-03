import { LocalCalculaCredito } from '../../../data/usecases/calcula-credito/local-calcula-credito';

export const localCalculaCreditoFactory = (): LocalCalculaCredito => {
  return new LocalCalculaCredito(parseFloat(process.env.TAXA_JUROS));
};
