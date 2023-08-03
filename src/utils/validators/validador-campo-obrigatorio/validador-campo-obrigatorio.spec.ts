import { ErroCampoObrigatorioFaltando } from '../../errors';
import { ValidadorCampoObrigatorio } from './validador-campo-obrigatorio';

describe('ValidadorCampoObrigatorio', () => {
  test('deve retornar ErroCampoObrigatorioFaltando caso validaçao falhe', () => {
    const campo = 'qualquer_campo';
    const sut = new ValidadorCampoObrigatorio(campo);

    const erro = sut.valida({ campoInvalido: 'outro_campo' });

    expect(erro).toEqual(new ErroCampoObrigatorioFaltando(campo));
  });
});
