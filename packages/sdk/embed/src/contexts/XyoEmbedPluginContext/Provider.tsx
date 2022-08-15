import { FlexBoxProps, FlexCol } from '@xylabs/react-flexbox'
import { useAsyncEffect, WithChildren } from '@xylabs/react-shared'
import { delay } from '@xylabs/sdk-js'
import { XyoApiError } from '@xyo-network/api'
import { Huri, XyoPayload } from '@xyo-network/payload'
import { XyoApiErrorRender } from '@xyo-network/react-auth-service'
import { XyoPayloadRenderPlugin } from '@xyo-network/react-payload-plugin'
import { ResultLoader } from '@xyo-network/react-webapp'
import { useState } from 'react'

import { XyoEmbedPluginContext } from './Context'
import { XyoEmbedPluginBase } from './State'

export interface XyoEmbedPluginProviderProps extends XyoEmbedPluginBase, FlexBoxProps {}

export const XyoEmbedPluginProvider: React.FC<WithChildren<XyoEmbedPluginProviderProps>> = ({
  children,
  refreshTitle,
  timestampLabel,
  hideElementsConfig,
  huri,
  plugins,
  pluginConfig,
  ...props
}) => {
  const [payload, setPayload] = useState<XyoPayload>()
  const [notFound, setNotFound] = useState<boolean>()
  const [huriApiError, setHuriApiError] = useState<XyoApiError>()
  const [activePlugin, setActivePlugin] = useState<XyoPayloadRenderPlugin | undefined>(plugins ? plugins[0] : undefined)
  const [refreshPayload, setRefreshPayload] = useState(0)

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      if (huri && !refreshPayload) {
        try {
          const huriInstance = new Huri(huri)
          const result = await huriInstance.fetch()
          // ensure the busy state can stay for a moment to avoid flashing too quickly
          await delay(500)

          if (mounted()) {
            setNotFound(result === null)
            setPayload(result)
            setRefreshPayload(1)
          }
        } catch (e) {
          setHuriApiError(e as XyoApiError)
        }
      }
    },
    [huri, payload, refreshPayload],
  )

  const refreshHuri = () => {
    setRefreshPayload(0)
  }

  return (
    <XyoEmbedPluginContext.Provider
      value={{
        activePlugin,
        hideElementsConfig,
        huri,
        payload,
        pluginConfig,
        provided: true,
        refreshHuri,
        refreshTitle,
        setActivePlugin,
        timestampLabel,
      }}
    >
      <ResultLoader searchResult={payload} notFound={!!notFound} apiError={huriApiError}>
        <XyoApiErrorRender apiError={huriApiError}>
          <FlexCol busy={Boolean(!refreshPayload && payload)} {...props}>
            {children}
          </FlexCol>
        </XyoApiErrorRender>
      </ResultLoader>
    </XyoEmbedPluginContext.Provider>
  )
}
