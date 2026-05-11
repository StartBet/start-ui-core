import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import StChip from '~/components/ui/chip/StChip.vue'

describe('StChip', () => {
  const classList = (cls: string | undefined) => (cls ?? '').trim().split(/\s+/).filter(Boolean)

  it('renderiza o slot e aplica defaults', () => {
    const wrapper = mount(StChip, { slots: { default: 'Chip' } })
    expect(wrapper.text()).toContain('Chip')

    const list = classList(wrapper.attributes('class'))
    expect(list).toContain('h-ds-3')
    expect(list).toContain('rounded-ds-1')
    expect(list).toContain('bg-content-primary')
    expect(list).toContain('text-surface-primary')
  })

  it('aplica variant', () => {
    const wrapper = mount(StChip, { props: { variant: 'warning' }, slots: { default: 'W' } })
    const list = classList(wrapper.attributes('class'))
    expect(list).toContain('bg-content-warning')
    expect(list).toContain('border-content-warning')
    expect(list).toContain('text-surface-warning')
  })

  it('aplica clickable com role/tabindex e dispara onClick via $attrs', async () => {
    const onClick = vi.fn()
    const wrapper = mount(StChip, { props: { clickable: true }, attrs: { onClick } })

    expect(wrapper.attributes('role')).toBe('button')
    expect(wrapper.attributes('tabindex')).toBe('0')

    await wrapper.trigger('click')
    expect(onClick).toHaveBeenCalledTimes(1)

    await wrapper.trigger('keydown', { key: 'Enter' })
    expect(onClick).toHaveBeenCalledTimes(2)

    await wrapper.trigger('keydown', { key: ' ' })
    expect(onClick).toHaveBeenCalledTimes(3)
  })

  it('não dispara onClick quando clickable=false', async () => {
    const onClick = vi.fn()
    const wrapper = mount(StChip, { props: { clickable: false }, attrs: { onClick } })

    await wrapper.trigger('click')
    await wrapper.trigger('keydown', { key: 'Enter' })
    expect(onClick).toHaveBeenCalledTimes(0)
  })

  it('renderiza botão de close e chama onClose sem propagar click', async () => {
    const onClick = vi.fn()
    const onClose = vi.fn()
    const wrapper = mount(StChip, {
      props: { clickable: true, closable: true, onClose },
      attrs: { onClick }
    })

    await wrapper.find('button[aria-label="Close"]').trigger('click')
    expect(onClose).toHaveBeenCalledTimes(1)
    expect(onClick).toHaveBeenCalledTimes(0)
  })
})
