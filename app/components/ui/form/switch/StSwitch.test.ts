import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import StSwitch from '~/components/ui/form/switch/StSwitch.vue'

describe('StSwitch', () => {
  const getInput = (wrapper: ReturnType<typeof mount>) => wrapper.find('input[type="checkbox"]')

  it('renderiza label via prop e aplica input type=checkbox com role=switch', () => {
    const wrapper = mount(StSwitch, { props: { label: 'Ativo' } })
    expect(wrapper.text()).toContain('Ativo')

    const input = getInput(wrapper)
    expect(input.exists()).toBe(true)
    expect(input.attributes('role')).toBe('switch')
  })

  it('renderiza label via slot quando fornecido', () => {
    const wrapper = mount(StSwitch, { slots: { default: 'Slot label' } })
    expect(wrapper.text()).toContain('Slot label')
  })

  it('suporta modo não-controlado via defaultChecked', async () => {
    const wrapper = mount(StSwitch, { props: { defaultChecked: true, label: 'X' } })
    const input = getInput(wrapper)
    expect((input.element as HTMLInputElement).checked).toBe(true)

    await input.setValue(false)
    await nextTick()

    expect((input.element as HTMLInputElement).checked).toBe(false)
    expect(wrapper.emitted('update:checked')?.at(-1)).toEqual([false])
  })

  it('suporta modo controlado via checked', async () => {
    const wrapper = mount(StSwitch, { props: { checked: false, label: 'X' } })
    const input = getInput(wrapper)
    expect((input.element as HTMLInputElement).checked).toBe(false)

    await input.setValue(true)
    expect(wrapper.emitted('update:checked')?.at(-1)).toEqual([true])

    await wrapper.setProps({ checked: true })
    expect((input.element as HTMLInputElement).checked).toBe(true)
  })

  it('desabilita o input quando disabled=true', () => {
    const wrapper = mount(StSwitch, { props: { disabled: true, label: 'X' } })
    expect(getInput(wrapper).attributes('disabled')).toBeDefined()
  })

  it('renderiza iconOff e iconOn quando fornecidos', () => {
    const wrapper = mount(StSwitch, { props: { iconOff: 'times', iconOn: 'check' } })
    expect(wrapper.find('[data-switch-icon-off]').exists()).toBe(true)
    expect(wrapper.find('[data-switch-icon-on]').exists()).toBe(true)
  })

  it('encaminha attrs para o input (exceto class/style do wrapper)', () => {
    const wrapper = mount(StSwitch, {
      props: { label: 'X' },
      attrs: {
        name: 'example',
        'aria-label': 'switch',
        class: 'outer',
        style: 'opacity: 0.5'
      }
    })

    expect(wrapper.attributes('class')).toContain('outer')
    expect(wrapper.attributes('style')).toContain('opacity')
    expect(getInput(wrapper).attributes('name')).toBe('example')
    expect(getInput(wrapper).attributes('aria-label')).toBe('switch')
  })
})
