import LocalGasStationRoundedIcon from '@mui/icons-material/LocalGasStationRounded'
import { useTheme } from '@mui/material'
import { FlexBoxProps, FlexCol, FlexGrowRow } from '@xylabs/react-flexbox'
import { TypographyEx } from '@xyo-network/react-shared'

import { GweiLabelTypography } from './GweiLabelTypography'

export interface PriorityFeeBoxProps extends FlexBoxProps {
  priorityFee?: number
}

export const PriorityFeeBox: React.FC<PriorityFeeBoxProps> = ({ priorityFee, ...props }) => {
  const theme = useTheme()

  return (
    <FlexGrowRow width="100%" justifyContent="space-between" alignItems="end" {...props}>
      <FlexCol alignItems="start">
        <TypographyEx>Priority Fee</TypographyEx>
        <TypographyEx title={priorityFee?.toString() ?? ''}>
          {priorityFee?.toFixed(2)} <GweiLabelTypography fontSize={theme.spacing(1)} />
        </TypographyEx>
      </FlexCol>
      <LocalGasStationRoundedIcon />
    </FlexGrowRow>
  )
}
