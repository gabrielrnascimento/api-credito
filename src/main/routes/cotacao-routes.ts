import { type Router } from 'express';
import { adapteExpressRoute } from '../adapters/adapte-express-route';
import { criaCotacaoControladorFactory } from '../factories/controladores/cria-cotacao';

export default (router: Router): void => {
  router.post('/cotacao', adapteExpressRoute(criaCotacaoControladorFactory()));
};
