import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { h, nextTick } from 'vue'

import StListItem from '~/components/ui/list/list-item/StListItem.vue'
import StUnorderedList from '~/components/ui/list/unordered-list/StUnorderedList.vue'
import { stListContextKey } from '~/components/ui/list/styleStList'

describe('StListItem', () => {
  it('renderiza li e dispara click quando clickable', async () => {
    const onClick = vi.fn()

    const wrapper = mount(StListItem, {
      props: { clickable: true, onClick },
      slots: { default: 'Item' }
    })

    expect(wrapper.element.tagName.toLowerCase()).toBe('li')
    const mainButton = wrapper.find('button[type="button"]')
    expect(mainButton.exists()).toBe(true)

    await mainButton.trigger('click')
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('renderiza startAdornment e endAdornment', () => {
    const wrapper = mount(StListItem, {
      props: { clickable: true },
      slots: { default: 'Item', startAdornment: 'S', endAdornment: 'E' }
    })

    expect(wrapper.text()).toContain('S')
    expect(wrapper.text()).toContain('Item')
    expect(wrapper.text()).toContain('E')
  })

  it('vertical: renderiza toggle e expande sub-lista inline', async () => {
    const wrapper = mount(StListItem, {
      props: { clickable: true },
      global: {
        provide: {
          [stListContextKey as symbol]: { navOrientation: 'vertical', level: 1 }
        }
      },
      slots: {
        default: () => [
          'Parent',
          h(StUnorderedList, null, { default: () => h('li', null, 'Sub') })
        ]
      }
    })

    const toggle = wrapper.find('button[aria-label="Abrir submenu"]')
    expect(toggle.exists()).toBe(true)

    const ul = wrapper.find('ul')
    expect(ul.exists()).toBe(true)
    expect(ul.element.parentElement?.className).toContain('hidden')

    await toggle.trigger('click')
    await nextTick()
    expect(ul.element.parentElement?.className).toContain('block')
  })

  it('horizontal: abre submenu via dropdown', async () => {
    const wrapper = mount(StListItem, {
      props: { clickable: true },
      attachTo: document.body,
      global: {
        provide: {
          [stListContextKey as symbol]: { navOrientation: 'horizontal', level: 1 }
        }
      },
      slots: {
        default: () => [
          'Parent',
          h(StUnorderedList, null, { default: () => h('li', null, 'Sub') })
        ]
      }
    })

    expect(wrapper.find('ul').exists()).toBe(false)
    expect(wrapper.find('dialog').exists()).toBe(false)

    const trigger = wrapper.find('button[aria-label="Abrir submenu"]')
    expect(trigger.exists()).toBe(true)

    await trigger.trigger('click')
    await nextTick()

    const dialog = wrapper.find('dialog')
    expect(dialog.exists()).toBe(true)
    expect(dialog.find('ul').exists()).toBe(true)

    wrapper.unmount()
  })

  it('horizontal: abre e fecha dropdown sem perder itens ao reabrir', async () => {
    const wrapper = mount(StListItem, {
      props: { clickable: true },
      attachTo: document.body,
      global: {
        provide: {
          [stListContextKey as symbol]: { navOrientation: 'horizontal', level: 1 }
        }
      },
      slots: {
        default: () => [
          'Parent',
          h(StUnorderedList, null, { default: () => [h('li', null, 'Sub A'), h('li', null, 'Sub B')] })
        ]
      }
    })

    const trigger = wrapper.find('button[aria-label="Abrir submenu"]')
    expect(trigger.exists()).toBe(true)

    await trigger.trigger('click')
    await nextTick()
    expect(wrapper.find('dialog').exists()).toBe(true)
    expect(wrapper.findAll('dialog ul li').length).toBe(2)

    await trigger.trigger('click')
    await nextTick()
    expect(wrapper.find('dialog').exists()).toBe(false)

    await trigger.trigger('click')
    await nextTick()
    expect(wrapper.find('dialog').exists()).toBe(true)
    expect(wrapper.findAll('dialog ul li').length).toBe(2)

    wrapper.unmount()
  })
})
