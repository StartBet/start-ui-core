export const BALLS_ILLUSTRATIONS = {
  'balls/ball-basketball-1': () =>
    import('~~/assets/illustrations/balls/ball-basketball-1.svg?raw').then((m) => m.default),
  'balls/ball-basketball-2': () =>
    import('~~/assets/illustrations/balls/ball-basketball-2.svg?raw').then((m) => m.default),
  'balls/ball-basketball-3': () =>
    import('~~/assets/illustrations/balls/ball-basketball-3.svg?raw').then((m) => m.default),
  'balls/ball-soccer-1': () =>
    import('~~/assets/illustrations/balls/ball-soccer-1.svg?raw').then((m) => m.default),
  'balls/ball-soccer-2': () =>
    import('~~/assets/illustrations/balls/ball-soccer-2.svg?raw').then((m) => m.default),
  'balls/ball-soccer-3': () =>
    import('~~/assets/illustrations/balls/ball-soccer-3.svg?raw').then((m) => m.default),
} as const
