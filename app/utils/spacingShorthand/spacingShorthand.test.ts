import { describe, expect, it } from 'vitest';

import { spacingShorthandToClasses } from '~/utils/spacingShorthand';

describe('spacingShorthandToClasses', () => {
  it('retorna [] quando value é vazio/undefined', () => {
    expect(spacingShorthandToClasses(undefined, 'p')).toEqual([]);
    expect(spacingShorthandToClasses('', 'p')).toEqual([]);
  });

  it('1 valor: aplica regra diretamente', () => {
    expect(spacingShorthandToClasses('2', 'p')).toEqual(['p-ds-2']);
    expect(spacingShorthandToClasses('0', 'm')).toEqual(['m-0']);
    expect(spacingShorthandToClasses('auto', 'm')).toEqual(['m-auto']);
  });

  it('2 valores: aplica y e x', () => {
    expect(spacingShorthandToClasses('2 4', 'p')).toEqual([
      'py-ds-2',
      'px-ds-4'
    ]);
    expect(spacingShorthandToClasses('4 auto', 'm')).toEqual([
      'my-ds-4',
      'mx-auto'
    ]);
  });

  it('3 valores: aplica t, x, b', () => {
    expect(spacingShorthandToClasses('1 2 3', 'p')).toEqual([
      'pt-ds-1',
      'px-ds-2',
      'pb-ds-3'
    ]);
  });

  it('4 valores: aplica t, r, b, l', () => {
    expect(spacingShorthandToClasses('1 2 3 4', 'm')).toEqual([
      'mt-ds-1',
      'mr-ds-2',
      'mb-ds-3',
      'ml-ds-4'
    ]);
  });

  it('com prefixo responsivo: prefixa classes', () => {
    expect(spacingShorthandToClasses('2 4', 'p', 'sm')).toEqual([
      'sm:py-ds-2',
      'sm:px-ds-4'
    ]);
  });

  it('normaliza espaços múltiplos', () => {
    expect(spacingShorthandToClasses('  2   4  ', 'p')).toEqual([
      'py-ds-2',
      'px-ds-4'
    ]);
  });
});
