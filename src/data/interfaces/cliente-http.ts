import { type RequisicaoHttp, type RespostaHttp } from '../types';

export interface ClienteHttp<R = any> {
  requisicao: (requisicao: RequisicaoHttp) => Promise<RespostaHttp<R>>
}
