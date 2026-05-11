import type { InjectionKey } from 'vue'
import type {
  StRadioGroupContext,
  StRadioGroupOrientation,
  StRadioGroupProps
} from '~/components/ui/form/radio-group/StRadioGroup.interface'

export const radioGroupContextKey: InjectionKey<StRadioGroupContext> = Symbol('StRadioGroup')

export const buildRadioGroupClasses = (
  props: Pick<StRadioGroupProps, 'orientation' | 'dense' | 'className'>
) => {
  const { orientation = 'vertical', dense = false, className } = props

  const base = 'flex'
  const orientationClasses: Record<StRadioGroupOrientation, string> = {
    vertical: 'flex-col items-start gap-ds-2',
    horizontal: 'flex-row items-center flex-wrap gap-ds-3'
  }

  return [base, orientationClasses[orientation], dense ? 'gap-ds-1' : undefined, className]
    .filter(Boolean)
    .join(' ')
}
