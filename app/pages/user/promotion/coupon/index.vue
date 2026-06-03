<script setup lang="ts">
import { getTitle } from '~/utils/seo-snippets';
import { useHead } from 'nuxt/app';
import Coupon from './coupon.vue';

useHead({ title: getTitle('Coupon') });
</script>
<template>
  <Coupon />
</template>
