import { ErroInesperado } from '../../../domain/errors';
import { type ModeloEstado } from '../../../domain/models';
import { type EncontraEstado } from '../../../domain/usecases';
import { ErroNaoEncontrado, ErroRequisicaoInvalida } from '../../../presentation/errors';
import { type RequisicaoHttp, CodigoStatusHttp } from '../../../presentation/interfaces';
import { type EntradaEncontraEstadoDTO } from '../../dtos';
import { type ClienteHttp } from '../../interfaces/cliente-http';

export class RemotoEncontraEstado implements EncontraEstado {
  constructor (
    private readonly url: string,
    private readonly clienteHttp: ClienteHttp
  ) {
    this.url = url;
    this.clienteHttp = clienteHttp;
  }

  async encontraEstado (dados: EntradaEncontraEstadoDTO): Promise<ModeloEstado> {
    const requisicao: RequisicaoHttp = {
      method: 'get',
      url: `${this.url}/${dados.cep}/json`
    };

    const resposta = await this.clienteHttp.requisicao(requisicao);

    switch (resposta.codigoStatus) {
      case CodigoStatusHttp.ok: {
        if (resposta.body.erro) throw new ErroNaoEncontrado();
        return { uf: resposta.body.uf };
      }
      case CodigoStatusHttp.requisicaoInvalida: throw new ErroRequisicaoInvalida();
      default: throw new ErroInesperado();
    }
  }
}
