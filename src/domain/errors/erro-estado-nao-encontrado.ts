export class ErroEstadoNaoEncontrado extends Error {
  constructor () {
    super('Estado não encontrado na base de dados');
    this.name = 'ErroEstadoNaoEncontrado';
  }
}
