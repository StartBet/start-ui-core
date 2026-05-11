export const PIXAR_ILLUSTRATIONS = {
  'pixar/pixar-barcelona': () =>
    import('~~/assets/illustrations/pixar/pixar-barcelona.svg?raw').then((m) => m.default),
  'pixar/pixar-okc': () =>
    import('~~/assets/illustrations/pixar/pixar-okc.svg?raw').then((m) => m.default),
  'pixar/pixar-santos': () =>
    import('~~/assets/illustrations/pixar/pixar-santos.svg?raw').then((m) => m.default),
} as const