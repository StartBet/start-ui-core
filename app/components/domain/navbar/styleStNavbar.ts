export const navbarAsideBaseClass =
  'shrink-0 h-full overflow-hidden transition-[width] duration-200 ease-out absolute md:relative z-[100]';

export const navbarAsideWidthClass = (isOpen: boolean) =>
  isOpen ? 'w-[310px]' : 'w-[0px] md:w-[56px]';
