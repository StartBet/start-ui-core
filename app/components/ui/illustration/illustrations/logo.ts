export const LOGO_ILLUSTRATIONS = {
  'logo/logo-campeonato-mineiro': () =>
    import('~~/assets/illustrations/logo/logo-campeonato-mineiro.svg?raw').then(
      (m) => m.default
    ),
  'logo/logo-fcth': () =>
    import('~~/assets/illustrations/logo/logo-fcth.svg?raw').then(
      (m) => m.default
    ),
  'logo/logo-jaragua': () =>
    import('~~/assets/illustrations/logo/logo-jaragua.svg?raw').then(
      (m) => m.default
    ),
  'logo/logo-swift': () =>
    import('~~/assets/illustrations/logo/logo-swift.svg?raw').then(
      (m) => m.default
    ),
  'logo/logo-pix': () =>
    import('~~/assets/illustrations/logo/logo-pix.svg?raw').then(
      (m) => m.default
    )
} as const;
