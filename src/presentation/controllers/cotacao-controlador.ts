import { type EntradaControladorCriaCotacaoDTO } from '../../data/dtos';
import { type EncontraEstado } from '../../domain/usecases';
import { ErroNaoEncontrado, ErroRequisicaoInvalida } from '../errors';
import { type Controlador, type RequisicaoHttp, type RespostaHttp } from '../interfaces';
import { naoEncontrado, requisicaoInvalida } from '../utils';

export class CotacaoControlador implements Controlador {
  constructor (private readonly encontraEstado: EncontraEstado) {
    this.encontraEstado = encontraEstado;
  }

  async trate (requisicao: RequisicaoHttp<EntradaControladorCriaCotacaoDTO>): Promise<RespostaHttp> {
    const { cep } = requisicao.body;
    try {
      await this.encontraEstado.encontraEstado({ cep });
    } catch (erro) {
      switch (true) {
        case erro instanceof ErroRequisicaoInvalida: return requisicaoInvalida(erro);
        case erro instanceof ErroNaoEncontrado: return naoEncontrado(erro);
      }
    }
    return null;
  }
}
