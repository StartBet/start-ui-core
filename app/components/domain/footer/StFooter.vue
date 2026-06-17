<script setup lang="ts">
import { computed } from 'vue';
import StGrid from '~/components/ui/grid/StGrid.vue';
import StIllustration from '~/components/ui/illustration/StIllustration.vue';
import StButton from '~/components/ui/buttom/button/StButton.vue';
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
    <StPaper
      variant="surface-3"
      borderRadius="none"
      :elevation="0"
      className="bg-gradient-to-b from-surface-3 to-surface-1"
    >
      <StGrid cols="1" lgCols="3" gap="4" className="max-w-ds-144 m-auto">
        <StPaper variant="surface-3" padding="4" borderRadius="2">
          <StTypography
            as="h4"
            variant="body-small"
            weight="bold"
            uppercase
            class="text-content-secondary"
            >Sobre</StTypography
          >
          <StUnorderedList dense className="ml-[-.5rem]">
            <StListItem size="small" clickable> Nós </StListItem>
            <StListItem size="small" clickable> Jogo Responsável </StListItem>
            <StListItem size="small" clickable> Regras do Jogo </StListItem>
            <StListItem size="small" clickable> Blog </StListItem>
            <StListItem size="small" clickable>
              Política de Privacidade
            </StListItem>
            <StListItem size="small" clickable> Política PLD-FTP </StListItem>
            <StListItem size="small" clickable>
              Política de Cookies
            </StListItem>
            <StListItem size="small" clickable>
              Autoexclusão Centralizada
            </StListItem>
          </StUnorderedList>
        </StPaper>
        <StPaper variant="surface-3" padding="4" borderRadius="2">
          <StTypography
            as="h4"
            variant="body-small"
            weight="bold"
            uppercase
            class="text-content-secondary"
            >Informações</StTypography
          >
          <StUnorderedList dense className="ml-[-.5rem]">
            <StListItem size="small" clickable> Promoções </StListItem>
            <StListItem size="small" clickable> Termos e condições </StListItem>
            <StListItem size="small" clickable> Central de ajuda </StListItem>
            <StListItem size="small" clickable> Nossos Telegram </StListItem>
          </StUnorderedList>
        </StPaper>
        <StPaper variant="surface-3" padding="4" borderRadius="2">
          <StTypography
            as="h4"
            variant="body-small"
            weight="bold"
            uppercase
            class="text-content-secondary"
            >Produtos</StTypography
          >
          <StUnorderedList dense className="ml-[-.5rem]">
            <StListItem size="small" clickable> Esportes </StListItem>
            <StListItem size="small" clickable> Apostas ao vivo </StListItem>
            <StListItem size="small" clickable> Cassino </StListItem>
            <StListItem size="small" clickable> Cassino ao vivo </StListItem>
            <StListItem size="small" clickable> Torneios </StListItem>
          </StUnorderedList>
        </StPaper>
      </StGrid>
    </StPaper>
    <StPaper variant="surface-1" borderRadius="none" :elevation="0">
      <StPaper
        variant="surface-1"
        padding="6 0"
        borderRadius="none"
        :elevation="0"
        className="max-w-ds-144 m-auto"
      >
        <div class="flex items-center justify-between gap-ds-2 w-full mb-ds-4">
          <NuxtLink to="/" aria-label="Home">
            <StIllustration
              :name="brandIllustrationName"
              alt="Brand"
              height="5"
              className="transition-all duration-200 ease-in-out hover:drop-shadow-action-hover active:drop-shadow-action-pressed"
            />
          </NuxtLink>
          <div class="flex flex-wrap gap-ds-1">
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
        <div class="flex gap-ds-6">
          <div class="flex flex-col items-start gap-ds-4">
            <StTypography as="p" variant="body-small" class="!text-[.7rem]">
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
            <StTypography as="p" variant="body-small" class="!text-[.7rem]">
              <strong
                >Aposte com responsabilidade. Proibido para menores de 18 anos.
                Plataforma regulamentada. Apostas podem causar
                dependência.</strong
              >
            </StTypography>
          </div>
          <div class="flex flex-col items-start gap-ds-2 shrink-0">
            <img
              src="https://media.pl-01.cdn-platform.xyz/cms/projects/66/files/AUTORIZADO%201.webp"
              alt="Autorização"
              height="64"
              width="240"
            />
            <div class="flex gap-ds-2 max-w-ds-30 align-center justify-center">
              <img
                src="https://media.pl-01.cdn-platform.xyz/cms/projects/66/files/plus-18-movie.webp"
                alt="Plus 18"
                height="48"
                width="48"
                className="shrink-0 self-center"
              />
              <StTypography
                as="p"
                variant="body-large"
                weight="bold"
                className="text-content-secondary w-auto"
                >Jogue com responsabilidade</StTypography
              >
            </div>
          </div>
        </div>
        <div class="w-full h-px bg-border-2 my-ds-4"></div>
        <div class="flex gap-ds-2">
          <div class="flex flex-col w-full gap-ds-2">
            <StTypography
              as="h4"
              variant="body-small"
              weight="bold"
              uppercase
              class="text-content-secondary"
              >Patrocinadores oficiais da Start em 2026</StTypography
            >
            <div class="flex gap-ds-4 py-ds-3">
              <StPaper
                variant="surface-1"
                padding="1 4 1 0"
                borderRadius="none"
                :elevation="0"
                className="border-r border-border-2"
              >
                <StIllustration
                  name="logo/logo-campeonato-mineiro"
                  alt="Brand"
                  height="6"
                  className="transition-all duration-200 ease-in-out hover:drop-shadow-action-hover active:drop-shadow-action-pressed"
                />
              </StPaper>
              <StPaper
                variant="surface-1"
                padding="1 4 1 0"
                borderRadius="none"
                :elevation="0"
                className="border-r border-border-2"
              >
                <StIllustration
                  name="logo/logo-jaragua"
                  alt="Brand"
                  height="6"
                  className="transition-all duration-200 ease-in-out hover:drop-shadow-action-hover active:drop-shadow-action-pressed"
                />
              </StPaper>
              <StPaper
                variant="surface-1"
                padding="1 4 1 0"
                borderRadius="none"
                :elevation="0"
                className="border-r border-border-2"
              >
                <StIllustration
                  name="logo/logo-swift"
                  alt="Brand"
                  height="6"
                  className="transition-all duration-200 ease-in-out hover:drop-shadow-action-hover active:drop-shadow-action-pressed"
                />
              </StPaper>
              <StPaper
                variant="surface-1"
                padding="1 4 1 0"
                borderRadius="none"
                :elevation="0"
              >
                <StIllustration
                  name="logo/logo-fcth"
                  alt="Brand"
                  height="6"
                  className="transition-all duration-200 ease-in-out hover:drop-shadow-action-hover active:drop-shadow-action-pressed"
                />
              </StPaper>
            </div>
          </div>
          <div class="flex flex-col gap-ds-2 shrink-0">
            <StTypography
              as="h4"
              variant="body-small"
              weight="bold"
              uppercase
              class="text-content-secondary"
              >Pague com:</StTypography
            >
            <StPaper variant="surface-0" padding="3">
              <StIllustration
                name="logo/logo-pix"
                alt="Brand"
                height="6"
                className="transition-all duration-200 ease-in-out hover:drop-shadow-action-hover active:drop-shadow-action-pressed"
              />
            </StPaper>
          </div>
        </div>
      </StPaper>
    </StPaper>
    <StGrid cols="1" className="border-t border-border-3">
      <StPaper
        variant="surface-1"
        padding="3"
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
