export class ErroRequisicaoInvalida extends Error {
  constructor () {
    super('Requisição inválida');
    this.name = 'ErroRequisicaoInvalida';
  }
}
