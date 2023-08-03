import { type Validador } from '../../interface';

export class ValidadorComposite implements Validador {
  constructor (private readonly validadores: Validador[]) {
    this.validadores = validadores;
  }

  valida (entrada: any): Error {
    for (const validador of this.validadores) {
      const erro = validador.valida(entrada);
      if (erro) return erro;
    }
  }
}
