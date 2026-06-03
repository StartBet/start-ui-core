<script setup lang="ts">
import { getTitle } from '~/utils/seo-snippets';
import { useHead } from 'nuxt/app';
import Home from './home/';

useHead({ title: getTitle('Home') });
</script>
<template>
  <Home />
</template>
