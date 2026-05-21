export const BRAND_ILLUSTRATIONS = {
  'brand/brand-dark': () =>
    import('~~/assets/illustrations/brand/brand-dark.svg?raw').then(
      (m) => m.default
    ),
  'brand/brand-light': () =>
    import('~~/assets/illustrations/brand/brand-light.svg?raw').then(
      (m) => m.default
    ),
  'brand/brand-fav-dark': () =>
    import('~~/assets/illustrations/brand/brand-fav-dark.svg?raw').then(
      (m) => m.default
    ),
  'brand/brand-fav-light': () =>
    import('~~/assets/illustrations/brand/brand-fav-light.svg?raw').then(
      (m) => m.default
    ),
  'brand/icon-arrow-1': () =>
    import('~~/assets/illustrations/brand/icon-arrow-1.svg?raw').then(
      (m) => m.default
    ),
  'brand/icon-arrow-2': () =>
    import('~~/assets/illustrations/brand/icon-arrow-2.svg?raw').then(
      (m) => m.default
    ),
  'brand/icon-arrow-3': () =>
    import('~~/assets/illustrations/brand/icon-arrow-3.svg?raw').then(
      (m) => m.default
    ),
  'brand/icon-button-1': () =>
    import('~~/assets/illustrations/brand/icon-button-1.svg?raw').then(
      (m) => m.default
    ),
  'brand/icon-button-2': () =>
    import('~~/assets/illustrations/brand/icon-button-2.svg?raw').then(
      (m) => m.default
    ),
  'brand/icon-button-3': () =>
    import('~~/assets/illustrations/brand/icon-button-3.svg?raw').then(
      (m) => m.default
    ),
  'brand/icon-button-4': () =>
    import('~~/assets/illustrations/brand/icon-button-4.svg?raw').then(
      (m) => m.default
    ),
  'brand/icon-button-5': () =>
    import('~~/assets/illustrations/brand/icon-button-5.svg?raw').then(
      (m) => m.default
    ),
  'brand/icon-button-6': () =>
    import('~~/assets/illustrations/brand/icon-button-6.svg?raw').then(
      (m) => m.default
    )
} as const;
