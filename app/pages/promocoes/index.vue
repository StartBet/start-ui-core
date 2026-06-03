<script setup lang="ts">
import { getTitle } from '~/utils/seo-snippets';
import { useHead } from 'nuxt/app';
import Promocoes from './promocoes.vue';

useHead({ title: getTitle('Promoções') });
</script>
<template>
  <Promocoes />
</template>
