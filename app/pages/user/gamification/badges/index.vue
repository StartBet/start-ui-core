<script setup lang="ts">
import { getTitle } from '~/utils/seo-snippets';
import { useHead } from 'nuxt/app';
import Badges from './badges.vue';

useHead({ title: getTitle('Badges') });
</script>
<template>
  <Badges />
</template>
