import { assertEx } from '@xylabs/sdk-js'
import {
  XyoAddress,
  XyoArchivistApi,
  XyoArchivistApiConfig,
  XyoBoundWitness,
  XyoPanel,
  XyoPayload,
  XyoSystemInfoWitness,
  XyoWitness,
} from '@xyo-network/sdk-xyo-client-js'
import { useEffect, useState } from 'react'

import { XyoPanelContext } from './Context'

export interface XyoPanelLoaderProps {
  address?: XyoAddress
  archivists?: XyoArchivistApi[]
  inlinePayloads?: boolean
  witnesses?: XyoWitness<XyoPayload>[]
}

const getDefaultArchivists = () => {
  const archivistConfigs: XyoArchivistApiConfig[] = [
    {
      apiDomain: process.env.API_DOMAIN || 'https://api.archivist.xyo.network',
      archive: 'temp',
    },
  ]

  return archivistConfigs.map((config) => {
    return XyoArchivistApi.get(config)
  })
}

export const XyoPanelLoader: React.FC<XyoPanelLoaderProps> = ({
  inlinePayloads = false,
  address = XyoAddress.random(),
  archivists = getDefaultArchivists(),
  witnesses = [new XyoSystemInfoWitness()],
  children,
}) => {
  console.log('XyoPanelLoader')
  const [panel, setPanel] = useState<XyoPanel>()
  const [history, setHistory] = useState<XyoBoundWitness[]>()

  useEffect(() => {
    if (!panel) {
      const panel = new XyoPanel({
        address,
        archivists,
        inlinePayloads,
        onHistoryAdd: () => {
          setHistory(assertEx(panel).history.map((item) => item))
        },
        onHistoryRemove: () => {
          setHistory(assertEx(panel).history.map((item) => item))
        },
        witnesses,
      })
      setPanel(panel)
      setHistory(panel.history)
    }
  }, [address, archivists, witnesses, panel, inlinePayloads])

  return <XyoPanelContext.Provider value={{ history, panel }}>{panel ? children : null}</XyoPanelContext.Provider>
}
