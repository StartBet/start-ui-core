<script setup lang="ts">
import { getTitle } from '~/utils/seo-snippets';
import { useHead } from 'nuxt/app';

useHead({ title: getTitle('Principais Jogos') });
</script>

<template>
  <div class="space-y-ds-6 px-ds-4">
    <StPaper
      variant="surface-4"
      padding="none"
      borderRadius="none"
      class="max-w-ds-144 m-auto pt-ds-6 flex flex-col items-start justify-center"
      :elevation="0"
    >
      <StTypography
        as="h2"
        variant="heading-2"
        className="text-center align-center"
        >Principais Jogos</StTypography
      >
      <StGrid
        cols="1"
        smCols="1"
        mdCols="3"
        lgCols="3"
        gap="4"
        padding="4 0 0"
        className="w-full"
      >
        <StCardActionGame
          title="Fortune Tiger"
          subtitle="PG Soft"
          buttonText="Jogar"
          to="/"
          illustration="characters/character-fortune-tiger"
        />
        <StCardActionGame
          title="Fortune Rabbit"
          subtitle="PG Soft"
          buttonText="Jogar"
          to="/"
          illustration="characters/character-fortune-rabbit"
        />
        <StCardActionGame
          title="Fortune Mouse"
          subtitle="PG Soft"
          buttonText="Jogar"
          to="/"
          illustration="characters/character-fortune-mouse"
        />
      </StGrid>
    </StPaper>
    <StPaper
      variant="surface-4"
      padding="none"
      borderRadius="none"
      class="max-w-ds-144 m-auto flex flex-col items-start justify-center"
      :elevation="0"
    >
      <StTypography
        as="h2"
        variant="heading-2"
        className="text-center align-center"
        >Ao vivo</StTypography
      >
      <StGrid
        cols="1"
        smCols="1"
        mdCols="2"
        lgCols="2"
        gap="4"
        padding="4 0 4"
        className="w-full"
      >
        <StCardActionGame
          title="Cassino Ao vivo"
          buttonText="Quero Jogar"
          to="/"
          illustration="casino/casino-4"
        />
        <StCardActionGame
          title="Esporte Ao Vivo"
          buttonText="Quero Jogar"
          to="/"
          illustration="characters/character-soccer-13"
        />
      </StGrid>
    </StPaper>
    <StPaper
      variant="surface-4"
      padding="none"
      borderRadius="none"
      class="max-w-ds-144 m-auto flex flex-col items-start justify-center"
      :elevation="0"
    >
      <StTypography
        as="h2"
        variant="heading-2"
        className="text-center align-center"
        >Esportes</StTypography
      >
      <StGrid
        cols="1"
        smCols="1"
        mdCols="3"
        lgCols="3"
        gap="4"
        padding="4 0 8"
        className="w-full"
      >
        <StCardActionGame
          title="Futebol Europeu"
          subtitle="Campeonato Espanhol"
          buttonText="Jogar"
          to="/"
          illustration="pixar/pixar-barcelona"
        />
        <StCardActionGame
          title="O melhor do Basquete"
          subtitle="Tudo que acontece na NBA"
          buttonText="Jogar"
          to="/"
          illustration="pixar/pixar-okc"
        />
        <StCardActionGame
          title="Brasileirão é na Start"
          subtitle="Campeonato Brasileiro de Futebol"
          buttonText="Jogar"
          to="/"
          illustration="pixar/pixar-santos"
        />
      </StGrid>
    </StPaper>
  </div>
</template>
