<script setup lang="ts">
import { getTitle } from '~/utils/seo-snippets';
import { useHead } from 'nuxt/app';
import Missions from './missions.vue';

useHead({ title: getTitle('Missions') });
</script>
<template>
  <Missions />
</template>
