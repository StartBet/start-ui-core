<script setup lang="ts">
import { getTitle } from '~/utils/seo-snippets';
import { useHead } from 'nuxt/app';
import AnnualStatement from './annual-statement.vue';

useHead({ title: getTitle('AnnualStatement') });
</script>
<template>
  <AnnualStatement />
</template>
