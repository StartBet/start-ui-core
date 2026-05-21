export const buildStLoadingScreenClasses = (className?: string) => {
  const root = [
    'w-full h-full flex flex-col items-center justify-center',
    'gap-ds-2',
    className
  ]
    .filter(Boolean)
    .join(' ');

  const text = ['text-center'].join(' ');

  return { root, text };
};
