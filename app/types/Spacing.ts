export type SpacingRule = 'p' | 'm'

export type ResponsivePrefix = 'sm' | 'md' | 'lg'

export type SizeValue =
  | 'auto'
  | 'full'
  | 'fit-content'
  | 'min-content'
  | 'max-content'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | '11'
  | '12'
  | '16'
  | '20'
  | '24'
  | '32'
  | '40'
  | '48'
  | '56'
  | '64'
  | '72'
  | '80'
  | '96'
  | '128'
  | '144'
  | '160'
  | '168'
  | '240'

export const sizeHeightClasses: Record<SizeValue, string> = {
  auto: 'h-auto',
  full: 'h-full',
  'fit-content': 'h-fit',
  'min-content': 'h-min',
  'max-content': 'h-max',
  '1': 'h-ds-1',
  '2': 'h-ds-2',
  '3': 'h-ds-3',
  '4': 'h-ds-4',
  '5': 'h-ds-5',
  '6': 'h-ds-6',
  '7': 'h-ds-7',
  '8': 'h-ds-8',
  '9': 'h-ds-9',
  '10': 'h-ds-10',
  '11': 'h-ds-11',
  '12': 'h-ds-12',
  '16': 'h-ds-16',
  '20': 'h-ds-20',
  '24': 'h-ds-24',
  '32': 'h-ds-32',
  '40': 'h-ds-40',
  '48': 'h-ds-48',
  '56': 'h-ds-56',
  '64': 'h-ds-64',
  '72': 'h-ds-72',
  '80': 'h-ds-80',
  '96': 'h-ds-96',
  '128': 'h-ds-128',
  '144': 'h-ds-144',
  '160': 'h-ds-160',
  '168': 'h-ds-168',
  '240': 'h-ds-240'
}

export const sizeWidthClasses: Record<SizeValue, string> = {
  auto: 'w-auto',
  full: 'w-full',
  'fit-content': 'w-fit',
  'min-content': 'w-min',
  'max-content': 'w-max',
  '1': 'w-ds-1',
  '2': 'w-ds-2',
  '3': 'w-ds-3',
  '4': 'w-ds-4',
  '5': 'w-ds-5',
  '6': 'w-ds-6',
  '7': 'w-ds-7',
  '8': 'w-ds-8',
  '9': 'w-ds-9',
  '10': 'w-ds-10',
  '11': 'w-ds-11',
  '12': 'w-ds-12',
  '16': 'w-ds-16',
  '20': 'w-ds-20',
  '24': 'w-ds-24',
  '32': 'w-ds-32',
  '40': 'w-ds-40',
  '48': 'w-ds-48',
  '56': 'w-ds-56',
  '64': 'w-ds-64',
  '72': 'w-ds-72',
  '80': 'w-ds-80',
  '96': 'w-ds-96',
  '128': 'w-ds-128', 
  '144': 'w-ds-144',
  '160': 'w-ds-160',
  '168': 'w-ds-168',
  '240': 'w-ds-240'
}
