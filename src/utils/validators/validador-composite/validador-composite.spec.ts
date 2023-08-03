import { ValidadorStub } from '../../../presentation/test';
import { ErroDataInvalida } from '../../errors';
import { ValidadorComposite } from './validador-composite';

type SutTypes = {
  sut: ValidadorComposite
  campo: string
  validadorStubs: ValidadorStub[]
};

const criaSut = (): SutTypes => {
  const campo = 'qualquerCampo';
  const validadorStubs = [
    new ValidadorStub(),
    new ValidadorStub()
  ];
  const sut = new ValidadorComposite(validadorStubs);
  return {
    sut,
    campo,
    validadorStubs
  };
};

describe('ValidadorComposite', () => {
  test('deve retornar erro caso alguma validação falhe', () => {
    const { sut, campo, validadorStubs } = criaSut();
    jest.spyOn(validadorStubs[0], 'valida').mockReturnValueOnce(new Error());

    const erro = sut.valida({ [campo]: 'qualquer_valor' });

    expect(erro).toEqual(new Error());
  });

  test('deve retornar o primeiro erro caso mais de uma validação falhe', () => {
    const { sut, campo, validadorStubs } = criaSut();
    jest.spyOn(validadorStubs[0], 'valida').mockReturnValueOnce(new ErroDataInvalida());
    jest.spyOn(validadorStubs[1], 'valida').mockReturnValueOnce(new Error());

    const erro = sut.valida({ [campo]: 'qualquer_valor' });

    expect(erro).toEqual(new ErroDataInvalida());
  });
});
