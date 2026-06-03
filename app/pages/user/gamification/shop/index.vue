<script setup lang="ts">
import { getTitle } from '~/utils/seo-snippets';
import { useHead } from 'nuxt/app';
import Shop from './shop.vue';

useHead({ title: getTitle('Shop') });
</script>
<template>
  <Shop />
</template>
