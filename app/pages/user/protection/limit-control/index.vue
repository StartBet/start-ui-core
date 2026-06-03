<script setup lang="ts">
import { getTitle } from '~/utils/seo-snippets';
import { useHead } from 'nuxt/app';
import LimitControl from './limit-control.vue';

useHead({ title: getTitle('LimitControl') });
</script>
<template>
  <LimitControl />
</template>
