import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { defineComponent, h, nextTick, ref } from 'vue'
import StSelect from '~/components/ui/form/select/StSelect.vue'
import StOption from '~/components/ui/form/option/StOption.vue'

describe('StSelect', () => {
  const getTriggerButton = (wrapper: ReturnType<typeof mount>) => wrapper.find('button[type="button"]')

  it('renderiza label e placeholder', () => {
    const wrapper = mount(StSelect, { props: { label: 'Select', placeholder: 'Pick' } })
    expect(wrapper.text()).toContain('Select')
    expect(wrapper.text()).toContain('Pick')
  })

  it('abre ao clicar no trigger e renderiza options via prop', async () => {
    const wrapper = mount(StSelect, {
      props: {
        options: [
          { name: 'A', value: 'a' },
          { name: 'B', value: 'b' }
        ]
      },
      attachTo: document.body
    })

    expect(wrapper.find('dialog').exists()).toBe(false)
    await getTriggerButton(wrapper).trigger('click')
    await nextTick()
    expect(wrapper.find('dialog').exists()).toBe(true)
    expect(wrapper.text()).toContain('A')
    expect(wrapper.text()).toContain('B')

    wrapper.unmount()
  })

  it('não-controlado: seleciona opção, emite update:value e fecha quando closeOnSelect=true', async () => {
    const onValueChange = vi.fn()
    const wrapper = mount(StSelect, {
      props: {
        defaultValue: 'a',
        onValueChange,
        options: [
          { name: 'A', value: 'a' },
          { name: 'B', value: 'b' }
        ],
        closeOnSelect: true
      },
      attachTo: document.body
    })

    await getTriggerButton(wrapper).trigger('click')
    await nextTick()
    expect(wrapper.find('dialog').exists()).toBe(true)

    const buttons = wrapper.findAll('button[type="button"]')
    const optionB = buttons.find((b) => b.text().includes('B'))
    expect(optionB).toBeDefined()

    await optionB!.trigger('click')
    await nextTick()

    expect(onValueChange).toHaveBeenCalledWith('b')
    expect(wrapper.emitted('update:value')?.at(-1)).toEqual(['b'])
    expect(wrapper.emitted('value-change')?.at(-1)).toEqual(['b'])
    expect(wrapper.find('dialog').exists()).toBe(false)

    wrapper.unmount()
  })

  it('controlado: ao selecionar emite update:value e reflete após atualizar props.value', async () => {
    const Host = defineComponent({
      components: { StSelect },
      setup() {
        const value = ref<string | number>('a')
        return { value }
      },
      template: `
        <StSelect
          v-model:value="value"
          :options="[
            { name: 'A', value: 'a' },
            { name: 'B', value: 'b' }
          ]"
        />
      `
    })

    const wrapper = mount(Host, { attachTo: document.body })
    const trigger = wrapper.find('button[type="button"]')

    await trigger.trigger('click')
    await nextTick()

    const optionB = wrapper.findAll('button[type="button"]').find((b) => b.text().includes('B'))
    expect(optionB).toBeDefined()
    await optionB!.trigger('click')
    await nextTick()

    expect(wrapper.text()).toContain('B')
    wrapper.unmount()
  })

  it('renderiza opções via slot (StOption) e seleciona ao clicar', async () => {
    const wrapper = mount(StSelect, {
      slots: {
        default: () => [
          h(StOption, { value: 'a' }, { default: () => 'A' }),
          h(StOption, { value: 'b' }, { default: () => 'B' })
        ]
      },
      attachTo: document.body
    })

    await getTriggerButton(wrapper).trigger('click')
    await nextTick()

    const optionB = wrapper.findAll('button[type="button"]').find((b) => b.text().includes('B'))
    expect(optionB).toBeDefined()
    await optionB!.trigger('click')
    await nextTick()

    expect(wrapper.emitted('update:value')?.at(-1)).toEqual(['b'])
    wrapper.unmount()
  })

  it('disabled: não abre e não permite alterar valor', async () => {
    const wrapper = mount(StSelect, {
      props: {
        disabled: true,
        options: [{ name: 'A', value: 'a' }]
      }
    })

    await getTriggerButton(wrapper).trigger('click')
    await nextTick()

    expect(wrapper.find('dialog').exists()).toBe(false)
    expect(wrapper.emitted('update:value')).toBeUndefined()
  })
})
