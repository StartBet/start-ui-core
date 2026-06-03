<script setup lang="ts">
import { getTitle } from '~/utils/seo-snippets';
import { useHead } from 'nuxt/app';
import Niveis from './niveis.vue';

useHead({ title: getTitle('Niveis') });
</script>
<template>
  <Niveis />
</template>
