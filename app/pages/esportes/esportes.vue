<script setup lang="ts">
import { getTitle } from '~/utils/seo-snippets';
import { useHead } from 'nuxt/app';

useHead({ title: getTitle('Esportes') });
</script>

<template>
  <iframe
    title="Esportes"
    src="https://prod20350-kbet-152319626.fssb.io/br-pt/spbkv4?operatorToken=logout"
    width="100%"
    height="100%"
  />
</template>
