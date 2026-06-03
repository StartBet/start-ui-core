<script setup lang="ts">
import { getTitle } from '~/utils/seo-snippets';
import { useHead } from 'nuxt/app';
import MiniGames from './mini-games.vue';

useHead({ title: getTitle('Mini Games') });
</script>
<template>
  <MiniGames />
</template>
