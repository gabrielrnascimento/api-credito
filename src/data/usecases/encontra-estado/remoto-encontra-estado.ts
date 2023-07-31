import { ErroInesperado } from '../../../domain/errors';
import { type ModeloEstado } from '../../../domain/models';
import { type EncontraEstado } from '../../../domain/usecases';
import { type EntradaEncontraEstadoDTO } from '../../dtos';
import { type ClienteHttp } from '../../interfaces/cliente-http';
import { CodigoStatusHttp, type RequisicaoHttp } from '../../types/http';

export class RemotoEncontraEstado implements EncontraEstado {
  constructor (
    private readonly url: string,
    private readonly clienteHttp: ClienteHttp
  ) {
    this.url = url;
    this.clienteHttp = clienteHttp;
  }

  async encontra (dados: EntradaEncontraEstadoDTO): Promise<ModeloEstado> {
    const requisicao: RequisicaoHttp = {
      method: 'get',
      url: `${this.url}/${dados.cep}/json`
    };

    const resposta = await this.clienteHttp.requisicao(requisicao);

    switch (resposta.codigoStatus) {
      case CodigoStatusHttp.ok: return { uf: resposta.body.uf };
      default: throw new ErroInesperado();
    }
  }
}
