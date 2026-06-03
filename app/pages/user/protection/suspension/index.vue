<script setup lang="ts">
import { getTitle } from '~/utils/seo-snippets';
import { useHead } from 'nuxt/app';
import Suspension from './suspension.vue';

useHead({ title: getTitle('Suspension') });
</script>
<template>
  <Suspension />
</template>
