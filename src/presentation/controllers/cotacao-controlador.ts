import { type EntradaControladorCriaCotacaoDTO } from '../../data/dtos';
import { ErroEstadoNaoEncontrado } from '../../domain/errors';
import { type EncontraPreco, type EncontraEstado } from '../../domain/usecases';
import { ErroNaoEncontrado, ErroRequisicaoInvalida } from '../errors';
import { type Controlador, type RequisicaoHttp, type RespostaHttp } from '../interfaces';
import { erroServidor, naoEncontrado, requisicaoInvalida } from '../utils';

export class CotacaoControlador implements Controlador {
  constructor (
    private readonly encontraEstado: EncontraEstado,
    private readonly encontraPreco: EncontraPreco
  ) {
    this.encontraEstado = encontraEstado;
    this.encontraPreco = encontraPreco;
  }

  async trate (requisicao: RequisicaoHttp<EntradaControladorCriaCotacaoDTO>): Promise<RespostaHttp> {
    const { cep } = requisicao.body;
    try {
      const { uf } = await this.encontraEstado.encontraEstado({ cep });
      await this.encontraPreco.encontraPreco({ uf });
    } catch (erro) {
      switch (true) {
        case erro instanceof ErroRequisicaoInvalida: return requisicaoInvalida(erro);
        case erro instanceof ErroNaoEncontrado: return naoEncontrado(erro);
        case erro instanceof ErroEstadoNaoEncontrado: return naoEncontrado(erro);
        default: return erroServidor(erro);
      }
    }
    return null;
  }
}
