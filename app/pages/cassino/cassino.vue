<script setup lang="ts">
import { getTitle } from '~/utils/seo-snippets';
import { useHead } from 'nuxt/app';
import { useCasinoLiveService } from '~/services/casinoLiveService';
import { useGamesService } from '~/services/gamesService';

useHead({ title: getTitle('Cassino') });

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
    variant="surface-3"
    padding="6 2"
    paddingMd="6 0"
    borderRadius="none"
    class="max-w-ds-144 m-auto flex flex-col items-start justify-center"
    :elevation="0"
  >
    <StTypography as="h3" variant="heading-3">Jogos</StTypography>
    <StGrid
      cols="2"
      mdCols="5"
      lgCols="5"
      gap="4"
      padding="6 0"
      className="w-full"
    >
      <StCardGame
        v-for="game in slotsGames.slice(0, 10)"
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
      mdCols="5"
      lgCols="5"
      gap="4"
      padding="6 0"
      className="w-full"
    >
      <StCardGame
        v-for="game in casinoLiveGames.slice(0, 10)"
        variant="surface-3"
        :key="game.id"
        :name="game.name"
        :provider="game.provider"
        :image="resolveAssetsImageUrl('casino-live', game.image)"
      />
    </StGrid>
  </StPaper>
</template>
