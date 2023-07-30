export class ErroInesperado extends Error {
  constructor (mensagem?: string) {
    if (mensagem) { super(mensagem); } else {
      super('Ocorreu um erro inesperado');
    }
    this.name = 'ErroInesperado';
  }
}
