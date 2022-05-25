import { darken, lighten, Typography, TypographyVariant, useTheme } from '@mui/material'
import { FlexBoxProps, FlexRow, QuickTipButton } from '@xylabs/sdk-react'
import { SizeProp } from '@xyo-network/react-shared'
import { ReactNode } from 'react'

type TitleSizeProp = SizeProp | 'full'

export interface PropertyTitleProps extends FlexBoxProps {
  tip?: ReactNode
  more?: ReactNode
  title?: string
  size?: TitleSizeProp
  elevation?: number
}

export const PropertyTitle: React.FC<PropertyTitleProps> = ({ elevation = 1, size = 'medium', tip, more, title, ...props }) => {
  const sizeVariants: Record<TitleSizeProp, TypographyVariant> = {
    full: 'h6',
    large: 'h6',
    medium: 'caption',
    small: 'caption',
  }

  const sizeTitleHeight: Record<TitleSizeProp, number | undefined> = {
    full: undefined,
    large: 32,
    medium: 20,
    small: 16,
  }

  const sizeFontSize: Record<TitleSizeProp, number> = {
    full: 24,
    large: 24,
    medium: 14,
    small: 10,
  }

  const quickTipSize = sizeFontSize[size] < 18 ? sizeFontSize[size] : 18

  const theme = useTheme()

  return (
    <FlexRow
      bgcolor={theme.palette.mode === 'dark' ? lighten(theme.palette.background.paper, 0.05 * elevation) : darken(theme.palette.background.paper, 0.05 * elevation)}
      alignItems="center"
      height={sizeTitleHeight[size]}
      justifyContent="space-between"
      {...props}
    >
      <FlexRow paddingX={1}>
        <Typography fontWeight={700} noWrap variant={sizeVariants[size]} fontSize={sizeFontSize[size]}>
          {title}
        </Typography>
        {tip ? (
          <QuickTipButton style={{ fontSize: quickTipSize }} color="inherit" title={title ?? ''}>
            {tip}
          </QuickTipButton>
        ) : null}
      </FlexRow>
      {more}
    </FlexRow>
  )
}
