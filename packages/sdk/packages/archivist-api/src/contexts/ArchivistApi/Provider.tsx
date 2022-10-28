/* eslint-disable deprecation/deprecation */
/* eslint-disable import/no-deprecated */
import { WithChildren } from '@xylabs/react-shared'
import { XyoApiConfig, XyoApiError, XyoApiResponse, XyoArchivistApi } from '@xyo-network/api'
import { useCallback, useEffect, useState } from 'react'

import { ArchivistApiContext } from './Context'
import { logWithMax } from './logWithMax'

/** @deprecated if you believe this should not be the case, open a ticket: https://github.com/XYOracleNetwork/sdk-xyo-react-js/issues */
export interface ArchivistApiProviderProps extends XyoApiConfig {
  required?: boolean
  successHistoryMaxDepth?: number
  responseHistoryMaxDepth?: number
  failureHistoryMaxDepth?: number
  errorHistoryMaxDepth?: number
  onFailureCallback?: (statusCode?: number) => void
}

/** @deprecated if you believe this should not be the case, open a ticket: https://github.com/XYOracleNetwork/sdk-xyo-react-js/issues */
export const ArchivistApiProvider: React.FC<WithChildren<ArchivistApiProviderProps>> = ({
  required = false,
  successHistoryMaxDepth = 0,
  responseHistoryMaxDepth = 0,
  failureHistoryMaxDepth = 0,
  errorHistoryMaxDepth = 0,
  onFailureCallback,
  children,
  ...configProps
}) => {
  const [api, setApi] = useState<XyoArchivistApi>()
  const [config, setConfig] = useState<XyoApiConfig>(configProps)

  const [successHistory] = useState<XyoApiResponse[]>([])
  const [responseHistory] = useState<XyoApiResponse[]>([])
  const [failureHistory] = useState<XyoApiResponse[]>([])
  const [errorHistory] = useState<XyoApiError[]>([])

  //we are doing this with config since we want a value compare and not a ref compare
  useEffect(() => {
    if (JSON.stringify(config) !== JSON.stringify(configProps)) {
      setConfig(configProps)
    }
  }, [config, configProps])

  const logResponse = useCallback(
    (response: XyoApiResponse) => {
      logWithMax(responseHistory, response, responseHistoryMaxDepth)
    },
    [responseHistory, responseHistoryMaxDepth],
  )

  const onFailure = useCallback(
    (response: XyoApiResponse) => {
      onFailureCallback?.(response.status)
      logWithMax(failureHistory, response, failureHistoryMaxDepth)
      logResponse(response)
    },
    [onFailureCallback, failureHistory, failureHistoryMaxDepth, logResponse],
  )

  const onSuccess = useCallback(
    (response: XyoApiResponse) => {
      logWithMax(successHistory, response, successHistoryMaxDepth)
      logResponse(response)
    },
    [logResponse, successHistory, successHistoryMaxDepth],
  )

  const onError = useCallback(
    (error: XyoApiError) => {
      logWithMax(errorHistory, error, errorHistoryMaxDepth)
    },
    [errorHistory, errorHistoryMaxDepth],
  )

  useEffect(() => {
    setApi(
      new XyoArchivistApi({
        ...config,
        onError,
        onFailure,
        onSuccess,
      }),
    )
  }, [config, onError, onFailure, onSuccess])

  return (
    <ArchivistApiContext.Provider
      value={{
        api,
        currentToken: config.jwtToken,
        errorHistory,
        failureHistory,
        provided: true,
        responseHistory,
        successHistory,
      }}
    >
      {api ? children : required ? null : children}
    </ArchivistApiContext.Provider>
  )
}