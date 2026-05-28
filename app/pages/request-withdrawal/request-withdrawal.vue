<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { useThemeService } from '~/services/themeService';
import { requestWithdrawalRootClass } from './styleRequestWithdrawal';
import StIllustration from '~/components/ui/illustration/StIllustration.vue';
import StTypography from '~/components/ui/typography/StTypography.vue';
import StButton from '~/components/ui/buttom/button/StButton.vue';
import StPaper from '~/components/ui/paper/StPaper.vue';
import StChip from '~/components/ui/chip/StChip.vue';
import type { ZendeskGlobal } from '~/types/Zendesk';
import {
  buildPandaVideoEmbedSrc,
  requestWithdrawalPandaVideo
} from '~/utils/pandaVideo';

const { theme } = useThemeService();

const brandIllustrationName = computed(() =>
  theme.value === 'light' ? 'brand/brand-light' : 'brand/brand-dark'
);

const zendesk = globalThis as ZendeskGlobal;

const videoSrc = computed(() =>
  buildPandaVideoEmbedSrc(
    requestWithdrawalPandaVideo.videoId,
    requestWithdrawalPandaVideo.params
  )
);

const queueStartValue = ref(Math.floor(5 + Math.random() * 4));
const queuePosition = ref(queueStartValue.value);

const queueDurationMs = 60_000;
const queueTimeoutIds = ref<Array<ReturnType<typeof globalThis.setTimeout>>>(
  []
);

onMounted(() => {
  const startValue = queueStartValue.value;
  if (startValue <= 0) {
    queuePosition.value = 0;
    return;
  }

  const randomTimes = Array.from({ length: Math.max(0, startValue - 1) }, () =>
    Math.floor(1_000 + Math.random() * (queueDurationMs - 2_000))
  ).sort((a, b) => a - b);

  const decrementTimes = [...randomTimes, queueDurationMs];

  decrementTimes.forEach((timeMs, index) => {
    const timeoutId = globalThis.setTimeout(() => {
      queuePosition.value = Math.max(0, startValue - (index + 1));
    }, timeMs);

    queueTimeoutIds.value.push(timeoutId);
  });
});

onBeforeUnmount(() => {
  queueTimeoutIds.value.forEach((id) => globalThis.clearTimeout(id));
  queueTimeoutIds.value = [];
});

const zendeskSnippetId = 'ze-snippet';
const zendeskSnippetUrl =
  'https://static.zdassets.com/ekr/snippet.js?key=05f7e9c0-797b-4df7-9b07-5d976d554662';

const isChatLoading = ref(false);

let isZendeskCloseHandlerRegistered = false;

const hideZendeskMessenger = () => {
  zendesk.zE?.('messenger', 'hide');
};

const registerZendeskCloseHandler = () => {
  if (!zendesk.zE || isZendeskCloseHandlerRegistered) {
    return;
  }

  zendesk.zE('messenger:on', 'close', hideZendeskMessenger);
  isZendeskCloseHandlerRegistered = true;
};

const showAndOpenZendeskMessenger = () => {
  registerZendeskCloseHandler();
  zendesk.zE?.('messenger', 'show');
  zendesk.zE?.('messenger', 'open');
  isChatLoading.value = false;
};

const openZendeskChat = () => {
  if (zendesk.zE) {
    showAndOpenZendeskMessenger();
    return;
  }

  const existingSnippet = document.getElementById(zendeskSnippetId);

  isChatLoading.value = true;

  if (existingSnippet) {
    existingSnippet.addEventListener(
      'load',
      () => {
        showAndOpenZendeskMessenger();
      },
      { once: true }
    );
    return;
  }

  const snippet = document.createElement('script');
  snippet.id = zendeskSnippetId;
  snippet.src = zendeskSnippetUrl;
  snippet.async = true;
  snippet.addEventListener('load', () => {
    showAndOpenZendeskMessenger();
  });
  snippet.addEventListener('error', () => {
    isChatLoading.value = false;
  });
  document.head.appendChild(snippet);
};
</script>

<template>
  <div :class="requestWithdrawalRootClass">
    <StIllustration
      :name="brandIllustrationName"
      alt="Brand"
      height="6"
      className="transition-all duration-200 ease-in-out hover:drop-shadow-action-hover active:drop-shadow-action-pressed"
    />
    <div
      v-if="queuePosition > 0"
      class="flex flex-row items-center justify-center"
    >
      <StTypography
        variant="body-large"
        as="h2"
        align="center"
        weight="semibold"
      >
        Sua posição na fila de atendimento é:
      </StTypography>
      <StChip variant="secondary" className="ml-ds-1">
        {{ queuePosition }}
      </StChip>
    </div>
    <StTypography
      as="h1"
      variant="hero-title"
      :lines="2"
      :size="8"
      weight="extrabold"
      lineHeight="tight"
      align="center"
    >
      Enquanto isso, veja o que programamos para você!
    </StTypography>
    <StPaper width="full" height="56" borderRadius="none">
      <iframe
        :id="requestWithdrawalPandaVideo.iframeId"
        :src="videoSrc"
        allow="
          accelerometer;
          gyroscope;
          autoplay;
          encrypted-media;
          picture-in-picture;
        "
        allowfullscreen="true"
        fetchpriority="high"
        title="Novo Site StartBet"
        style="width: 100%; height: 100%"
      ></iframe>
    </StPaper>
    <StButton
      :disabled="queuePosition > 0"
      color="secondary"
      @click="openZendeskChat"
    >
      Falar com Atendimento
      <template #endAdornment>
        <StIllustration
          name="brand/icon-button-2"
          alt="Button Right"
          height="3"
        /> </template
    ></StButton>
  </div>
</template>
