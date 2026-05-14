<script setup lang="ts">
import { getTitle } from '~/utils/seo-snippets';
import { useHead } from 'nuxt/app';
import { useGamesService } from '~/services/gamesService';
import { useCasinoLiveService } from '~/services/casinoLiveService';
import StPaper from '~/components/ui/paper/StPaper.vue';
import StTypography from '~/components/ui/typography/StTypography.vue';
import StGrid from '~/components/ui/grid/StGrid.vue';
import StCardActionGame from '~/components/domain/card-action-game/StCardActionGame.vue';
import StCardGame from '~/components/domain/card-game/StCardGame.vue';

useHead({ title: getTitle('Principais Jogos') });

const { games: slotsGames } = useGamesService();
const { games: casinoLiveGames } = useCasinoLiveService();

const byBasename = (modules: Record<string, unknown>) => {
  const entries = Object.entries(modules).map(([key, value]) => {
    const fileName = key.split('/').pop() ?? key;
    return [fileName, String(value)] as const;
  });
  return Object.fromEntries(entries) as Record<string, string>;
};

const gameImages = byBasename(
  import.meta.glob('../../../assets/imgs/games/*', {
    eager: true,
    import: 'default'
  })
);
const casinoLiveImages = byBasename(
  import.meta.glob('../../../assets/imgs/casino-live/*', {
    eager: true,
    import: 'default'
  })
);

const resolveAssetsImageUrl = (
  dir: 'games' | 'casino-live',
  fileName?: string
) => {
  if (!fileName) return '';
  return (
    (dir === 'games' ? gameImages[fileName] : casinoLiveImages[fileName]) ?? ''
  );
};
</script>

<template>
  <StPaper
    variant="surface-4"
    padding="6 2"
    paddingMd="6 0"
    borderRadius="none"
    class="max-w-ds-144 m-auto flex flex-col items-start justify-center"
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
    padding="0 2"
    paddingMd="0"
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
    variant="surface-3"
    padding="6 2"
    paddingMd="6 0"
    borderRadius="none"
    class="max-w-ds-144 m-auto flex flex-col items-start justify-center"
    :elevation="0"
  >
    <StTypography as="h3" variant="heading-3">Jogos Populares</StTypography>
    <StGrid
      cols="2"
      mdCols="3"
      lgCols="5"
      gap="4"
      padding="6 0"
      className="w-full"
    >
      <StCardGame
        v-for="game in slotsGames.slice(0, 5)"
        variant="surface-3"
        :key="game.id"
        :name="game.name"
        :provider="game.provider"
        :image="resolveAssetsImageUrl('games', game.image)"
      />
    </StGrid>

    <StTypography as="h3" variant="heading-3">Cassino ao vivo</StTypography>
    <StGrid
      cols="2"
      mdCols="3"
      lgCols="5"
      gap="4"
      padding="6 0"
      className="w-full"
    >
      <StCardGame
        v-for="game in casinoLiveGames.slice(0, 5)"
        variant="surface-3"
        :key="game.id"
        :name="game.name"
        :provider="game.provider"
        :image="resolveAssetsImageUrl('casino-live', game.image)"
      />
    </StGrid>
  </StPaper>

  <StPaper
    variant="surface-4"
    padding="0 2"
    paddingMd="0"
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
</template>
