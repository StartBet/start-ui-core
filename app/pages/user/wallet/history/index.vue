<script setup lang="ts">
import { getTitle } from '~/utils/seo-snippets';
import { useHead } from 'nuxt/app';
import History from './history.vue';

useHead({ title: getTitle('History') });
</script>
<template>
  <History />
</template>
