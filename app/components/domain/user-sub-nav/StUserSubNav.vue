<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import StIcon from '~/components/ui/icon/StIcon.vue';
import StListItem from '~/components/ui/list/list-item/StListItem.vue';
import StUnorderedList from '~/components/ui/list/unordered-list/StUnorderedList.vue';
import StPaper from '~/components/ui/paper/StPaper.vue';
import { useUserNavService } from '~/services/userNavService';
import type { StUserSubNavProps } from './StUserSubNav.interface';

defineOptions({ name: 'StUserSubNav' });

const props = withDefaults(defineProps<StUserSubNavProps>(), { className: '' });

const route = useRoute();
const router = useRouter();
const { items: userNavItems } = useUserNavService();

const showUserSubNav = computed(
  () => route.path?.startsWith('/user/') ?? false
);

const activeUserGroupId = computed(() => {
  if (!showUserSubNav.value) return null;
  const parts = route.path.split('/').filter(Boolean);
  return parts[1] ?? null;
});

const userSubNavItems = computed(() => {
  const groupId = activeUserGroupId.value;
  if (!groupId) return [];
  return userNavItems.find((item) => item.id === groupId)?.children ?? [];
});

const isUserSubActive = (to: string) => route.path === to;

const onUserSubNavigate = (to: string) => {
  return router.push(to);
};
</script>

<template>
  <StPaper
    v-if="showUserSubNav && userSubNavItems.length"
    borderRadius="none"
    variant="surface-3"
    padding="2 8 0"
    :className="props.className"
  >
    <StUnorderedList orientation="horizontal">
      <StListItem
        v-for="child in userSubNavItems"
        :key="child.id"
        clickable
        divider
        size="medium"
        :selected="isUserSubActive(child.to)"
        :onClick="() => onUserSubNavigate(child.to)"
      >
        <template #startAdornment>
          <StIcon
            :name="child.icon"
            :size="4"
            :aria-label="child.ariaLabel"
            className="text-content-secondary"
          />
        </template>
        {{ child.label }}
      </StListItem>
    </StUnorderedList>
  </StPaper>
</template>
