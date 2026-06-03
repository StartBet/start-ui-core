<script setup lang="ts">
import { getTitle } from '~/utils/seo-snippets';
import { useHead } from 'nuxt/app';
import Data from './data.vue';

useHead({ title: getTitle('Data') });
</script>
<template>
  <Data />
</template>
