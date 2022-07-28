import { useTheme } from '@mui/material'

import { ColorGradientLegendProps, XyoAnimatedHeatMapColorProps } from '../Colors'

const useHeatMapColors = () => {
  const theme = useTheme()
  const staticMapColor = '#FFFF75'
  const highUsageColor = '#FF0000'

  const heatMapColorProps: XyoAnimatedHeatMapColorProps = {
    highUsageColor,
    lowUsageColor: '#FFB3B3',
    staticMapColor,
  }

  const legendProps: ColorGradientLegendProps = {
    endColor: highUsageColor,
    endLabel: 'High',
    heading: 'Network Usage',
    startColor: staticMapColor,
    startLabel: 'Low',
    textColor: theme.palette.common.white,
  }

  return { heatMapColorProps, legendProps }
}

export { useHeatMapColors }
