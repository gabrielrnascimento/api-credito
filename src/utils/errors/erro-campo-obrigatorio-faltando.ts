export class ErroCampoObrigatorioFaltando extends Error {
  constructor (campo: string) {
    super(`Faltando campo obrigatório: ${campo}`);
    this.name = 'ErroCampoObrigatorioFaltando';
  }
}
