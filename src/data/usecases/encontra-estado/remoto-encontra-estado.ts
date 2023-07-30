import { ErroInesperado } from '../../../domain/errors';
import { type EntradaEncontraEstadoDTO } from '../../dtos';
import { type ClienteHttp } from '../../interfaces/cliente-http';
import { CodigoStatusHttp, type RequisicaoHttp } from '../../types/http';

export class RemotoEncontraEstado {
  constructor (
    private readonly url: string,
    private readonly clienteHttp: ClienteHttp
  ) {
    this.url = url;
    this.clienteHttp = clienteHttp;
  }

  async encontra (data: EntradaEncontraEstadoDTO): Promise<void> {
    const requisicao: RequisicaoHttp = {
      method: 'get',
      url: `${this.url}/${data.cep}/json`
    };

    const resposta = await this.clienteHttp.requisicao(requisicao);

    switch (resposta.codigoStatus) {
      case CodigoStatusHttp.ok: return null;
      default: throw new ErroInesperado();
    }
  }
}
