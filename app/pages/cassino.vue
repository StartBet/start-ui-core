<script setup lang="ts">
useHead({ title: 'Cassino' })
</script>

<template>
  <div class="space-y-ds-6">
    <StPaper variant="surface-4" padding="none" borderRadius="none" class="max-w-ds-144 m-auto pt-ds-6 flex flex-col items-start justify-center" :elevation="0">
      <StTypography as="h2" variant="heading-2" className="text-center align-center">Principais Jogos</StTypography>
      <StGrid cols="1" smCols="1" mdCols="3" lgCols="3" gap="4" padding="4 0 0" className="w-full">
        <AppCardActionGame title="Fortune Tiger" subtitle="PG Soft" buttonText="Jogar" to="/" illustration="characters/character-fortune-tiger" />
        <AppCardActionGame title="Fortune Rabbit" subtitle="PG Soft" buttonText="Jogar" to="/" illustration="characters/character-fortune-rabbit" />
        <AppCardActionGame title="Fortune Mouse" subtitle="PG Soft" buttonText="Jogar" to="/" illustration="characters/character-fortune-mouse" />
      </StGrid>
    </StPaper>
    <StPaper variant="surface-4" padding="none" borderRadius="none" class="max-w-ds-144 m-auto pt-ds-6 flex flex-col items-start justify-center" :elevation="0">
      <StTypography as="h2" variant="heading-1" className="text-center align-center">Opção de título 1</StTypography>
      <StTypography as="h2" variant="heading-2" className="text-center align-center">Opção de título 2</StTypography>
      <StTypography as="h2" variant="heading-3" className="text-center align-center">Opção de título 3</StTypography>
      <StTypography as="h2" variant="heading-4" className="text-center align-center">Opção de título 4</StTypography>
      <StTypography as="h2" variant="highlight-large" className="text-center align-center">Opção de destaque Large</StTypography>
      <StTypography as="h2" variant="highlight-medium" className="text-center align-center">Opção de destaque Medium</StTypography>
      <StTypography as="h2" variant="body-large" className="text-center align-center">Opção de corpo Large</StTypography>
      <StTypography as="h2" variant="body-medium" className="text-center align-center">Opção de corpo Medium</StTypography>
      <StTypography as="h2" variant="body-small" className="text-center align-center">Opção de corpo Small</StTypography>
    </StPaper>
  </div>
</template>
