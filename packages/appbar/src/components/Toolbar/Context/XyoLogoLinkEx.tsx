import { Typography, useTheme } from '@mui/material'
import { LinkEx, LinkExProps } from '@xylabs/react-common'
import { FlexRow } from '@xylabs/react-flexbox'

import { XyoLogo } from './XyoLogo'

export interface XyoLogoLinkExProps extends LinkExProps {
  version?: boolean | string
}

export const XyoLogoLinkEx: React.FC<XyoLogoLinkExProps> = ({ to = '/', version = false, ...props }) => {
  const theme = useTheme()
  return (
    <LinkEx to={to} {...props}>
      <FlexRow paddingX="4px">
        <XyoLogo height="40" width="43" />
        {version ? (
          <Typography
            position="absolute"
            borderRadius={1}
            right={6}
            color={theme.palette.getContrastText(theme.palette.text.primary)}
            bottom={0}
            bgcolor={theme.palette.text.primary}
            paddingX="2px"
            lineHeight={1}
            variant="caption"
            border={`1px ${theme.palette.getContrastText(theme.palette.primary.main)} solid`}
          >
            {typeof version === 'string' ? version : '2.0'}
          </Typography>
        ) : null}
      </FlexRow>
    </LinkEx>
  )
}
