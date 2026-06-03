<script setup lang="ts">
import { getTitle } from '~/utils/seo-snippets';
import { useHead } from 'nuxt/app';
import Exclusion from './exclusion.vue';

useHead({ title: getTitle('Exclusion') });
</script>
<template>
  <Exclusion />
</template>
