import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import StUnorderedList from '~/components/ui/list/unordered-list/StUnorderedList.vue'

describe('StUnorderedList', () => {
  it('renderiza ul e aplica defaults', () => {
    const wrapper = mount(StUnorderedList, { slots: { default: '<li>Item</li>' } })
    expect(wrapper.element.tagName.toLowerCase()).toBe('ul')

    const cls = wrapper.attributes('class')
    expect(cls).toContain('list-none')
    expect(cls).toContain('flex')
    expect(cls).toContain('flex-col')
  })

  it('aplica orientation horizontal', () => {
    const wrapper = mount(StUnorderedList, {
      props: { orientation: 'horizontal' },
      slots: { default: '<li>Item</li>' }
    })

    const cls = wrapper.attributes('class')
    expect(cls).toContain('flex-row')
    expect(cls).toContain('flex-wrap')
  })

  it('dense remove gap', () => {
    const wrapper = mount(StUnorderedList, {
      props: { dense: true },
      slots: { default: '<li>Item</li>' }
    })
    const cls = wrapper.attributes('class')
    expect(cls).toContain('gap-0')
    expect(cls).not.toContain('gap-ds-1')
  })

  it('força render vertical para sub-lista mesmo quando parent é horizontal', () => {
    const Host = {
      components: { StUnorderedList },
      template: `
        <StUnorderedList orientation="horizontal">
          <StUnorderedList>
            <li>Sub</li>
          </StUnorderedList>
        </StUnorderedList>
      `
    }

    const wrapper = mount(Host)
    const uls = wrapper.findAll('ul')
    expect(uls.length).toBe(2)

    expect(uls[0].attributes('class')).toContain('flex-row')
    expect(uls[1].attributes('class')).toContain('flex-col')
  })
})
