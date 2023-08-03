import { ErroCampoObrigatorioFaltando } from '../../errors';
import { type Validador } from '../../interface';

export class ValidadorCampoObrigatorio implements Validador {
  constructor (private readonly campo: string) {
    this.campo = campo;
  }

  valida (entrada: any): Error {
    if (!entrada[this.campo]) {
      return new ErroCampoObrigatorioFaltando(this.campo);
    }
  }
}
