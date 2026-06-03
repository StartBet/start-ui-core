<script setup lang="ts">
import { getTitle } from '~/utils/seo-snippets';
import { useHead } from 'nuxt/app';
import Deposit from './deposit.vue';

useHead({ title: getTitle('Deposit') });
</script>
<template>
  <Deposit />
</template>
