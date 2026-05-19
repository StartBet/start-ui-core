<script setup lang="ts">
import { getTitle } from '~/utils/seo-snippets';
import { useHead } from 'nuxt/app';

useHead({ title: getTitle('Promoções') });
</script>

<template>
  <StPaper
    variant="surface-4"
    padding="4 2 8"
    paddingMd="4 0 8"
    borderRadius="none"
    class="max-w-ds-144 m-auto flex flex-col items-start justify-center"
    :elevation="0"
  >
    <StTypography
      as="h2"
      variant="hero-title"
      :lines="2"
      :size="8"
      weight="extrabold"
      lineHeight="tight"
      className="mb-ds-4"
      >Promoções da roxinha</StTypography
    >
    <StGrid
      cols="1"
      smCols="1"
      mdCols="2"
      lgCols="2"
      gap="4"
      className="w-full"
    >
      <StCardActionGame
        title="Quintou Girou"
        subtitle="Quinta feira é dia de vantagem na Start. Toda semana um jogo especial pode liberar benefícios exclusivos."
        buttonText="Saiba mais"
        surface="1"
        to="/"
        illustration="characters/character-supporter-1"
      />
      <StCardActionGame
        title="Domingão Start"
        subtitle="Quinta feira é dia de vantagem na Start. Toda semana um jogo especial pode liberar benefícios exclusivos."
        buttonText="Saiba mais"
        to="/"
        illustration="characters/character-supporter-2"
      />
      <StCardActionGame
        title="Purple Box"
        subtitle="Quinta feira é dia de vantagem na Start. Toda semana um jogo especial pode liberar benefícios exclusivos."
        buttonText="Saiba mais"
        to="/"
        illustration="characters/character-player-3"
      />
    </StGrid>
  </StPaper>
</template>
