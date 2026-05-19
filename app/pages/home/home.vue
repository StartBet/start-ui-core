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
import StMiniCardGame from '~/components/domain/mini-card-game/StMiniCardGame.vue';
import StIllustration from '~/components/ui/illustration/StIllustration.vue';

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
const screenImages = byBasename(
  import.meta.glob('../../../assets/imgs/screens/*', {
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

const resolveScreenImageUrl = (fileName?: string) => {
  if (!fileName) return '';
  return screenImages[fileName] ?? '';
};

const sportsIllustrations = [
  { name: 'sports/sports-badmintom', title: 'Badminton' },
  { name: 'sports/sports-baseball', title: 'Baseball' },
  { name: 'sports/sports-basketball', title: 'Basquete' },
  { name: 'sports/sports-cricket', title: 'Críquete' },
  { name: 'sports/sports-dart', title: 'Dardos' },
  { name: 'sports/sports-floorball', title: 'Floorball' },
  { name: 'sports/sports-hoquei', title: 'Hóquei' },
  { name: 'sports/sports-soccer', title: 'Futebol' },
  { name: 'sports/sports-tenis', title: 'Tênis' },
  { name: 'sports/sports-voleiball', title: 'Vôlei' }
] as const;
</script>

<template>
  <StPaper
    variant="surface-4"
    padding="4 2 2"
    paddingMd="4 0 2"
    borderRadius="none"
    class="max-w-ds-144 m-auto flex flex-col items-start justify-center"
    :elevation="0"
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
        title="Café da manhã na Start"
        buttonText="Quero Cafezin"
        surface="1"
        to="/"
        illustration="coins/coin-coffe-break"
      />
      <StCardActionGame
        title="Cash Back de 25%"
        buttonText="Quero Aproveitar"
        to="/"
        illustration="coins/coin-cash-back"
      />
    </StGrid>
  </StPaper>

  <StPaper
    variant="surface-4"
    padding="4 2"
    paddingMd="2 0"
    borderRadius="none"
    class="max-w-ds-144 m-auto flex flex-col items-start justify-center"
    :elevation="0"
  >
    <StGrid
      cols="1"
      smCols="1"
      mdCols="4"
      lgCols="4"
      gap="3"
      className="w-full"
    >
      <StPaper
        variant="surface-3"
        padding="3"
        border="1"
        borderRadius="2"
        :elevation="0"
        className="flex items-center justify-center gap-ds-2 text-content-secondary"
      >
        <StIcon name="trophy" :size="8" ariaLabel="trophy" />
        <StTypography
          as="h3"
          variant="hero-title"
          :lines="2"
          :size="4"
          weight="extrabold"
          lineHeight="tight"
          >Últimos ganhos hoje</StTypography
        >
      </StPaper>
      <StGrid
        cols="1"
        smCols="1"
        mdCols="4"
        lgCols="4"
        gap="3"
        className="w-full md:col-span-3"
      >
        <StMiniCardGame
          v-for="game in slotsGames.slice(0, 4)"
          :key="game.id"
          :name="game.name"
          :provider="game.provider"
          :image="resolveAssetsImageUrl('games', game.image)"
          :latestEarnings="game.latestEarnings"
        />
      </StGrid>
    </StGrid>
  </StPaper>

  <StPaper
    variant="surface-4"
    padding="4 2"
    paddingMd="2 0"
    borderRadius="none"
    class="max-w-ds-144 m-auto flex flex-col items-start justify-center"
    :elevation="0"
  >
    <StGrid
      cols="1"
      smCols="1"
      mdCols="4"
      lgCols="4"
      gap="4"
      className="w-full"
    >
      <StCardActionGame
        title="Fortune Tiger"
        subtitle="PG Soft"
        buttonText="Jogar"
        to="/"
        :bgImage="resolveScreenImageUrl('screen-fortune-tiger.png')"
        illustration="characters/character-fortune-tiger"
      />
      <StCardActionGame
        title="Fortune Rabbit"
        subtitle="PG Soft"
        buttonText="Jogar"
        to="/"
        :bgImage="resolveScreenImageUrl('screen-fortune-rabbit.png')"
        illustration="characters/character-fortune-rabbit"
      />
      <StCardActionGame
        title="Voos no Aviator"
        subtitle="PG Soft"
        buttonText="Jogar"
        to="/"
        :bgImage="resolveScreenImageUrl('screen-aviator.png')"
        illustration="casino/casino-fly-5"
      />
      <StCardActionGame
        title="Gates of Olympus"
        subtitle="PG Soft"
        buttonText="Jogar"
        to="/"
        :bgImage="resolveScreenImageUrl('screen-gates-of-olimpus.png')"
        illustration="characters/character-game-zeus-2"
      />
    </StGrid>
  </StPaper>
  <StPaper
    variant="surface-4"
    padding="4 2"
    paddingMd="2 0"
    borderRadius="none"
    class="max-w-ds-144 m-auto flex flex-col items-start justify-center"
    :elevation="0"
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
        title="Cassino Ao vivo"
        buttonText="Quero Jogar"
        to="/"
        illustration="casino/casino-roulette-3"
      />
      <StCardActionGame
        title="Esporte Ao Vivo"
        buttonText="Quero Jogar"
        to="/"
        illustration="sports/sports-1"
      />
    </StGrid>
  </StPaper>

  <StPaper
    variant="surface-4"
    padding="6 2"
    paddingMd="4 0"
    borderRadius="none"
    class="max-w-ds-144 m-auto flex flex-col items-start justify-center"
    :elevation="0"
  >
    <StGrid
      cols="3"
      smCols="5"
      mdCols="10"
      lgCols="10"
      gap="4"
      className="w-full"
    >
      <div
        v-for="item in sportsIllustrations"
        :key="item.name"
        className="w-full flex items-center justify-center flex-col gap-ds-2"
      >
        <StIllustration
          :name="item.name"
          :alt="item.title"
          :title="item.title"
          width="5"
        />
        <StTypography
          as="h4"
          variant="body-medium"
          className="text-center align-center"
          >{{ item.title }}</StTypography
        >
      </div>
    </StGrid>
  </StPaper>

  <StPaper
    variant="surface-3"
    padding="4 2"
    paddingMd="2 0"
    borderRadius="none"
    class="max-w-ds-144 m-auto flex flex-col items-start justify-center"
    :elevation="0"
  >
    <StTypography
      as="h3"
      variant="hero-title"
      :lines="2"
      :size="8"
      weight="extrabold"
      lineHeight="tight"
      className="mb-ds-4"
      >Jogos Populares</StTypography
    >
    <StGrid cols="2" mdCols="3" lgCols="5" gap="4" className="w-full">
      <StCardGame
        v-for="game in slotsGames.slice(0, 5)"
        variant="surface-3"
        :key="game.id"
        :name="game.name"
        :provider="game.provider"
        :image="resolveAssetsImageUrl('games', game.image)"
      />
    </StGrid>

    <StTypography
      as="h3"
      variant="hero-title"
      :lines="2"
      :size="8"
      weight="extrabold"
      lineHeight="tight"
      className="my-ds-4"
      >Cassino ao vivo</StTypography
    >
    <StGrid cols="2" mdCols="3" lgCols="5" gap="4" className="w-full">
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
      >Esportes</StTypography
    >
    <StGrid
      cols="1"
      smCols="1"
      mdCols="3"
      lgCols="3"
      gap="4"
      className="w-full"
    >
      <StCardActionGame
        title="Futebol Europeu"
        subtitle="Campeonato Espanhol"
        buttonText="Jogar"
        to="/"
        :bgImage="resolveScreenImageUrl('screen-soccer.png')"
        illustration="pixar/pixar-barcelona"
      />
      <StCardActionGame
        title="O melhor do Basquete"
        subtitle="Tudo que acontece na NBA"
        buttonText="Jogar"
        to="/"
        :bgImage="resolveScreenImageUrl('screen-basketball.png')"
        illustration="pixar/pixar-okc"
      />
      <StCardActionGame
        title="Brasileirão é na Start"
        subtitle="Campeonato Brasileiro de Futebol"
        buttonText="Jogar"
        to="/"
        :bgImage="resolveScreenImageUrl('screen-soccer.png')"
        illustration="pixar/pixar-santos"
      />
    </StGrid>
  </StPaper>
</template>
