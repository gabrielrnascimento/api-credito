import { type EntradaControladorCriaCotacaoDTO } from '../../data/dtos';
import { mockEntradaCriaCotacaoDTO, mockEntradaEncontraEstadoDTO } from '../../data/test';
import { type RequisicaoHttp } from '../interfaces';

const { cep } = mockEntradaEncontraEstadoDTO;
const { nome, quantidade, dataPagamento } = mockEntradaCriaCotacaoDTO;

export const mockRequisicaoHttpCriaCotacao: RequisicaoHttp<EntradaControladorCriaCotacaoDTO> = {
  body: {
    nome,
    cep,
    quantidade,
    dataPagamento
  }
};
