export const buildStModalClasses = () => {
  const overlay = [
    'fixed inset-0 z-[9999]',
    'flex items-center justify-center',
    'bg-black/60',
    'p-ds-4'
  ].join(' ');

  return { overlay };
};
