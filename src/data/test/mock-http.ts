import { type ClienteHttp } from '../interfaces/cliente-http';
import { type MetodoHttp, type RespostaHttp, CodigoStatusHttp, type RequisicaoHttp } from '../types/http';

export class ClienteHttpSpy<R = any> implements ClienteHttp<R> {
  public method?: MetodoHttp;
  public url?: string;
  public body?: any;
  public headers?: any;
  public data?: any;
  public response?: RespostaHttp = {
    codigoStatus: CodigoStatusHttp.ok
  };

  async requisicao (request: RequisicaoHttp): Promise<RespostaHttp> {
    this.method = request.method;
    this.url = request.url;
    this.body = request.body;
    this.headers = request.headers;
    this.data = request.data;
    return this.response;
  }
}
