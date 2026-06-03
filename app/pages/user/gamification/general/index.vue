<script setup lang="ts">
import { getTitle } from '~/utils/seo-snippets';
import { useHead } from 'nuxt/app';
import General from './general.vue';

useHead({ title: getTitle('General') });
</script>
<template>
  <General />
</template>
