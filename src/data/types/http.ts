export type MetodoHttp = 'post' | 'get';

export type RequisicaoHttp = {
  method: MetodoHttp
  url: string
  headers?: any
  body?: any
  data?: any
};

export enum CodigoStatusHttp {
  ok = 200
}

export type RespostaHttp<B = any> = {
  codigoStatus: CodigoStatusHttp
  body?: B
};
