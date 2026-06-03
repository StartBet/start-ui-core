<script setup lang="ts">
import { getTitle } from '~/utils/seo-snippets';
import { useHead } from 'nuxt/app';
import Transaction from './transaction.vue';

useHead({ title: getTitle('Transaction') });
</script>
<template>
  <Transaction />
</template>
