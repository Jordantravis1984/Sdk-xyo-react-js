import { Container, ContainerProps } from '@mui/material'
import { FlexBoxProps, FlexGrowCol } from '@xylabs/react-flexbox'
import { useUserEvents } from '@xylabs/react-pixel'
import { useAsyncEffect } from '@xylabs/react-shared'
import { ReactNode } from 'react'
import { Helmet } from 'react-helmet'
import { useLocation } from 'react-router-dom'
export interface WebAppPageProps extends FlexBoxProps {
  container?: ContainerProps['maxWidth']
  disableGutters?: boolean
  breadcrumbs?: ReactNode
}

export const WebAppPage: React.FC<WebAppPageProps> = ({ disableGutters, title, container, breadcrumbs, children, ...props }) => {
  const userEvents = useUserEvents()
  const { pathname } = useLocation()

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async () => {
      await userEvents?.viewContent({ name: title ?? 'NodeBasePage', path: location.pathname })
    },
    [pathname, title, userEvents]
  )

  const Body: React.FC<FlexBoxProps> = (props) => (
    <FlexGrowCol gap={2} paddingY={2} justifyContent="flex-start" alignItems="stretch" {...props}>
      {breadcrumbs}
      {children}
    </FlexGrowCol>
  )

  return (
    <FlexGrowCol alignItems="stretch" justifyContent="flex-start" minHeight={0} overflow="visible scroll">
      <Helmet title={title} />
      {container ? (
        <Container
          disableGutters={disableGutters}
          style={{ alignItems: 'stretch', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'flex-start' }}
          maxWidth={container}
        >
          <Body {...props} />
        </Container>
      ) : (
        <Body paddingX={disableGutters ? 0 : 1} {...props} />
      )}
    </FlexGrowCol>
  )
}

/** @deprecated use WebAppPagePage instead */
export const FlexPage = WebAppPage
