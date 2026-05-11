import type { IllustrationName } from '~/components/ui/illustration/illustrations'
import type { SizeValue } from '~/types/Spacing'

export type StIllustrationName = IllustrationName

export type StIllustrationProps = {
  name: StIllustrationName
  alt: string
  width?: SizeValue
  height?: SizeValue
  className?: string
}
