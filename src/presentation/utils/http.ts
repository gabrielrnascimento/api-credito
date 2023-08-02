import { ErroServidor } from '../errors';
import { type RespostaHttp } from '../interfaces';

export const requisicaoInvalida = (erro: Error): RespostaHttp => ({
  codigoStatus: 400,
  body: erro
});

export const naoEncontrado = (erro: Error): RespostaHttp => ({
  codigoStatus: 404,
  body: erro
});

export const erroServidor = (erro: Error): RespostaHttp => ({
  codigoStatus: 500,
  body: new ErroServidor(erro.stack)
});
