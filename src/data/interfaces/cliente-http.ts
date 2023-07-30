import { type RequisicaoHttp, type RespostaHttp } from '../types/http';

export interface ClienteHttp<R = any> {
  requisicao: (requisicao: RequisicaoHttp) => Promise<RespostaHttp<R>>
}
