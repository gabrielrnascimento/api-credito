import { type Validador } from '../../utils/interface';

export class ValidadorStub implements Validador {
  valida (entrada: any): Error {
    return null;
  }
}
