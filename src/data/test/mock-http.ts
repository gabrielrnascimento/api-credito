import { type ClienteHttp } from '../interfaces';
import { type MetodoHttp, type RespostaHttp, CodigoStatusHttp, type RequisicaoHttp } from '../types';

export class ClienteHttpSpy<R = any> implements ClienteHttp<R> {
  public method?: MetodoHttp;
  public url?: string;
  public body?: any;
  public headers?: any;
  public data?: any;
  public resposta?: RespostaHttp = {
    codigoStatus: CodigoStatusHttp.ok
  };

  async requisicao (request: RequisicaoHttp): Promise<RespostaHttp> {
    this.method = request.method;
    this.url = request.url;
    this.body = request.body;
    this.headers = request.headers;
    this.data = request.data;
    return this.resposta;
  }
}

export const mockRequisicaoHttp = (): RequisicaoHttp => ({
  method: 'post',
  url: 'qualquer_valor',
  body: { field: 'qualquer_valor' },
  headers: { field: 'qualquer_valor' },
  data: { field: 'qualquer_valor' }
});
