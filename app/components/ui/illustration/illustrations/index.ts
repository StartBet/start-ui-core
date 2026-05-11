import { ARROWS_ILLUSTRATIONS } from './arrows'
import { BALLS_ILLUSTRATIONS } from './balls'
import { BRAND_ILLUSTRATIONS } from './brand'
import { CHARACTERS_ILLUSTRATIONS } from './characters'
import { COINS_ILLUSTRATIONS } from './coins'
import { CASINO_ILLUSTRATIONS } from './casino'
import { TROPHY_ILLUSTRATIONS } from './trophy'
import { STICKERS_GAME_ILLUSTRATIONS } from './stickers-game'
import { PIXAR_ILLUSTRATIONS } from './pixar'


export const ILLUSTRATIONS = {
  ...ARROWS_ILLUSTRATIONS,
  ...BALLS_ILLUSTRATIONS,
  ...BRAND_ILLUSTRATIONS,
  ...CHARACTERS_ILLUSTRATIONS,
  ...TROPHY_ILLUSTRATIONS,
  ...COINS_ILLUSTRATIONS,
  ...CASINO_ILLUSTRATIONS,
  ...STICKERS_GAME_ILLUSTRATIONS,
  ...PIXAR_ILLUSTRATIONS,
} as const

export type IllustrationName = keyof typeof ILLUSTRATIONS

