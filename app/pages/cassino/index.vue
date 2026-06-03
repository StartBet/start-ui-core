<script setup lang="ts">
import { getTitle } from '~/utils/seo-snippets';
import { useHead } from 'nuxt/app';
import Cassino from './cassino.vue';

useHead({ title: getTitle('Cassino') });
</script>
<template>
  <Cassino />
</template>
