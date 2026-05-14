<script setup lang="ts">
import { computed } from 'vue';
import StGrid from '~/components/ui/grid/StGrid.vue';
import StIllustration from '~/components/ui/illustration/StIllustration.vue';
import StUnorderedList from '~/components/ui/list/unordered-list/StUnorderedList.vue';
import StListItem from '~/components/ui/list/list-item/StListItem.vue';
import StPaper from '~/components/ui/paper/StPaper.vue';
import StTypography from '~/components/ui/typography/StTypography.vue';
import { stFooterRootClass } from './styleStFooter';
import { useThemeService } from '~/services/themeService';

defineOptions({ name: 'StFooter' });

const { theme } = useThemeService();

const brandIllustrationName = computed(() =>
  theme.value === 'light' ? 'brand/brand-light' : 'brand/brand-dark'
);
</script>

<template>
  <footer :class="stFooterRootClass">
    <StGrid cols="1" mdCols="2" lgCols="5" className="border-t border-border-3">
      <StPaper
        variant="surface-2"
        padding="4"
        borderRadius="none"
        :elevation="0"
      >
        <StTypography as="h4" variant="heading-4" class="mb-ds-2"
          >Sobre</StTypography
        >
        <StUnorderedList dense>
          <StListItem size="small" clickable> Nós </StListItem>
          <StListItem size="small" clickable> Jogo Responsável </StListItem>
          <StListItem size="small" clickable> Regras do Jogo </StListItem>
          <StListItem size="small" clickable> Blog </StListItem>
          <StListItem size="small" clickable>
            Política de Privacidade
          </StListItem>
          <StListItem size="small" clickable> Política PLD-FTP </StListItem>
          <StListItem size="small" clickable> Política de Cookies </StListItem>
          <StListItem size="small" clickable>
            Autoexclusão Centralizada
          </StListItem>
        </StUnorderedList>
      </StPaper>
      <StPaper
        variant="surface-1"
        padding="4"
        borderRadius="none"
        :elevation="0"
      >
        <StTypography as="h4" variant="heading-4" class="mb-ds-2"
          >Informações</StTypography
        >
        <StUnorderedList dense>
          <StListItem size="small" clickable> Promoções </StListItem>
          <StListItem size="small" clickable> Termos e condições </StListItem>
          <StListItem size="small" clickable> Central de ajuda </StListItem>
          <StListItem size="small" clickable> Nossos Telegram </StListItem>
        </StUnorderedList>
      </StPaper>
      <StPaper
        variant="surface-2"
        padding="4"
        borderRadius="none"
        :elevation="0"
      >
        <StTypography as="h4" variant="heading-4" class="mb-ds-2"
          >Produtos</StTypography
        >
        <StUnorderedList dense>
          <StListItem size="small" clickable> Esportes </StListItem>
          <StListItem size="small" clickable> Apostas ao vivo </StListItem>
          <StListItem size="small" clickable> Cassino </StListItem>
          <StListItem size="small" clickable> Cassino ao vivo </StListItem>
          <StListItem size="small" clickable> Torneios </StListItem>
        </StUnorderedList>
      </StPaper>
      <StPaper
        variant="surface-1"
        padding="4"
        borderRadius="none"
        :elevation="0"
        className="lg:col-span-2"
      >
        <StGrid cols="1" mdCols="2" gap="2" mdGap="0" padding="none">
          <div class="flex flex-col items-start gap-ds-4">
            <StIllustration
              :name="brandIllustrationName"
              alt="Brand"
              height="5"
            />
            <div class="flex gap-ds-1">
              <StButton
                color="primary"
                variant="outline"
                size="small"
                iconLeft="fab:telegram-plane"
              />
              <StButton
                color="primary"
                variant="outline"
                size="small"
                iconLeft="fab:youtube"
              />
              <StButton
                color="primary"
                variant="outline"
                size="small"
                iconLeft="fab:instagram"
              />
              <StButton
                color="primary"
                variant="outline"
                size="small"
                iconLeft="fab:facebook-f"
              />
              <StButton
                color="primary"
                variant="outline"
                size="small"
                iconLeft="fab:x-twitter"
              />
              <StButton
                color="primary"
                variant="outline"
                size="small"
                iconLeft="fab:tiktok"
              />
            </div>
          </div>
          <div class="flex flex-col items-start gap-ds-2">
            <StTypography
              as="p"
              variant="body-small"
              class="text-content-disable"
            >
              A <span class="text-content-secondary">Startbet&nbsp;</span>é
              operada pela LBBR APOSTAS DE QUOTA FIXA S.A, uma empresa
              registrada sob o CNPJ nº 56.441.713/0001-45, licenciada - em nível
              federal - pela Secretaria de Prêmios e Apostas do Ministério da
              Fazenda (“SPA/MF”) no Brasil com o número de Autorização SPA/MF nº
              527, publicada em 14 de março de 2025 no Diário Oficial da União |
              Ouvidoria:&nbsp;0800 033 0396,&nbsp;ouvidoria@lbbr.org Endereço
              Sede LBBR: Cidade e Estado de São Paulo, na Rua Luigi Galvani, nº
              200, 5º Andar, cj. 52, Cidade Monções, CEP 04.575-020&nbsp;
            </StTypography>
            <img
              src="https://media.pl-01.cdn-platform.xyz/cms/projects/66/files/AUTORIZADO%201.webp"
              alt="Autorização"
              height="39"
              width="145"
            />
            <StTypography as="p" variant="body-small">
              <strong
                >Aposte com responsabilidade. Proibido para menores de 18 anos.
                Plataforma regulamentada. Apostas podem causar
                dependência.</strong
              >
            </StTypography>
            <img
              src="https://media.pl-01.cdn-platform.xyz/cms/projects/66/files/plus-18-movie.webp"
              alt="Plus 18"
              height="34"
              width="34"
            />
          </div>
        </StGrid>
      </StPaper>
    </StGrid>
    <StGrid cols="1" className="border-t border-border-3">
      <StPaper
        variant="surface-1"
        padding="2"
        borderRadius="none"
        :elevation="0"
      >
        <StTypography as="p" variant="body-small"
          >Simplifique seu jogo na Start bet</StTypography
        >
      </StPaper>
    </StGrid>
  </footer>
</template>
