import { mongoUtil } from '../../server';
import { LocalCalculaCredito } from '../../../data/usecases/calcula-credito/local-calcula-credito';
import { DbCriaCotacao } from '../../../data/usecases/cria-cotacao/db-cria-cotacao';
import { RemotoEncontraEstado } from '../../../data/usecases/encontra-estado/remoto-encontra-estado';
import { DbEncontraPreco } from '../../../data/usecases/encontra-preco/db-encontra-preco';
import { CotacaoRepositorio } from '../../../infra/db/mongodb/cotacao-repositorio/cotacao-repositorio';
import { EstadoRepositorio } from '../../../infra/db/mongodb/estado-repositorio/estado-repositorio';
import { AxiosClienteHttp } from '../../../infra/http/axios-cliente-http';
import { CriaCotacaoControlador } from '../../../presentation/controllers/cria-cotacao-controlador/cria-cotacao-controlador';
import { criaCotacaoControladorValidadorFactory } from '../validadores/cria-cotacao';

export const criaCotacaoControladorFactory = (): CriaCotacaoControlador => {
  const axiosClientHttp = new AxiosClienteHttp();
  const remotoEncontraEstado = new RemotoEncontraEstado(process.env.VIA_CEP_API_URL, axiosClientHttp);
  const estadoRepositorio = new EstadoRepositorio(mongoUtil);
  const dbEncontraPreco = new DbEncontraPreco(estadoRepositorio);
  const localCalculaCredito = new LocalCalculaCredito(parseFloat(process.env.TAXA_JUROS));
  const cotacaoRepositorio = new CotacaoRepositorio(mongoUtil);
  const dbCriaCotacao = new DbCriaCotacao(cotacaoRepositorio);
  const validador = criaCotacaoControladorValidadorFactory();

  return new CriaCotacaoControlador(
    remotoEncontraEstado,
    dbEncontraPreco,
    localCalculaCredito,
    dbCriaCotacao,
    validador);
};
