<script setup lang="ts">
import { getTitle } from '~/utils/seo-snippets';
import { useHead } from 'nuxt/app';
import Withdraw from './withdraw.vue';

useHead({ title: getTitle('Withdraw') });
</script>
<template>
  <Withdraw />
</template>
