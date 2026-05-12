import { describe, expect, it } from 'vitest';

import { getTitle } from '~/utils/seo-snippets';

describe('getTitle', () => {
  it('prefixa com StartBet e inclui o title informado', () => {
    const out = getTitle('Home');
    expect(out).toContain('StartBet:');
    expect(out).toContain('Home');
  });

  it('mantém o sufixo padrão do projeto', () => {
    const out = getTitle('Qualquer');
    expect(out).toContain('Aposta Esportiva');
    expect(out).toContain('Superodd');
    expect(out).toContain('Bônus');
    expect(out).toContain('Cassino');
    expect(out).toContain('Start.bet.br');
  });
});
