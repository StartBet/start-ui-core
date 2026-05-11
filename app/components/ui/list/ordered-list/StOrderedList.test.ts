import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import StOrderedList from '~/components/ui/list/ordered-list/StOrderedList.vue'

describe('StOrderedList', () => {
  it('renderiza ol e aplica defaults', () => {
    const wrapper = mount(StOrderedList, { slots: { default: '<li>Item</li>' } })
    expect(wrapper.element.tagName.toLowerCase()).toBe('ol')

    const cls = wrapper.attributes('class')
    expect(cls).toContain('list-decimal')
    expect(cls).toContain('pl-ds-4')
    expect(cls).toContain('flex-col')
  })

  it('aplica orientation horizontal', () => {
    const wrapper = mount(StOrderedList, {
      props: { orientation: 'horizontal' },
      slots: { default: '<li>Item</li>' }
    })

    const cls = wrapper.attributes('class')
    expect(cls).toContain('flex-row')
    expect(cls).toContain('list-none')
    expect(cls).toContain('pl-0')
  })

  it('dense remove gap', () => {
    const wrapper = mount(StOrderedList, {
      props: { dense: true },
      slots: { default: '<li>Item</li>' }
    })
    const cls = wrapper.attributes('class')
    expect(cls).toContain('gap-0')
    expect(cls).not.toContain('gap-ds-1')
    expect(cls).not.toContain('gap-ds-2')
  })

  it('força render vertical para sub-lista mesmo quando parent é horizontal', () => {
    const Host = {
      components: { StOrderedList },
      template: `
        <StOrderedList orientation="horizontal">
          <StOrderedList>
            <li>Sub</li>
          </StOrderedList>
        </StOrderedList>
      `
    }

    const wrapper = mount(Host)
    const ols = wrapper.findAll('ol')
    expect(ols.length).toBe(2)

    expect(ols[0].attributes('class')).toContain('flex-row')
    expect(ols[1].attributes('class')).toContain('flex-col')
  })
})
