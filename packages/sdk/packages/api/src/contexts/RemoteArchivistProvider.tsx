import { useAsyncEffect } from '@xylabs/react-shared'
import { XyoArchivistApi, XyoRemoteArchivist, XyoRemoteArchivistConfig } from '@xyo-network/api'
import { ArchivistWrapper } from '@xyo-network/archivist-wrapper'
import { CompositeModuleResolver } from '@xyo-network/module'
import { ArchivistProvider, useArchivist } from '@xyo-network/react-archivist'
import { ContextExProviderProps, useDataState } from '@xyo-network/react-shared'
import merge from 'lodash/merge'
import { useMemo, useState } from 'react'

export type RemoteArchivistProviderProps = ContextExProviderProps<{
  api?: XyoArchivistApi
  config?: XyoRemoteArchivistConfig
  resolver?: CompositeModuleResolver
}>

export const RemoteArchivistProvider: React.FC<RemoteArchivistProviderProps> = ({ api, config: configProp, resolver, ...props }) => {
  const [config, setConfig] = useDataState(configProp)
  const { archivist } = useArchivist()

  //we set this every time, but it will only take if config VALUE changed
  setConfig(configProp)

  const wrapper = useMemo(() => (archivist ? new ArchivistWrapper(archivist) : undefined), [archivist])
  const activeResolver: CompositeModuleResolver | undefined = useMemo(
    () => (resolver ?? wrapper ? new CompositeModuleResolver() : undefined),
    [resolver, wrapper],
  )

  // eslint-disable-next-line deprecation/deprecation
  const activeApi = api ?? config?.api

  if (archivist) {
    activeResolver?.add(archivist)
  }

  const [activeArchivist, setActiveArchivist] = useState<XyoRemoteArchivist>()

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      const activeArchivist = activeApi
        ? await XyoRemoteArchivist.create({
            api: activeApi,
            config: merge(
              {},
              config,
              archivist
                ? {
                    parents: {
                      commit: [archivist.address],
                      read: [archivist.address],
                      write: [archivist.address],
                    },
                  }
                : undefined,
            ),
            resolver: activeResolver,
          })
        : undefined
      if (mounted()) {
        setActiveArchivist(activeArchivist)
      }
    },
    [activeResolver, archivist, config, activeApi],
  )

  return <ArchivistProvider archivist={activeArchivist} {...props} />
}
