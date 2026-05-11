<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import StChip from '~/components/ui/chip/StChip.vue'
import StButton from '~/components/ui/buttom/button/StButton.vue'
import StIcon from '~/components/ui/icon/StIcon.vue'
import StListItem from '~/components/ui/list/list-item/StListItem.vue'
import StUnorderedList from '~/components/ui/list/unordered-list/StUnorderedList.vue'
import StPaper from '~/components/ui/paper/StPaper.vue'
import StTooltip from '~/components/ui/tooltip/StTooltip.vue'
import { useSideNavService } from '~/services/sideNavService'
import { useSideNavMenuStore } from '~/stores/sideNavMenuStore'
import { useSideNavStore } from '~/stores/sideNavStore'

const route = useRoute()
const sideNav = useSideNavStore()

const menuStore = useSideNavMenuStore()
const { items } = useSideNavService()

const visibleUnorderedList = ref(sideNav.isOpen)

let showTimeout: ReturnType<typeof setTimeout> | undefined

watch(
  () => sideNav.isOpen,
  (isOpen) => {
    if (showTimeout) clearTimeout(showTimeout)
    if (!isOpen) {
      visibleUnorderedList.value = false
      return
    }
    showTimeout = setTimeout(() => {
      visibleUnorderedList.value = true
    }, 100)
  },
  { immediate: true }
)



const isActive = (to: string | undefined) => (to ? route.path === to : false)
const onNavigate = (to: string | undefined) => {
  if (!to) return
  return navigateTo(to)
}

type CompactEntry = {
  key: string
  id: string
  label: string
  ariaLabel: string
  icon: string
  to?: string
  level: 1 | 2
  hasChildren?: boolean
}

const compactEntries = computed<CompactEntry[]>(() => {
  const out: CompactEntry[] = []

  for (const item of items) {
    const hasChildren = Boolean(item.children?.length)
    const expanded = hasChildren ? menuStore.isExpanded(item.id) : false

    out.push({
      key: item.id,
      id: item.id,
      label: item.label,
      ariaLabel: item.ariaLabel,
      icon: item.icon,
      to: item.to,
      level: 1,
      hasChildren
    })

    if (!hasChildren || !expanded) continue

    for (const child of item.children ?? []) {
      out.push({
        key: `${item.id}:${child.id}`,
        id: child.id,
        label: child.label,
        ariaLabel: child.ariaLabel,
        icon: child.icon,
        to: child.to,
        level: 2
      })
    }
  }

  return out
})

</script>

<template>
  <aside
    class="shrink-0 h-full overflow-hidden transition-[width] duration-200 ease-out absolute md:relative z-[100]"
    :class="sideNav.isOpen ? 'w-[310px]' : 'w-[0px] md:w-[64px]'"
  >
    <StPaper
      variant="surface-0"
      padding="0 2"
      height="full"
      borderRadius="none"
      :elevation="1"
      className="overflow-y-auto"
    >
      <div v-show="visibleUnorderedList">
        <StUnorderedList>
          <StListItem
            v-for="item in items"
            :key="item.id"
            size="medium"
            clickable
            :selected="isActive(item.to)"
            :onClick="item.to ? () => onNavigate(item.to) : undefined"
            :expanded="item.children?.length ? menuStore.isExpanded(item.id) : undefined"
            :onExpandedChange="
              item.children?.length ? (next) => menuStore.setExpanded(item.id, next) : undefined
            "
          >
            <template #startAdornment>
              <StIcon :name="item.icon" :size="2" :aria-label="item.ariaLabel" className="text-content-secondary" />
            </template>
            <template v-if="item.chip" #endAdornment>
              <StChip :variant="item.chip.variant">{{ item.chip.label }}</StChip>
            </template>
            {{ item.label }}

            <StUnorderedList v-if="item.children?.length" dense>
              <StListItem
                v-for="child in item.children"
                :key="child.id"
                clickable
                size="small"
                :selected="isActive(child.to)"
                :onClick="child.to ? () => onNavigate(child.to) : undefined"
              >
                <template #startAdornment>
                  <StIcon
                    :name="child.icon"
                    :size="2"
                    :aria-label="child.ariaLabel"
                    className="text-content-secondary"
                  />
                </template>
                {{ child.label }}
              </StListItem>
            </StUnorderedList>
          </StListItem>
        </StUnorderedList>
      </div>

      <div v-show="!sideNav.isOpen" class="hidden md:flex flex-col">
        <StTooltip v-for="entry in compactEntries" :key="entry.key" placement="right">
          <template #trigger>
            <StButton
              fullWidth
              variant="text"
              color="secondary"
              size="medium"
              :iconLeft="entry.icon"
              :aria-label="entry.ariaLabel"
              :onClick="entry.to ? () => onNavigate(entry.to) : undefined"
            />
          </template>
          {{ entry.label }}
        </StTooltip>
      </div>
    </StPaper>
  </aside>
</template>
