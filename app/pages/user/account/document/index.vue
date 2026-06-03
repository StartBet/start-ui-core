<script setup lang="ts">
import { getTitle } from '~/utils/seo-snippets';
import { useHead } from 'nuxt/app';
import Document from './document.vue';

useHead({ title: getTitle('Document') });
</script>
<template>
  <Document />
</template>
