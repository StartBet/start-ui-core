<script setup lang="ts">
import { getTitle } from '~/utils/seo-snippets';
import { useHead } from 'nuxt/app';
import Esportes from './esportes.vue';

useHead({ title: getTitle('Esportes') });
</script>
<template>
  <Esportes />
</template>
