import { type ModeloEstado } from '../../domain/models';
import { type EntradaEncontraEstadoDTO } from '../dtos';

export const mockEntradaEncontraEstadoDTO: EntradaEncontraEstadoDTO = {
  cep: '88036-160'
};

export const mockRespostaViaCepAPI = {
  cep: '88036-160',
  logradouro: 'Rua Vereador Hélio Abreu',
  complemento: '',
  bairro: 'Trindade',
  localidade: 'Florianópolis',
  uf: 'SC',
  ibge: '4205407',
  gia: '',
  ddd: '48',
  siafi: '8105'
};

export const mockModeloEstado: ModeloEstado = {
  uf: mockRespostaViaCepAPI.uf
};
