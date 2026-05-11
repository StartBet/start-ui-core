export const buildAppCardActionGameClasses = () => {
  const root = 'flex flex-col items-center justify-center w-full'
  const paper = 'relative flex flex-col items-start justify-end gap-ds-1 mt-ds-2 overflow-hidden'
  const illustration = 'absolute top-[-1rem] right-[-1rem] z-10 opacity-72'
  const title =
    'relative max-w-[75%] [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical] z-20'
  const subtitle = 'relative max-w-[75%] z-20'
  const button = 'relative mt-ds-2 z-20'
  const buttonEndIcon = ''

  const paperBefore = [
    'before:content-[""] before:absolute before:inset-0 before:rounded-ds-2 before:z-20',
    'before:bg-gradient-to-r',
    'before:from-[--color-surface-1] before:from-[25%]',
    'before:to-transparent before:to-[100%]',
  ].filter(Boolean).join(' ')
  
  const paperJoin = [
    paper,
    paperBefore,
  ].filter(Boolean).join(' ')
  
  return { root, paperJoin, illustration, title, subtitle, button, buttonEndIcon }
}
