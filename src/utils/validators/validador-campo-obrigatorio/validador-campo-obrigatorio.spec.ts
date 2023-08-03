import { ErroCampoObrigatorioFaltando } from '../../errors';
import { ValidadorCampoObrigatorio } from './validador-campo-obrigatorio';

type SutTypes = {
  sut: ValidadorCampoObrigatorio
  campo: string
};

const criaSut = (): SutTypes => {
  const campo = 'qualquerCampo';
  const sut = new ValidadorCampoObrigatorio(campo);
  return {
    sut,
    campo
  };
};

describe('ValidadorCampoObrigatorio', () => {
  test('deve retornar ErroCampoObrigatorioFaltando caso validaçao falhe', () => {
    const { sut, campo } = criaSut();
    const erro = sut.valida({ campoInvalido: 'qualquer_valor' });

    expect(erro).toEqual(new ErroCampoObrigatorioFaltando(campo));
  });

  test('deve retornar falsy caso validaçao passe', () => {
    const { sut, campo } = criaSut();
    const erro = sut.valida({ [campo]: 'qualquer_valor' });

    expect(erro).toBeFalsy();
  });
});
