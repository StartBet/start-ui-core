import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import StCheckbox from '~/components/ui/form/checkbox/StCheckbox.vue'

describe('StCheckbox', () => {
  const getInput = (wrapper: ReturnType<typeof mount>) => wrapper.find('input[type="checkbox"]')

  it('renderiza label via prop e aplica input type=checkbox', () => {
    const wrapper = mount(StCheckbox, { props: { label: 'Option' } })
    expect(wrapper.text()).toContain('Option')
    expect(getInput(wrapper).exists()).toBe(true)
  })

  it('renderiza label via slot quando fornecido', () => {
    const wrapper = mount(StCheckbox, { slots: { default: 'Slot label' } })
    expect(wrapper.text()).toContain('Slot label')
  })

  it('suporta modo não-controlado via defaultChecked', async () => {
    const wrapper = mount(StCheckbox, { props: { defaultChecked: true, label: 'X' } })
    const input = getInput(wrapper)
    expect((input.element as HTMLInputElement).checked).toBe(true)

    await input.setValue(false)
    await nextTick()

    expect((input.element as HTMLInputElement).checked).toBe(false)
    expect(wrapper.emitted('update:checked')?.at(-1)).toEqual([false])
  })

  it('suporta modo controlado via checked', async () => {
    const wrapper = mount(StCheckbox, { props: { checked: false, label: 'X' } })
    const input = getInput(wrapper)
    expect((input.element as HTMLInputElement).checked).toBe(false)

    await input.setValue(true)
    expect(wrapper.emitted('update:checked')?.at(-1)).toEqual([true])

    await wrapper.setProps({ checked: true })
    expect((input.element as HTMLInputElement).checked).toBe(true)
  })

  it('desabilita o input quando disabled=true', () => {
    const wrapper = mount(StCheckbox, { props: { disabled: true, label: 'X' } })
    expect(getInput(wrapper).attributes('disabled')).toBeDefined()
  })

  it('encaminha attrs para o input (exceto class/style do wrapper)', () => {
    const wrapper = mount(StCheckbox, {
      props: { label: 'X' },
      attrs: { name: 'example', 'aria-label': 'checkbox', class: 'outer', style: 'opacity: 0.5' }
    })

    expect(wrapper.attributes('class')).toContain('outer')
    expect(wrapper.attributes('style')).toContain('opacity')
    expect(getInput(wrapper).attributes('name')).toBe('example')
    expect(getInput(wrapper).attributes('aria-label')).toBe('checkbox')
  })
})

