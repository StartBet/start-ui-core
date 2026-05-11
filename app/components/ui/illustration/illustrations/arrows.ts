export const ARROWS_ILLUSTRATIONS = {
  'arrows/arrow-1': () =>
    import('~~/assets/illustrations/arrows/arrow-1.svg?raw').then((m) => m.default),
  'arrows/arrow-2': () =>
    import('~~/assets/illustrations/arrows/arrow-2.svg?raw').then((m) => m.default),
  'arrows/arrow-3': () =>
    import('~~/assets/illustrations/arrows/arrow-3.svg?raw').then((m) => m.default),
  'arrows/arrow-4': () =>
    import('~~/assets/illustrations/arrows/arrow-4.svg?raw').then((m) => m.default),
  'arrows/arrow-5': () =>
    import('~~/assets/illustrations/arrows/arrow-5.svg?raw').then((m) => m.default),
} as const