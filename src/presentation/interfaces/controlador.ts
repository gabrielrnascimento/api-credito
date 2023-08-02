import { type RequisicaoHttp, type RespostaHttp } from './http';

export interface Controlador {
  trate: (requisicao: RequisicaoHttp) => Promise<RespostaHttp>
}
