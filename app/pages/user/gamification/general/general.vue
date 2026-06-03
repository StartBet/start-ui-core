<script setup lang="ts">
import { getTitle } from '~/utils/seo-snippets';
import { useHead } from 'nuxt/app';

useHead({ title: getTitle('User') });
</script>

<template>
  <StPaper
    variant="surface-1"
    padding="4"
    paddingMd="4"
    margin="0 6"
    borderRadius="2"
    class="flex flex-col items-start justify-center"
    :elevation="0"
  >
    <StTypography variant="heading-3" class="mb-4">Geral</StTypography>
    <StGrid cols="2" gap="4" className="w-full">
      <StGrid cols="1" gap="4">
        <StInput label="Nome" />
        <StInput label="Nome" />
        <StInput label="Nome" />
        <StInput label="Nome" />
        <StInput label="Nome" />
        <StInput label="Nome" />
      </StGrid>
      <StGrid cols="1" gap="4">
        <StInput label="Nome" />
        <StInput label="Nome" />
        <StInput label="Nome" />
        <StInput label="Nome" />
        <StInput label="Nome" />
        <StInput label="Nome" />
      </StGrid>
    </StGrid>
  </StPaper>
</template>
