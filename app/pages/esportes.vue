<script setup lang="ts">
import { getTitle } from '~/utils/seo-snippets';

useHead({ title: getTitle('Esportes') })
</script>

<template>
  <StPaper variant="surface-0" padding="6" borderRadius="2" :elevation="1">
    <StTypography as="h1" variant="heading-4">Esportes</StTypography>
    <StTypography className="mt-ds-2 text-content-ghost">Página em construção.</StTypography>
  </StPaper>
</template>
