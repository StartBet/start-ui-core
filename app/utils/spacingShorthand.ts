import type { ResponsivePrefix, SpacingRule } from '~/types/Spacing'

const toValueSuffix = (value: string) => {
  const v = value.trim()
  if (v === '0') return '0'
  if (v === 'auto') return 'auto'
  return `ds-${v}`
}

export function spacingShorthandToClasses(
  value: string | undefined,
  rule: SpacingRule,
  responsivePrefix?: ResponsivePrefix
) {
  if (!value) return []

  const values = value.trim().split(/\s+/).filter(Boolean).map(toValueSuffix)

  const prefix = responsivePrefix ? `${responsivePrefix}:` : ''

  if (values.length === 1) return [`${prefix}${rule}-${values[0]}`]

  if (values.length === 2) {
    return [`${prefix}${rule}y-${values[0]}`, `${prefix}${rule}x-${values[1]}`]
  }

  if (values.length === 3) {
    return [
      `${prefix}${rule}t-${values[0]}`,
      `${prefix}${rule}x-${values[1]}`,
      `${prefix}${rule}b-${values[2]}`
    ]
  }

  return [
    `${prefix}${rule}t-${values[0]}`,
    `${prefix}${rule}r-${values[1]}`,
    `${prefix}${rule}b-${values[2]}`,
    `${prefix}${rule}l-${values[3]}`
  ]
}
