import type { StChipVariant } from '~/components/ui/chip/StChip.interface'

export type SideNavChip = { variant: StChipVariant; label: string }

export type SideNavChildItem = {
  id: string
  label: string
  ariaLabel: string
  icon: string
  to?: string
}

export type SideNavItem = SideNavChildItem & {
  chip?: SideNavChip
  children?: SideNavChildItem[]
}
