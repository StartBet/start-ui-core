export const navbarAsideBaseClass =
  'shrink-0 h-full overflow-hidden transition-[width] duration-200 ease-out absolute xl:relative z-[100]';

export const navbarAsideWidthClass = (isOpen: boolean) =>
  isOpen ? 'w-ds-32' : 'w-[0px] md:w-ds-8';
