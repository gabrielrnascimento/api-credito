import { type Validador } from '../../../utils/interface';
import { ValidadorCampoObrigatorio, ValidadorDataPagamento, ValidadorComposite } from '../../../utils/validators';

export const geraCriaCotacaoControladorValidador = (): ValidadorComposite => {
  const validadores: Validador[] = [];
  for (const campo of ['nome', 'cep', 'quantidade', 'dataPagamento']) {
    validadores.push(new ValidadorCampoObrigatorio(campo));
  }
  validadores.push(new ValidadorDataPagamento('dataPagamento'));
  return new ValidadorComposite(validadores);
};
