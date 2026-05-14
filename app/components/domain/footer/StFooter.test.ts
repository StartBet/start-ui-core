import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import { ref } from 'vue';

vi.mock('~/components/ui/illustration/StIllustration.vue', () => ({
  default: { template: '<img data-test="brand" />' }
}));

vi.mock('~/components/ui/grid/StGrid.vue', () => ({
  default: { template: '<div><slot /></div>' }
}));

vi.mock('~/components/ui/paper/StPaper.vue', () => ({
  default: { template: '<section><slot /></section>' }
}));

vi.mock('~/components/ui/typography/StTypography.vue', () => ({
  default: { template: '<p><slot /></p>' }
}));

vi.mock('~/services/themeService', () => ({
  useThemeService: () => ({ theme: ref<'dark' | 'light'>('dark') })
}));

import StFooter from './StFooter.vue';

describe('StFooter', () => {
  it('renderiza footer e lista "Sobre"', () => {
    const wrapper = mount(StFooter);
    expect(wrapper.element.tagName.toLowerCase()).toBe('footer');
    expect(wrapper.text()).toContain('Sobre');
    expect(wrapper.text()).toContain('Sobre Nós');
    expect(wrapper.text()).toContain('Autoexclusão Centralizada');
  });
});
