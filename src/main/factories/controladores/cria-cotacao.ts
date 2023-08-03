import { CriaCotacaoControlador } from '../../../presentation/controllers/cria-cotacao-controlador/cria-cotacao-controlador';
import { criaCotacaoControladorValidadorFactory } from '../validadores/cria-cotacao';
import { remotoEncontraEstadoFactory } from '../usecases/encontra-estado';
import { dbEncontraPrecoFactory } from '../usecases/encontra-preco';
import { localCalculaCreditoFactory } from '../usecases/calcula-credito';
import { dbCriaCotacaoFactory } from '../usecases/cria-cotacao';

export const criaCotacaoControladorFactory = (): CriaCotacaoControlador => {
  const remotoEncontraEstado = remotoEncontraEstadoFactory();
  const dbEncontraPreco = dbEncontraPrecoFactory();
  const localCalculaCredito = localCalculaCreditoFactory();
  const dbCriaCotacao = dbCriaCotacaoFactory();
  const validador = criaCotacaoControladorValidadorFactory();
  return new CriaCotacaoControlador(
    remotoEncontraEstado,
    dbEncontraPreco,
    localCalculaCredito,
    dbCriaCotacao,
    validador
  );
};
