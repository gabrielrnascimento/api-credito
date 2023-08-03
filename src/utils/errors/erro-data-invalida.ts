export class ErroDataInvalida extends Error {
  constructor () {
    super('Data fornecida inválida');
    this.name = 'ErroDataInvalida';
  }
}
