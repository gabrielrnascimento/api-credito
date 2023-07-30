import { type EntradaEncontraEstadoDTO } from '../../dtos';
import { type ClienteHttp } from '../../interfaces/cliente-http';
import { type RequisicaoHttp } from '../../types/http';

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
    await this.clienteHttp.requisicao(requisicao);
  }
}
