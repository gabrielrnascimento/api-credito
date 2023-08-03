import { ValidadorStub } from '../../../presentation/test';
import { ValidadorComposite } from './validador-composite';

describe('ValidadorComposite', () => {
  test('deve retornar erro caso alguma validação falhe', () => {
    const campo = 'qualquerCampo';
    const validadorStubs = [
      new ValidadorStub(),
      new ValidadorStub()
    ];
    const sut = new ValidadorComposite(validadorStubs);
    jest.spyOn(validadorStubs[0], 'valida').mockReturnValueOnce(new Error());

    const erro = sut.valida({ [campo]: 'qualquer_valor' });

    expect(erro).toEqual(new Error());
  });
});
