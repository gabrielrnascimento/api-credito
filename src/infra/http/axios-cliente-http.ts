import axios from 'axios';
import { type ClienteHttp } from '../../data/interfaces/cliente-http';
import { type RequisicaoHttp, type RespostaHttp } from '../../data/types/http';

export class AxiosClienteHttp implements ClienteHttp {
  async requisicao (requisicao: RequisicaoHttp): Promise<RespostaHttp<any>> {
    const respostaAxios = await axios.request(requisicao);
    return {
      codigoStatus: respostaAxios.status,
      body: respostaAxios.data
    };
  }
}
