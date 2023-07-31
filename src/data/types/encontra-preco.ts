import { type ModeloEstado, type ModeloPreco } from '../../domain/models';

export type ModeloEstadoPreco = Pick<ModeloEstado, 'uf'> & Pick<ModeloPreco, 'preco'>;
