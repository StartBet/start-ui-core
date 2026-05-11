<script setup lang="ts">
import { cloneVNode, computed, defineComponent, h, inject, ref, useAttrs, useSlots } from 'vue'
import type { PropType, VNode } from 'vue'
import StButton from '~/components/ui/buttom/button/StButton.vue'
import StDropdown from '~/components/ui/dropdown/StDropdown.vue'
import type { StListItemProps } from '~/components/ui/list/StList.interface'
import { buildListItemClasses, stListContextKey } from '~/components/ui/list/styleStList'

defineOptions({ name: 'StListItem', inheritAttrs: false })

const props = withDefaults(defineProps<StListItemProps>(), {
  dense: false,
  divider: false,
  selected: false,
  disabled: false,
  clickable: false,
  size: 'medium',
  className: '',
  onClick: undefined,
  defaultExpanded: false,
  expanded: undefined,
  onExpandedChange: undefined
})

const attrs = useAttrs()
const slots = useSlots()

const listContext = inject(stListContextKey, null)
const navOrientation = computed(() => listContext?.navOrientation ?? 'vertical')
const level = computed(() => listContext?.level ?? 1)

const internalExpanded = ref(props.defaultExpanded ?? false)

const isSubItem = computed(() => level.value > 1)

const isListElement = (node: VNode) => {
  const type = node.type as any
  const displayName = type?.name ?? type?.__name
  return displayName === 'StUnorderedList' || displayName === 'StOrderedList'
}

const childrenParts = computed(() => {
  const nodes = slots.default?.() ?? []
  const listIndex = nodes.findIndex((n) => isListElement(n as VNode))

  if (listIndex < 0) return { contentNodes: nodes as VNode[], subListNode: null as VNode | null }

  const subListNode = nodes[listIndex] as VNode
  const contentNodes = nodes.filter((_, index) => index !== listIndex) as VNode[]
  return { contentNodes, subListNode }
})

const hasSubItems = computed(() => Boolean(childrenParts.value.subListNode))

const isExpandedControlled = computed(() => props.expanded !== undefined)
const expandedValue = computed(() =>
  isExpandedControlled.value ? Boolean(props.expanded) : internalExpanded.value
)

const setExpanded = (next: boolean) => {
  if (!isExpandedControlled.value) internalExpanded.value = next
  props.onExpandedChange?.(next)
}

const classes = computed(() =>
  buildListItemClasses(props, {
    isSubItem: isSubItem.value,
    hasSubItems: hasSubItems.value,
    expanded: expandedValue.value,
    navOrientation: navOrientation.value
  })
)

const wrapperClass = computed(() => [classes.value.listItem, attrs.class].filter(Boolean).join(' '))
const wrapperStyle = computed(() => attrs.style)

const liAttrs = computed(() => {
  const next: Record<string, unknown> = { ...attrs }
  delete next.class
  delete next.style
  delete next.onClick
  delete next.onKeydown
  delete next.onKeyDown
  return next
})

const onMainClick = (e: MouseEvent) => {
  if (props.disabled) {
    e.preventDefault()
    return
  }
  props.onClick?.(e)
}

const toggleExpanded = () => {
  setExpanded(!expandedValue.value)
}

const RenderNode = defineComponent({
  name: 'StRenderNode',
  props: { node: { type: Object as PropType<VNode | null>, default: null } },
  setup(p) {
    return () => (p.node ? cloneVNode(p.node) : null)
  }
})

const RenderMainContent = defineComponent({
  name: 'StListItemMainContent',
  props: {
    startNodes: { type: Array as PropType<VNode[]>, required: true },
    endNodes: { type: Array as PropType<VNode[]>, required: true },
    contentNodes: { type: Array as PropType<VNode[]>, required: true },
    startClass: { type: String, required: true },
    endClass: { type: String, required: true },
    contentClass: { type: String, required: true }
  },
  setup(p) {
    return () => [
      p.startNodes.length > 0 ? h('span', { class: p.startClass }, p.startNodes) : null,
      h('span', { class: p.contentClass }, p.contentNodes),
      p.endNodes.length > 0 ? h('span', { class: p.endClass }, p.endNodes) : null
    ]
  }
})
</script>

<template>
  <li :class="wrapperClass" :style="wrapperStyle" v-bind="liAttrs">
    <div :class="classes.main">
      <button
        v-if="props.clickable"
        type="button"
        :class="classes.mainActionInteractive"
        :disabled="props.disabled"
        @click="onMainClick"
      >
        <RenderMainContent
          :startNodes="(slots.startAdornment?.() ?? []) as VNode[]"
          :endNodes="(slots.endAdornment?.() ?? []) as VNode[]"
          :contentNodes="childrenParts.contentNodes"
          :startClass="classes.startAdornment"
          :endClass="classes.endAdornment"
          :contentClass="classes.content"
        />
      </button>

      <div v-else :class="classes.mainActionBase">
        <RenderMainContent
          :startNodes="(slots.startAdornment?.() ?? []) as VNode[]"
          :endNodes="(slots.endAdornment?.() ?? []) as VNode[]"
          :contentNodes="childrenParts.contentNodes"
          :startClass="classes.startAdornment"
          :endClass="classes.endAdornment"
          :contentClass="classes.content"
        />
      </div>

      <StDropdown
        v-if="hasSubItems && navOrientation === 'horizontal'"
        placement="bottom"
        :offset="6"
        triggerAsChild
        width="fit-content"
        :panelClassName="classes.subMenuPanel"
      >
        <template #trigger="{ open, toggle, setTriggerEl, attrs: triggerAttrs }">
          <StButton
            :ref="setTriggerEl"
            v-bind="triggerAttrs"
            size="medium"
            :variant="open ? 'solid' : 'text'"
            :iconLeft="open ? 'chevron-up' : 'chevron-down'"
            :className="classes.subMenuButton"
            aria-label="Abrir submenu"
            :aria-expanded="open"
            :data-open="open ? 'true' : undefined"
            @click.stop="toggle"
          />
        </template>
        <RenderNode :node="childrenParts.subListNode" />
      </StDropdown>

      <StButton
        v-if="hasSubItems && navOrientation !== 'horizontal'"
        size="medium"
        variant="text"
        :color="expandedValue ? 'secondary' : 'primary'"
        :iconLeft="expandedValue ? 'chevron-up' : 'chevron-down'"
        :className="classes.subMenuButton"
        :aria-label="expandedValue ? 'Fechar submenu' : 'Abrir submenu'"
        :aria-expanded="expandedValue"
        :disabled="props.disabled"
        :data-open="expandedValue ? 'true' : undefined"
        @click.stop="toggleExpanded"
      />
    </div>

    <div v-if="hasSubItems && navOrientation !== 'horizontal'" :class="classes.subList">
      <RenderNode :node="childrenParts.subListNode" />
    </div>
  </li>
</template>
