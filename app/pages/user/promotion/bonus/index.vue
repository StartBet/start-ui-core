<script setup lang="ts">
import { getTitle } from '~/utils/seo-snippets';
import { useHead } from 'nuxt/app';
import Bonus from './bonus.vue';

useHead({ title: getTitle('Bonus') });
</script>
<template>
  <Bonus />
</template>
