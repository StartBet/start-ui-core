<script setup lang="ts">
import { getTitle } from '~/utils/seo-snippets';
import { useHead } from 'nuxt/app';
import Tournaments from './tournaments.vue';

useHead({ title: getTitle('Tournaments') });
</script>
<template>
  <Tournaments />
</template>
