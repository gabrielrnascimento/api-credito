import { type EntradaCriaCotacaoControladorDTO } from '../../data/dtos';
import { mockEntradaCriaCotacaoDTO, mockEntradaEncontraEstadoDTO } from '../../data/test';
import { type RequisicaoHttp } from '../interfaces';

const { cep } = mockEntradaEncontraEstadoDTO;
const { nome, quantidade, dataPagamento } = mockEntradaCriaCotacaoDTO;

export const mockRequisicaoHttpCriaCotacao: RequisicaoHttp<EntradaCriaCotacaoControladorDTO> = {
  body: {
    nome,
    cep,
    quantidade,
    dataPagamento
  }
};
