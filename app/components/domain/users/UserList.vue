<script setup lang="ts">
import type { User } from '~/components/domain/users/User'

defineProps<{
  users: User[]
  isLoading: boolean
}>()
</script>

<template>
  <StPaper variant="surface-0" padding="4" borderRadius="2" :elevation="1">
    <h2 class="font-heading text-heading-4 text-content-primary">Usuários (exemplo de domínio)</h2>
    <div v-if="isLoading" class="mt-2 text-content-ghost">Carregando...</div>
    <ul v-else class="space-y-2">
      <li v-for="user in users" :key="user.id" class="flex items-center justify-between">
        <span class="font-medium text-content-din">{{ user.name }}</span>
        <span
          class="rounded-full px-2 py-1 text-xs font-medium"
          :class="
            user.active
              ? 'bg-surface-positive text-content-positive'
              : 'bg-surface-2 text-content-ghost'
          "
        >
          {{ user.active ? 'Ativo' : 'Inativo' }}
        </span>
      </li>
    </ul>
  </StPaper>
</template>
