import type { Config } from 'tailwindcss';

export default {
  content: [
    './app/**/*.{vue,js,ts}',
    './tailwind.config.{js,ts}',
    './nuxt.config.{js,ts}'
  ],
  safelist: [
    { pattern: /rounded-ds-(?:1|2)/ },
    { pattern: /shadow-paper-[0-4]/ },
    { pattern: /shadow-paper-[1-4]/, variants: ['hover'] },
    { pattern: /grid-cols-(?:[1-9]|1[0-2])/, variants: ['sm', 'md', 'lg'] },
    { pattern: /gap-(?:ds-(?:[1-9]|1[0-2]))/, variants: ['sm', 'md', 'lg'] },
    { pattern: /gap-x-(?:ds-(?:[1-9]|1[0-2]))/, variants: ['sm', 'md', 'lg'] },
    { pattern: /gap-y-(?:ds-(?:[1-9]|1[0-2]))/, variants: ['sm', 'md', 'lg'] },
    { pattern: /p-(?:0|ds-(?:[1-9]|1[0-2]))/, variants: ['sm', 'md', 'lg'] },
    { pattern: /px-(?:0|ds-(?:[1-9]|1[0-2]))/, variants: ['sm', 'md', 'lg'] },
    { pattern: /py-(?:0|ds-(?:[1-9]|1[0-2]))/, variants: ['sm', 'md', 'lg'] },
    { pattern: /pt-(?:0|ds-(?:[1-9]|1[0-2]))/, variants: ['sm', 'md', 'lg'] },
    { pattern: /pr-(?:0|ds-(?:[1-9]|1[0-2]))/, variants: ['sm', 'md', 'lg'] },
    { pattern: /pb-(?:0|ds-(?:[1-9]|1[0-2]))/, variants: ['sm', 'md', 'lg'] },
    { pattern: /pl-(?:0|ds-(?:[1-9]|1[0-2]))/, variants: ['sm', 'md', 'lg'] },
    {
      pattern: /m-(?:0|auto|ds-(?:[1-9]|1[0-2]))/,
      variants: ['sm', 'md', 'lg']
    },
    {
      pattern: /mx-(?:0|auto|ds-(?:[1-9]|1[0-2]))/,
      variants: ['sm', 'md', 'lg']
    },
    {
      pattern: /my-(?:0|auto|ds-(?:[1-9]|1[0-2]))/,
      variants: ['sm', 'md', 'lg']
    },
    {
      pattern: /mt-(?:0|auto|ds-(?:[1-9]|1[0-2]))/,
      variants: ['sm', 'md', 'lg']
    },
    {
      pattern: /mr-(?:0|auto|ds-(?:[1-9]|1[0-2]))/,
      variants: ['sm', 'md', 'lg']
    },
    {
      pattern: /mb-(?:0|auto|ds-(?:[1-9]|1[0-2]))/,
      variants: ['sm', 'md', 'lg']
    },
    {
      pattern: /ml-(?:0|auto|ds-(?:[1-9]|1[0-2]))/,
      variants: ['sm', 'md', 'lg']
    }
  ],
  theme: {
    extend: {
      colors: {
        brand: 'var(--color-brand)',
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        info: 'var(--color-info)',
        system: 'var(--color-system)',
        warning: 'var(--color-warning)',
        positive: 'var(--color-positive)',
        negative: 'var(--color-negative)',
        surface: {
          0: 'var(--color-surface-0)',
          1: 'var(--color-surface-1)',
          2: 'var(--color-surface-2)',
          3: 'var(--color-surface-3)',
          4: 'var(--color-surface-4)',
          primary: 'var(--color-surface-primary)',
          secondary: 'var(--color-surface-secondary)',
          info: 'var(--color-surface-info)',
          system: 'var(--color-surface-system)',
          warning: 'var(--color-surface-warning)',
          positive: 'var(--color-surface-positive)',
          negative: 'var(--color-surface-negative)'
        },
        content: {
          default: 'var(--color-content-default)',
          disable: 'var(--color-content-disable)',
          ghost: 'var(--color-content-ghost)',
          bright: 'var(--color-content-bright)',
          din: 'var(--color-content-din)',
          primary: 'var(--color-content-primary)',
          secondary: 'var(--color-content-secondary)',
          info: 'var(--color-content-info)',
          system: 'var(--color-content-system)',
          warning: 'var(--color-content-warning)',
          positive: 'var(--color-content-positive)',
          negative: 'var(--color-content-negative)'
        },
        border: {
          1: 'var(--color-border-1)',
          2: 'var(--color-border-2)',
          3: 'var(--color-border-3)'
        },
        focus: 'var(--color-focus)',
        pressed: 'var(--color-pressed)',
        hover: 'var(--color-hover)',
        st: {
          'brand-primary': {
            100: 'var(--brand-primary-100)',
            200: 'var(--brand-primary-200)',
            300: 'var(--brand-primary-300)',
            400: 'var(--brand-primary-400)',
            500: 'var(--brand-primary-500)',
            600: 'var(--brand-primary-600)',
            700: 'var(--brand-primary-700)',
            800: 'var(--brand-primary-800)',
            900: 'var(--brand-primary-900)',
            950: 'var(--brand-primary-950)'
          },
          'brand-secondary': {
            100: 'var(--brand-secondary-100)',
            200: 'var(--brand-secondary-200)',
            300: 'var(--brand-secondary-300)',
            400: 'var(--brand-secondary-400)',
            500: 'var(--brand-secondary-500)',
            600: 'var(--brand-secondary-600)',
            700: 'var(--brand-secondary-700)',
            800: 'var(--brand-secondary-800)',
            900: 'var(--brand-secondary-900)',
            950: 'var(--brand-secondary-950)'
          },
          neutral: {
            0: 'var(--neutral-color-000)',
            100: 'var(--neutral-color-100)',
            200: 'var(--neutral-color-200)',
            300: 'var(--neutral-color-300)',
            400: 'var(--neutral-color-400)',
            500: 'var(--neutral-color-500)',
            600: 'var(--neutral-color-600)',
            700: 'var(--neutral-color-700)',
            800: 'var(--neutral-color-800)',
            900: 'var(--neutral-color-900)',
            950: 'var(--neutral-color-950)'
          },
          info: {
            100: 'var(--info-color-100)',
            200: 'var(--info-color-200)',
            300: 'var(--info-color-300)',
            400: 'var(--info-color-400)',
            500: 'var(--info-color-500)',
            600: 'var(--info-color-600)',
            700: 'var(--info-color-700)',
            800: 'var(--info-color-800)',
            900: 'var(--info-color-900)',
            950: 'var(--info-color-950)'
          },
          system: {
            100: 'var(--system-color-100)',
            200: 'var(--system-color-200)',
            300: 'var(--system-color-300)',
            400: 'var(--system-color-400)',
            500: 'var(--system-color-500)',
            600: 'var(--system-color-600)',
            700: 'var(--system-color-700)',
            800: 'var(--system-color-800)',
            900: 'var(--system-color-900)',
            950: 'var(--system-color-950)'
          },
          positive: {
            100: 'var(--positive-color-100)',
            200: 'var(--positive-color-200)',
            300: 'var(--positive-color-300)',
            400: 'var(--positive-color-400)',
            500: 'var(--positive-color-500)',
            600: 'var(--positive-color-600)',
            700: 'var(--positive-color-700)',
            800: 'var(--positive-color-800)',
            900: 'var(--positive-color-900)',
            950: 'var(--positive-color-950)'
          },
          attention: {
            100: 'var(--attention-color-100)',
            200: 'var(--attention-color-200)',
            300: 'var(--attention-color-300)',
            400: 'var(--attention-color-400)',
            500: 'var(--attention-color-500)',
            600: 'var(--attention-color-600)',
            700: 'var(--attention-color-700)',
            800: 'var(--attention-color-800)',
            900: 'var(--attention-color-900)',
            950: 'var(--attention-color-950)'
          },
          negative: {
            100: 'var(--negative-color-100)',
            200: 'var(--negative-color-200)',
            300: 'var(--negative-color-300)',
            400: 'var(--negative-color-400)',
            500: 'var(--negative-color-500)',
            600: 'var(--negative-color-600)',
            700: 'var(--negative-color-700)',
            800: 'var(--negative-color-800)',
            900: 'var(--negative-color-900)',
            950: 'var(--negative-color-950)'
          },
          'shadow-scale': {
            100: 'var(--shadow-scale-100)',
            200: 'var(--shadow-scale-200)',
            300: 'var(--shadow-scale-300)',
            400: 'var(--shadow-scale-400)',
            500: 'var(--shadow-scale-500)',
            600: 'var(--shadow-scale-600)',
            700: 'var(--shadow-scale-700)',
            800: 'var(--shadow-scale-800)',
            900: 'var(--shadow-scale-900)',
            950: 'var(--shadow-scale-950)'
          },
          'light-scale': {
            100: 'var(--light-scale-100)',
            200: 'var(--light-scale-200)',
            300: 'var(--light-scale-300)',
            400: 'var(--light-scale-400)',
            500: 'var(--light-scale-500)',
            600: 'var(--light-scale-600)',
            700: 'var(--light-scale-700)',
            800: 'var(--light-scale-800)',
            900: 'var(--light-scale-900)',
            950: 'var(--light-scale-950)'
          },
          blue: {
            100: 'var(--blue-color-100)',
            200: 'var(--blue-color-200)',
            300: 'var(--blue-color-300)',
            400: 'var(--blue-color-400)',
            500: 'var(--blue-color-500)',
            600: 'var(--blue-color-600)',
            700: 'var(--blue-color-700)',
            800: 'var(--blue-color-800)',
            900: 'var(--blue-color-900)',
            950: 'var(--blue-color-950)'
          },
          ocean: {
            100: 'var(--ocean-color-100)',
            200: 'var(--ocean-color-200)',
            300: 'var(--ocean-color-300)',
            400: 'var(--ocean-color-400)',
            500: 'var(--ocean-color-500)',
            600: 'var(--ocean-color-600)',
            700: 'var(--ocean-color-700)',
            800: 'var(--ocean-color-800)',
            900: 'var(--ocean-color-900)',
            950: 'var(--ocean-color-950)'
          },
          green: {
            100: 'var(--green-color-100)',
            200: 'var(--green-color-200)',
            300: 'var(--green-color-300)',
            400: 'var(--green-color-400)',
            500: 'var(--green-color-500)',
            600: 'var(--green-color-600)',
            700: 'var(--green-color-700)',
            800: 'var(--green-color-800)',
            900: 'var(--green-color-900)',
            950: 'var(--green-color-950)'
          },
          yellow: {
            100: 'var(--yellow-color-100)',
            200: 'var(--yellow-color-200)',
            300: 'var(--yellow-color-300)',
            400: 'var(--yellow-color-400)',
            500: 'var(--yellow-color-500)',
            600: 'var(--yellow-color-600)',
            700: 'var(--yellow-color-700)',
            800: 'var(--yellow-color-800)',
            900: 'var(--yellow-color-900)',
            950: 'var(--yellow-color-950)'
          },
          orange: {
            100: 'var(--orange-color-100)',
            200: 'var(--orange-color-200)',
            300: 'var(--orange-color-300)',
            400: 'var(--orange-color-400)',
            500: 'var(--orange-color-500)',
            600: 'var(--orange-color-600)',
            700: 'var(--orange-color-700)',
            800: 'var(--orange-color-800)',
            900: 'var(--orange-color-900)',
            950: 'var(--orange-color-950)'
          },
          red: {
            100: 'var(--red-color-100)',
            200: 'var(--red-color-200)',
            300: 'var(--red-color-300)',
            400: 'var(--red-color-400)',
            500: 'var(--red-color-500)',
            600: 'var(--red-color-600)',
            700: 'var(--red-color-700)',
            800: 'var(--red-color-800)',
            900: 'var(--red-color-900)',
            950: 'var(--red-color-950)'
          },
          pink: {
            100: 'var(--pink-color-100)',
            200: 'var(--pink-color-200)',
            300: 'var(--pink-color-300)',
            400: 'var(--pink-color-400)',
            500: 'var(--pink-color-500)',
            600: 'var(--pink-color-600)',
            700: 'var(--pink-color-700)',
            800: 'var(--pink-color-800)',
            900: 'var(--pink-color-900)',
            950: 'var(--pink-color-950)'
          },
          gray: {
            0: 'var(--gray-color-000)',
            100: 'var(--gray-color-100)',
            200: 'var(--gray-color-200)',
            300: 'var(--gray-color-300)',
            400: 'var(--gray-color-400)',
            500: 'var(--gray-color-500)',
            600: 'var(--gray-color-600)',
            700: 'var(--gray-color-700)',
            800: 'var(--gray-color-800)',
            900: 'var(--gray-color-900)',
            950: 'var(--gray-color-950)'
          }
        }
      },
      fontFamily: {
        heading: ['"Base Neue"', 'sans-serif'],
        highlight: ['"Base Neue"', 'sans-serif'],
        body: ['Montserrat', 'sans-serif']
      },
      fontSize: {
        'ds-xs': '0.75rem',
        'ds-sm': '0.875rem',
        'ds-base': '1rem',
        'ds-md': '1.125rem',
        'ds-lg': '1.25rem',
        'ds-xl': '1.5rem',
        'ds-2xl': '1.875rem',
        'ds-3xl': '2.25rem',
        'ds-4xl': '3rem',
        'ds-5xl': '3.75rem',
        'heading-1': [
          '3rem',
          { lineHeight: '1.1', letterSpacing: '-0.025em', fontWeight: '700' }
        ],
        'heading-2': [
          '2.25rem',
          { lineHeight: '1.1', letterSpacing: '-0.025em', fontWeight: '700' }
        ],
        'heading-3': [
          '1.875rem',
          { lineHeight: '1.25', letterSpacing: '-0.025em', fontWeight: '600' }
        ],
        'heading-4': [
          '1.5rem',
          { lineHeight: '1.25', letterSpacing: '0', fontWeight: '600' }
        ],
        'highlight-large': [
          '1.5rem',
          { lineHeight: '1.5', letterSpacing: '0', fontWeight: '400' }
        ],
        'highlight-medium': [
          '1.125rem',
          { lineHeight: '1.5', letterSpacing: '0', fontWeight: '400' }
        ],
        'body-large': [
          '1.125rem',
          { lineHeight: '1.75', letterSpacing: '0', fontWeight: '400' }
        ],
        'body-medium': [
          '1rem',
          { lineHeight: '1.75', letterSpacing: '0', fontWeight: '400' }
        ],
        'body-small': [
          '0.875rem',
          { lineHeight: '1.5', letterSpacing: '0', fontWeight: '400' }
        ]
      },
      lineHeight: {
        'ds-tight': '1.1',
        'ds-snug': '1.25',
        'ds-normal': '1.5',
        'ds-relaxed': '1.75',
        'ds-loose': '2'
      },
      letterSpacing: {
        'ds-tight': '-0.025em',
        'ds-normal': '0',
        'ds-wide': '0.025em',
        'ds-wider': '0.05em'
      },
      borderRadius: {
        'ds-1': '8px',
        'ds-2': '16px'
      },
      boxShadow: {
        'paper-0': '0 0 0 0 transparent',
        'paper-1':
          '0 1px 3px 0 var(--color-shadow-0), 0 1px 2px 0 var(--color-shadow-1)',
        'paper-2':
          '0 4px 6px -1px var(--color-shadow-0), 0 2px 4px -1px var(--color-shadow-1)',
        'paper-3':
          '0 10px 15px -3px var(--color-shadow-0), 0 4px 6px -2px var(--color-shadow-1)',
        'paper-4':
          '0 20px 25px -5px var(--color-shadow-0), 0 10px 10px -5px var(--color-shadow-1)',
        'directed-0': '0 0 0 0 transparent',
        'directed-1':
          '0 1px 3px 0 var(--color-shadow-0), 0 1px 2px 0 var(--color-shadow-1)',
        'directed-2':
          '0 4px 6px -1px var(--color-shadow-0), 0 2px 4px -1px var(--color-shadow-1)',
        'directed-3':
          '0 10px 15px -3px var(--color-shadow-0), 0 4px 6px -2px var(--color-shadow-1)',
        'directed-4':
          '0 20px 25px -5px var(--color-shadow-0), 0 10px 10px -5px var(--color-shadow-1)',
        'action-hover': '0 0 16px 2px var(--color-shadow-hover)',
        'action-pressed': '0 0 16px 4px var(--color-shadow-pressed)'
      },
      spacing: {
        'ds-1': '8px',
        'ds-2': '16px',
        'ds-3': '24px',
        'ds-4': '32px',
        'ds-5': '40px',
        'ds-6': '48px',
        'ds-7': '56px',
        'ds-8': '64px',
        'ds-9': '72px',
        'ds-10': '80px',
        'ds-11': '88px',
        'ds-12': '96px',
        'ds-15': '120px',
        'ds-16': '128px',
        'ds-20': '160px',
        'ds-24': '192px',
        'ds-32': '256px',
        'ds-40': '320px',
        'ds-48': '384px',
        'ds-56': '448px',
        'ds-64': '512px',
        'ds-72': '584px',
        'ds-80': '640px',
        'ds-96': '768px',
        'ds-128': '1024px',
        'ds-144': '1152px',
        'ds-160': '1280px',
        'ds-168': '1344px',
        'ds-240': '1920px'
      },
      textShadow: {
        'ds-small': '-1px 1px transparent, -2px 2px var(--light-scale-700)',
        'ds-medium': '-1px 1px transparent, -3px 3px var(--light-scale-700)',
        'ds-large': '-2px 2px transparent, -4px 4px var(--light-scale-700)'
      }
    }
  },
  plugins: [
    function ({ addUtilities, theme }) {
      const shadows = theme('textShadow');
      const utilities = Object.entries(shadows).map(([key, value]) => {
        return {
          [`.text-shadow-${key}`]: {
            textShadow: value
          }
        };
      });

      addUtilities(utilities);
    }
  ]
} satisfies Config;
