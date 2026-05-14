import { describe, expect, it } from 'vitest';

import { splitTextIntoLines } from '~/utils/splitTextIntoLines';

describe('splitTextIntoLines', () => {
  it('normaliza lineCount <= 1 e retorna texto trimado', () => {
    expect(splitTextIntoLines('  A B  ', 1)).toEqual(['A B']);
    expect(splitTextIntoLines('  A B  ', 0)).toEqual(['A B']);
  });

  it('retorna [] quando não há palavras', () => {
    expect(splitTextIntoLines('   ', 2)).toEqual([]);
  });

  it('divide palavras igualmente e distribui o resto nas primeiras linhas', () => {
    expect(splitTextIntoLines('Um dois tres quatro cinco', 2)).toEqual([
      'Um dois tres',
      'quatro cinco'
    ]);
  });

  it('limita o número de linhas ao número de palavras', () => {
    expect(splitTextIntoLines('Um dois', 5)).toEqual(['Um', 'dois']);
  });
});
