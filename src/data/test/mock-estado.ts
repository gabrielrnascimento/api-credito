import { type ModeloEstado } from '../../domain/models';
import { type EntradaEncontraEstadoDTO } from '../dtos';

export const mockEntradaEncontraEstadoDTO: EntradaEncontraEstadoDTO = {
  cep: '02377-080'
};

export const mockRespostaViaCepAPI = {
  cep: '02377-080',
  logradouro: 'Rua Professor Antônio Castelar de Franceschi',
  complemento: '',
  bairro: 'Horto Florestal',
  localidade: 'São Paulo',
  uf: 'SP',
  ibge: '3550308',
  gia: '1004',
  ddd: '11',
  siafi: '7107'
};

export const mockModeloEstado: ModeloEstado = {
  uf: mockRespostaViaCepAPI.uf
};
