import { ErroDataInvalida } from '../../errors';
import { type Validador } from '../../interface';

export class ValidadorDataPagamento implements Validador {
  constructor (protected readonly campo: string) {
    this.campo = campo;
  }

  valida (entrada: any): Error {
    const data = new Date(entrada[this.campo]);
    const today = new Date();
    if (data <= today) return new ErroDataInvalida();
  }
}
