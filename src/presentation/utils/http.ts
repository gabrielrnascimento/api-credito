import { type RespostaHttp } from '../interfaces';

export const requisicaoInvalida = (erro: Error): RespostaHttp => ({
  codigoStatus: 400,
  body: erro
});
