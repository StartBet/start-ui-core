<script setup lang="ts">
import { getTitle } from '~/utils/seo-snippets';
import { useHead } from 'nuxt/app';
import Password from './password.vue';

useHead({ title: getTitle('Password') });
</script>
<template>
  <Password />
</template>
