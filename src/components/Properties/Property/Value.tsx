import { Typography } from '@mui/material'
import { Variant } from '@mui/material/styles/createTypography'

export interface PropertyValueProps {
  value?: string | number | boolean | null
  paddingFactor?: number
  typographyVariant?: Variant
}

export const PropertyValue: React.FC<PropertyValueProps> = ({
  value,
  paddingFactor,
  typographyVariant = 'caption',
}) => {
  const customThemeProps = {
    clamped: paddingFactor,
    title: value?.toString(),
  }
  return (
    <>
      {value !== undefined ? (
        <Typography variant={typographyVariant} fontFamily="monospace" fontWeight="light" {...customThemeProps}>
          {value}
        </Typography>
      ) : null}
    </>
  )
}
