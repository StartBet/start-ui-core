import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import StIcon from '~/components/ui/icon/StIcon.vue'

describe('StIcon', () => {
  const classList = (cls: string | undefined) => (cls ?? '').trim().split(/\s+/).filter(Boolean)

  it('renderiza svg quando o ícone existe e aplica size', () => {
    const wrapper = mount(StIcon, { props: { name: 'plus', size: 2, ariaLabel: 'Adicionar' } })
    expect(wrapper.element.tagName.toLowerCase()).toBe('svg')
    expect(wrapper.attributes('aria-label')).toBe('Adicionar')

    const list = classList(wrapper.attributes('class'))
    expect(list).toContain('text-[theme(spacing.ds-2)]')
  })

  it('faz fallback para span quando o ícone não existe', () => {
    const wrapper = mount(StIcon, { props: { name: 'does-not-exist', ariaLabel: 'X' } })
    expect(wrapper.element.tagName.toLowerCase()).toBe('span')
    expect(wrapper.attributes('aria-label')).toBe('X')
  })
})
