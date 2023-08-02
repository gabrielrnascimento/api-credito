import { type RespostaHttp } from '../interfaces';

export const requisicaoInvalida = (erro: Error): RespostaHttp => ({
  codigoStatus: 400,
  body: erro
});

export const naoEncontrado = (erro: Error): RespostaHttp => ({
  codigoStatus: 404,
  body: erro
});
