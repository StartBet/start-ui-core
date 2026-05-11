import { sizeWidthClasses, sizeHeightClasses } from '~/types/Spacing'
import type { SizeValue } from '~/types/Spacing'

const cache = new Map<string, string>()

export const getIllustrationCache = () => cache

export const svgToDataImage = (svg: string) =>
  `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`

export const buildIllustrationSizeClasses = (width?: SizeValue, height?: SizeValue) => {
  return [
    width ? sizeWidthClasses[width] : undefined,
    height ? sizeHeightClasses[height] : undefined
  ].filter(Boolean)
}
