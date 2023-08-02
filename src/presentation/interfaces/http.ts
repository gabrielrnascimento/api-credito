export type MetodoHttp = 'post' | 'get';

export type RequisicaoHttp<B = any> = {
  method?: MetodoHttp
  url?: string
  headers?: any
  body?: B
  data?: any
};

export enum CodigoStatusHttp {
  ok = 200,
  criado = 201,
  requisicaoInvalida = 400,
  naoEncontrado = 404,
  erroServidor = 500
}

export type RespostaHttp<B = any> = {
  codigoStatus: CodigoStatusHttp
  body?: B
};
