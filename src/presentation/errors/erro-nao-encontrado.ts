export class ErroNaoEncontrado extends Error {
  constructor () {
    super('Não encontrado');
    this.name = 'ErroNaoEncontrado';
  }
}
