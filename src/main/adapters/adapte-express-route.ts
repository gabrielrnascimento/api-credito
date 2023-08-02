import { type Request, type Response, type RequestHandler } from 'express';
import { type Controlador } from '../../presentation/interfaces';

export const adapteExpressRoute = (controlador: Controlador): RequestHandler => {
  return async (req: Request, res: Response) => {
    const requisicao = {
      body: { ...(req.body || {}) },
      query: { ...(req.query || {}) },
      params: { ...(req.params || {}) }
    };

    const respostaHttp = await controlador.trate(requisicao);
    if (respostaHttp.codigoStatus >= 200 && respostaHttp.codigoStatus <= 299) {
      res.status(respostaHttp.codigoStatus).json(respostaHttp.body);
    } else {
      res.status(respostaHttp.codigoStatus).json({
        erro: respostaHttp.body.message
      });
    }
  };
};
