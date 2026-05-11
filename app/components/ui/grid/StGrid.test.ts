import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import StGrid from '~/components/ui/grid/StGrid.vue'

describe('StGrid', () => {
  it('renderiza slot e aplica classes base', () => {
    const wrapper = mount(StGrid, { slots: { default: '<div data-testid="x" />' } })
    expect(wrapper.find('[data-testid="x"]').exists()).toBe(true)
    expect(wrapper.attributes('class')).toContain('grid')
    expect(wrapper.attributes('class')).toContain('grid-cols-1')
  })

  it('aplica cols e gaps com tokens ds', () => {
    const wrapper = mount(StGrid, { props: { cols: 3, gap: 2, gapX: 4, gapY: 1 } })
    const cls = wrapper.attributes('class')
    expect(cls).toContain('grid-cols-3')
    expect(cls).toContain('gap-ds-2')
    expect(cls).toContain('gap-x-ds-4')
    expect(cls).toContain('gap-y-ds-1')
  })

  it('aplica padding/margin shorthand', () => {
    const wrapper = mount(StGrid, { props: { padding: '1 2', margin: '3 4 5 6' } })
    const cls = wrapper.attributes('class')
    expect(cls).toContain('py-ds-1')
    expect(cls).toContain('px-ds-2')
    expect(cls).toContain('mt-ds-3')
    expect(cls).toContain('mr-ds-4')
    expect(cls).toContain('mb-ds-5')
    expect(cls).toContain('ml-ds-6')
  })

  it('aplica responsivo com prefixos', () => {
    const wrapper = mount(StGrid, { props: { smCols: 2, mdCols: 3, lgCols: 4, smPadding: '1' } })
    const cls = wrapper.attributes('class')
    expect(cls).toContain('sm:grid-cols-2')
    expect(cls).toContain('md:grid-cols-3')
    expect(cls).toContain('lg:grid-cols-4')
    expect(cls).toContain('sm:p-ds-1')
  })
})
