export class ErroServidor extends Error {
  constructor (stack: string) {
    super('Erro interno do servidor');
    this.name = 'ErroServidor';
    this.stack = stack;
  }
}
