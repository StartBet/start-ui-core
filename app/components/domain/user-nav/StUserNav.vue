<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import StIcon from '~/components/ui/icon/StIcon.vue';
import StListItem from '~/components/ui/list/list-item/StListItem.vue';
import StUnorderedList from '~/components/ui/list/unordered-list/StUnorderedList.vue';
import { useUserNavService } from '~/services/userNavService';
import type { StUserNavProps } from './StUserNav.interface';
import { userNavRootClass } from './styleStUserNav';

defineOptions({ name: 'StUserNav' });

const props = withDefaults(defineProps<StUserNavProps>(), { className: '' });

const route = useRoute();
const router = useRouter();
const { items: userNavItems } = useUserNavService();

const showUserNav = computed(() => route.path?.startsWith('/user') ?? false);

const isActive = (to: string | undefined) => (to ? route.path === to : false);

const isGroupActive = (item: {
  to?: string;
  children?: Array<{ to?: string }>;
}) => {
  if (isActive(item.to)) return true;
  return Boolean(item.children?.some((child) => isActive(child.to)));
};

const groupDefaultExpanded = computed<Record<string, boolean>>(() => {
  const out: Record<string, boolean> = {};
  for (const item of userNavItems) {
    out[item.id] = isGroupActive(item);
  }
  return out;
});

const onNavigate = (to: string | undefined) => {
  if (!to) return;
  return router.push(to);
};
</script>

<template>
  <div v-if="showUserNav" :class="[userNavRootClass, props.className]">
    <StUnorderedList>
      <StListItem
        v-for="item in userNavItems"
        :key="item.id"
        size="medium"
        clickable
        :selected="isGroupActive(item)"
        :onClick="() => onNavigate(item.to)"
        :defaultExpanded="groupDefaultExpanded[item.id]"
      >
        <template #startAdornment>
          <StIcon
            :name="item.icon"
            :size="2"
            :aria-label="item.ariaLabel"
            className="text-content-secondary"
          />
        </template>
        {{ item.label }}

        <StUnorderedList v-if="item.children?.length" dense>
          <StListItem
            v-for="child in item.children"
            :key="child.id"
            clickable
            size="medium"
            :selected="isActive(child.to)"
            :onClick="() => onNavigate(child.to)"
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
</template>
