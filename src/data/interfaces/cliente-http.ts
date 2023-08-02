import { type RequisicaoHttp, type RespostaHttp } from '../../presentation/interfaces';

export interface ClienteHttp<R = any> {
  requisicao: (requisicao: RequisicaoHttp) => Promise<RespostaHttp<R>>
}
