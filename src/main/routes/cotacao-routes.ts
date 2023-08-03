import { type Router } from 'express';
import { adapteExpressRoute } from '../adapters/adapte-express-route';
import { criaCotacaoControladorFactory } from '../factories/controladores/cria-cotacao';
import { listaCotacoesControladorFactory } from '../factories/controladores/lista-cotacoes';

export default (router: Router): void => {
  router.post('/cotacao', adapteExpressRoute(criaCotacaoControladorFactory()));
  router.get('/cotacoes', adapteExpressRoute(listaCotacoesControladorFactory()));
};
