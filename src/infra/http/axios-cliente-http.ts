import axios from 'axios';
import { type RequisicaoHttp, type RespostaHttp } from '../../data/types/http';
import { type ClienteHttp } from '../../data/interfaces';

export class AxiosClienteHttp implements ClienteHttp {
  async requisicao (requisicao: RequisicaoHttp): Promise<RespostaHttp<any>> {
    let respostaAxios: any;
    try {
      respostaAxios = await axios.request(requisicao);
    } catch (error) {
      const { status, statusText } = error.response;
      respostaAxios = { status, data: { mensagem: statusText, stack: error.stack } };
    }
    return {
      codigoStatus: respostaAxios.status,
      body: respostaAxios.data
    };
  }
}
