import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import StTooltip from '~/components/ui/tooltip/StTooltip.vue'

describe('StTooltip', () => {
  it('abre no mouseenter e fecha no mouseleave (uncontrolled)', async () => {
    const wrapper = mount(StTooltip, {
      slots: {
        trigger: '<button type="button">Trigger</button>',
        default: 'Tooltip content'
      }
    })

    expect(wrapper.find('[role="tooltip"]').exists()).toBe(false)

    await wrapper.trigger('mouseenter')
    expect(wrapper.find('[role="tooltip"]').exists()).toBe(true)

    await wrapper.trigger('mouseleave')
    expect(wrapper.find('[role="tooltip"]').exists()).toBe(false)
  })

  it('aplica aria-describedby no trigger quando aberto', async () => {
    const wrapper = mount(StTooltip, {
      slots: {
        trigger: '<button type="button">Trigger</button>',
        default: 'Tooltip content'
      }
    })

    const triggerWrapper = wrapper.find('span > span')
    expect(triggerWrapper.attributes('aria-describedby')).toBeUndefined()

    await wrapper.trigger('mouseenter')
    const describedBy = triggerWrapper.attributes('aria-describedby')
    expect(describedBy).toMatch(/^st-tooltip-/)

    const panel = wrapper.find('[role="tooltip"]')
    expect(panel.attributes('id')).toBe(describedBy)
  })

  it('fecha com Escape', async () => {
    const wrapper = mount(StTooltip, {
      slots: {
        trigger: '<button type="button">Trigger</button>',
        default: 'Tooltip content'
      }
    })

    await wrapper.trigger('mouseenter')
    expect(wrapper.find('[role="tooltip"]').exists()).toBe(true)

    await wrapper.trigger('keydown', { key: 'Escape' })
    expect(wrapper.find('[role="tooltip"]').exists()).toBe(false)
  })

  it('disabled impede abrir', async () => {
    const wrapper = mount(StTooltip, {
      props: { disabled: true },
      slots: {
        trigger: '<button type="button">Trigger</button>',
        default: 'Tooltip content'
      }
    })

    await wrapper.trigger('mouseenter')
    expect(wrapper.find('[role="tooltip"]').exists()).toBe(false)
  })

  it('modo controlado respeita open', async () => {
    const wrapper = mount(StTooltip, {
      props: { open: false },
      slots: {
        trigger: '<button type="button">Trigger</button>',
        default: 'Tooltip content'
      }
    })

    expect(wrapper.find('[role="tooltip"]').exists()).toBe(false)

    await wrapper.setProps({ open: true })
    expect(wrapper.find('[role="tooltip"]').exists()).toBe(true)

    await wrapper.setProps({ open: false })
    expect(wrapper.find('[role="tooltip"]').exists()).toBe(false)
  })
})

