import { type EntradaControladorCriaCotacaoDTO } from '../../data/dtos';
import { type EncontraEstado } from '../../domain/usecases';
import { type Controlador, type RequisicaoHttp, type RespostaHttp } from '../interfaces';

export class CotacaoControlador implements Controlador {
  constructor (private readonly encontraEstado: EncontraEstado) {
    this.encontraEstado = encontraEstado;
  }

  async trate (requisicao: RequisicaoHttp<EntradaControladorCriaCotacaoDTO>): Promise<RespostaHttp> {
    const { cep } = requisicao.body;
    await this.encontraEstado.encontraEstado({ cep });
    return null;
  }
}
