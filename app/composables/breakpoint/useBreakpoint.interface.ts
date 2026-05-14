export type AppBreakpoint = 'base' | 'sm' | 'md' | 'lg';

export type BreakpointsConfig = {
  sm: number;
  md: number;
  lg: number;
};

export type UseBreakpointReturn = {
  width: Readonly<{ value: number | null }>;
  breakpoints: Readonly<{ value: BreakpointsConfig }>;
  current: Readonly<{ value: AppBreakpoint }>;
  isReady: Readonly<{ value: boolean }>;
  isBase: Readonly<{ value: boolean }>;
  isSm: Readonly<{ value: boolean }>;
  isMd: Readonly<{ value: boolean }>;
  isLg: Readonly<{ value: boolean }>;
  isSmUp: Readonly<{ value: boolean }>;
  isMdUp: Readonly<{ value: boolean }>;
  isLgUp: Readonly<{ value: boolean }>;
};
