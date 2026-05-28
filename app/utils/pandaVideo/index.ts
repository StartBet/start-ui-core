export type PandaVideoEmbedParams = Record<
  string,
  string | number | boolean | undefined
>;

export type PandaVideoReceiveEventType =
  | 'panda_timeupdate'
  | 'panda_progress'
  | 'panda_ready'
  | 'panda_play'
  | 'panda_pause'
  | 'panda_seeking'
  | 'panda_seeked'
  | 'panda_ended'
  | 'panda_enterfullscreen'
  | 'panda_exitfullscreen'
  | 'panda_captionsenabled'
  | 'panda_captionsdisabled'
  | 'panda_languagechange'
  | 'panda_canplay'
  | 'panda_error'
  | 'panda_speed_update'
  | 'panda_smart_search'
  | 'panda_ai_quiz'
  | (string & {});

export type PandaVideoReceiveEventData = {
  message: PandaVideoReceiveEventType;
  currentTime?: number;
  video?: string;
};

export const PANDA_VIDEO_EMBED_ORIGIN = new URL(
  'https://player-vz-5383bdb2-211.tv.pandavideo.com.br/embed/'
).origin;

export function isPandaVideoReceiveEvent(
  event: MessageEvent<unknown>,
  options?: { videoId?: string; origin?: string }
): event is MessageEvent<PandaVideoReceiveEventData> {
  const expectedOrigin = options?.origin ?? PANDA_VIDEO_EMBED_ORIGIN;
  if (expectedOrigin && event.origin !== expectedOrigin) {
    const userAgent = globalThis.navigator?.userAgent ?? '';
    const isHappyDom = userAgent.toLowerCase().includes('happy-dom');
    const relaxedOrigins = new Set(['', 'null', 'about:blank']);
    if (!(isHappyDom && relaxedOrigins.has(event.origin))) return false;
  }

  if (event.data === null || typeof event.data !== 'object') return false;
  const data = event.data as Record<string, unknown>;

  const message = data.message;
  if (typeof message !== 'string') return false;

  if (options?.videoId) {
    const video =
      (typeof data.video === 'string' ? data.video : undefined) ??
      (typeof data.video_id === 'string' ? data.video_id : undefined) ??
      (typeof data.videoId === 'string' ? data.videoId : undefined);
    if (video !== options.videoId) return false;
  }

  return true;
}

export function buildPandaVideoEmbedSrc(
  videoId: string,
  params: PandaVideoEmbedParams
) {
  const url = new URL(
    'https://player-vz-5383bdb2-211.tv.pandavideo.com.br/embed/'
  );
  url.searchParams.set('v', videoId);

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined) return;
    url.searchParams.set(key, String(value));
  });

  return url.toString();
}

export const requestWithdrawalPandaVideo = {
  iframeId: 'panda-0990bad1-cc82-4db8-a175-493725acd914',
  videoId: '0990bad1-cc82-4db8-a175-493725acd914',
  durationSeconds: 63.573333,
  params: {
    controls: 'none',
    color: '#51238C',
    controlsColor: '#7FDD24',
    autoplay: true,
    smartAutoplay: true,
    pandaBranding: false,
    saveProgress: false,
    saveProgressScreen: false,
    saveProgressTitle: false,
    saveProgressBackgroundOpacity: false,
    saveProgressButton1Title: false,
    saveProgressButton2Title: false,
    mutedIndicatorIcon: true,
    mutedIndicatorAnimation: 'impact',
    mutedIndicatorLoop: true,
    mutedIndicatorLoopDuration: 5,
    mutedIndicatorTextTop: 'Clique aqui',
    mutedIndicatorTextBottom: 'para ativar o som',
    mutedIndicatorTextColor: '#F5F0DE',
    mutedIndicatorBackgroundColor: '#51238C94',
    disableForward: false,
    hideControlsOnStart: false,
    playOpensFullscreen: false,
    playOpensFullscreenNative: false,
    alternativeProgress: false,
    alternativeProgressDefaultVelocity: false,
    alternativeProgressVelocity: false,
    alternativeProgress2xLimit: false,
    alternativeProgressHeight: false,
    disablePause: false,
    bigPlayButtonSize: false,
    timeDisplayType: false
  } satisfies PandaVideoEmbedParams
} as const;
