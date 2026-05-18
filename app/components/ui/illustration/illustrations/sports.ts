export const SPORTS_ILLUSTRATIONS = {
  'sports/sports-1': () =>
    import('~~/assets/illustrations/sports/sports-1.svg?raw').then(
      (m) => m.default
    ),
  'sports/sports-badmintom': () =>
    import('~~/assets/illustrations/sports/sports-badmintom.svg?raw').then(
      (m) => m.default
    ),
  'sports/sports-baseball': () =>
    import('~~/assets/illustrations/sports/sports-baseball.svg?raw').then(
      (m) => m.default
    ),
  'sports/sports-basketball': () =>
    import('~~/assets/illustrations/sports/sports-basketball.svg?raw').then(
      (m) => m.default
    ),
  'sports/sports-cricket': () =>
    import('~~/assets/illustrations/sports/sports-cricket.svg?raw').then(
      (m) => m.default
    ),
  'sports/sports-dart': () =>
    import('~~/assets/illustrations/sports/sports-dart.svg?raw').then(
      (m) => m.default
    ),
  'sports/sports-floorball': () =>
    import('~~/assets/illustrations/sports/sports-floorball.svg?raw').then(
      (m) => m.default
    ),
  'sports/sports-hoquei': () =>
    import('~~/assets/illustrations/sports/sports-hoquei.svg?raw').then(
      (m) => m.default
    ),
  'sports/sports-soccer': () =>
    import('~~/assets/illustrations/sports/sports-soccer.svg?raw').then(
      (m) => m.default
    ),
  'sports/sports-tenis': () =>
    import('~~/assets/illustrations/sports/sports-tenis.svg?raw').then(
      (m) => m.default
    ),
  'sports/sports-voleiball': () =>
    import('~~/assets/illustrations/sports/sports-voleiball.svg?raw').then(
      (m) => m.default
    )
} as const;
